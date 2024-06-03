import joi from "joi";
import { Request, Response } from "express";
import {
  getUserClassesFromDB,
  newClass,
  setUserClasses,
} from "../models/class.js";
import { getClassNames } from "../models/class.js";
import { User } from "../models/user.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";
import { getQuestionsFromClassForUser } from "../models/question.js";
import { getAllUsersScoreByClass } from "../models/class.js";

type classBody = {
  name: string;
};

const bodySchema = joi.object<classBody, true>({
  name: joi.string().required(),
});

export async function fetchClassesHandler(req: Request, res: Response) {
  try {
    // Fetch class names from the database
    const classNames = await getClassNames();

    // Send the class names as a JSON response
    res.json(classNames);
  } catch (error) {
    console.error("Error fetching class names:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function classHandler(req: Request, res: Response) {
  const { error, value: body } = bodySchema.validate(req.body);

  if (error) {
    res.status(422).send(error.message);
    return;
  }

  const createdClass = await newClass(body.name);

  res.status(201).send(createdClass);
}

export async function updateUserClassesHandler(req: Request, res: Response) {
  const { classIds } = req.body as { classIds: string[] };
  const userData = verifyAndDecodeToken(req.get("X-token")!)!;

  // Update the user's classIds with the new classes
  const updatedUser = setUserClasses(userData.id, classIds);

  if (!updatedUser) {
    res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({
    message: "User classes updated successfully",
    user: updatedUser,
  });
}

export async function fetchQuestionsByClass(req: Request, res: Response) {
  const classId = req.params["id"];
  const userData = verifyAndDecodeToken(req.get("X-token")!);

  if (!userData) {
    res.status(401);
    return;
  }

  if (!classId) {
    res.send({ message: "Missing Class Id" }).status(401);
    return;
  }

  const questions = await getQuestionsFromClassForUser(userData.id, classId);

  if (!questions) {
    res.status(401);
    return;
  }

  //res.send(JSON.stringify(questions)).status(201);
  res.status(201).json(questions);
}

export async function fetchUsersByClass(req: Request, res: Response) {
  const classId = req.params["classId"];

  if (!classId) {
    return res.status(400).send({ message: "Missing Class Id" });
  }

  try {
    const allUsersInClass = await getAllUsersScoreByClass(classId);

    if (!allUsersInClass) {
      return res.status(404).send({ message: "No users found in the class" });
    }

    return res.status(200).json(allUsersInClass.map((u) => u.user));
  } catch (error) {
    console.error("Error fetching users by class:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getUserClasses(req: Request, res: Response) {
  try {
    const userData = verifyAndDecodeToken(req.get("X-token")!);

    if (!userData) {
      res.status(401);
      return;
    }

    // Gets the user from the database
    const foundUser = await User.findById(userData.id).exec();
    const userClasses = await getUserClassesFromDB(userData.id);

    if (foundUser != null) {
      res.send(
        userClasses.map((u) => {
          return {
            className: u.name,
            classId: u._id.toString(),
          };
        }),
      );
    }
  } catch (error) {
    console.error();
    res.status(500).json({ error: "Internal server error" });
  }
}
