import { Request, Response } from "express";
import { User } from "../models/user.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";
import {
  getAllUsersScoreByClass,
  getClass,
  getUserClasses,
} from "..//models/class.js";
import joi from "joi";
import { Class } from "../models/class.js";

export async function GetIndividualUser(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    console.log("backend authentication failed");
    return;
  }

  try {
    const foundUser = await User.findById(userData.id); // Added await keyword to remove circular reasoning
    res.send(JSON.stringify(foundUser)).status(200);
  } catch (error) {
    console.log(error);
    console.log("error getting specific user");
    res.status(error);
  }
}

// Don't want the user to be able to update their score
// Do this automatically
//
// export async function UpdateScore(req: Request, res: Response) {
//   const userData = verifyAndDecodeToken(req.cookies.token);
//   if (!userData) {
//     console.log("update score authorization failed");
//     return;
//   }

//   try {
//     await User.findByIdAndUpdate(userData.id, { $inc: { score: 1 } });
//     const newScore = await User.findById(userData.id);
//     if (newScore != null) {
//       res.send(JSON.stringify(newScore.score)).status(201);
//     }
//   } catch (error) {
//     res.status(error);
//   }
// }

export async function UserClasses(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token)!;

  // GEt all classes that the user is enrolled in
  const classes = await getUserClasses(userData.id);

  if (classes === null) {
    res.status(500).send("Internal server error");
    return;
  }

  const returnClasses = classes.map((c) => {
    return {
      name: c.name,
      id: c._id,
    };
  });

  res.json(returnClasses).status(200);
}

type GetScoreBody = {
  classId: string;
};

const getScoreSchema = joi.object<GetScoreBody, true>({
  classId: joi.string().required(),
});

export async function getScore(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    console.log("Authorization failed");
    return res.status(401).json({ message: "Authorization failed" });
  }

  const { error, value: body } = getScoreSchema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.message);
    return res.status(400).json({ message: error.message });
  }

  try {
    const user = await User.findById(userData.id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const classObj = await getClass(body.classId);

    if (!classObj) {
      console.log("Class doesn't exist");
      return res.status(403).json({ message: "Class does not exist" });
    }

    if (user.classIds.indexOf(classObj._id) === -1) {
      console.log("User is not enrolled in this class");
      return res
        .status(403)
        .json({ message: "User is not enrolled in this class" });
    }

    const score = classObj.scores.find(
      (s) => s.user.toString() === user._id.toString(),
    );

    return res.status(200).json({ score: score?.score || 0 });
  } catch (error) {
    console.error("Error fetching user score:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

type GetTopTenUsers = {
  classId: string;
};

const topTenUsersSchema = joi.object<GetTopTenUsers, true>({
  classId: joi.string().hex({ prefix: false }).length(24).required(),
});

export async function getTopTenUsers(req: Request, res: Response) {
  //verify tokens for authentication
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    console.log("update score authorization failed");
    return;
  }

  const { error, value: body } = topTenUsersSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  // TODO: Get top ten users for a class
  const allUsers = await getAllUsersScoreByClass(body.classId);

  allUsers?.sort((a, b) => b.score - a.score);
  let sortedUsers = allUsers;

  if (!sortedUsers) {
    return res.status(404).json({ message: "Can't find class" });
  }

  sortedUsers = sortedUsers.map((ranking, index) => {
    const newUser = {
      user: {
        id: ranking.user._id.toString(),
        name: ranking.user.firstName + " " + ranking.user.lastName,
      },
      score: ranking.score,
      rank: index + 1,
    };
    return newUser;
  });

  const currentUserPlace =
    sortedUsers.map((user) => user.user.id).indexOf(userData.id) + 1;

  let topFour = sortedUsers.slice(0, 3);

  if (currentUserPlace === 0) {
    // User has no score, so score of zero
    topFour.push({
      user: {
        id: userData.id,
        name: userData.firstName + " " + userData.lastName,
      },
      score: 0,
      rank: sortedUsers.length + 1,
    });
  } else if (currentUserPlace > 3) {
    topFour.push(sortedUsers[currentUserPlace - 1]);
  } else {
    // User is in the top 4, take top 4.
    topFour = sortedUsers.slice(0, 4);
  }
  return res.status(200).json({ topFour });
}

export async function updateHealthHandler(req: Request, Res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    console.log("update health authorization failed");
    return;
  }
  const { damageAmount, attackUser, classId } = req.body;

  try {
    const response = await Class.findByIdAndUpdate(
      classId,
      { $inc: { "scores.$[theElement].health": damageAmount } },
      { arrayFilters: [{ "theElement.user": attackUser }] },
    );

    // const response = await Class.updateOne(
    //   { _id: classId, "scores.user": attackUser },
    //   { $inc: { "scores.$.health": damageAmount } },
    // );

    if (!response) {
      console.log("Class doesn't exist");
      return Res.status(403).json({ message: "Class does not exist" });
    }
  } catch (error) {
    console.log(error);
  }

  return Res.status(200).json({ request: true });
}
