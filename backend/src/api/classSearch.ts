import joi from "joi";
import { Request, Response } from "express";
import {
  addUserRecordInClassIfDoesntAlreadyExist,
  newClass,
} from "../models/class.js";
import { getClassNames } from "../models/class.js";
import { User, setUserClasses } from "../models/user.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";
import mongoose from "mongoose";
import { Class } from "../models/class.js";
import { getQuestionsFromClassForUser } from "../models/question.js";
import { getAllUsersInClass } from "../models/class.js";

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

  await newClass(body.name);

  res.sendStatus(201);
}

export async function updateUserClassesHandler(req: Request, res: Response) {
  const { classIds } = req.body as { classIds: string[] };
  const userData = verifyAndDecodeToken(req.cookies.token)!;

  // Update the user's classIds with the new classes
  const updatedUser = setUserClasses(userData.id, classIds);

  classIds.forEach(async (classId) => {
    await addUserRecordInClassIfDoesntAlreadyExist(classId, userData.id);
  });

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
  const userData = verifyAndDecodeToken(req.cookies.token);

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
    const allUsersInClass = await getAllUsersInClass(classId);

    if (!allUsersInClass) {
      return res.status(404).send({ message: "No users found in the class" });
    }

    return res.status(200).json(allUsersInClass);
  } catch (error) {
    console.error("Error fetching users by class:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getUserClasses(req: Request, res: Response) {
  try {
    const userData = verifyAndDecodeToken(req.cookies.token);

    type classesWithName = {
      className: string;
      classId: mongoose.Types.ObjectId | undefined;
    };

    if (!userData) {
      res.status(401);
      return;
    }

    // Gets the user from the database
    const foundUser = await User.findById(userData.id).exec();

    if (foundUser != null) {
      const sendClasses: classesWithName[] = [];
      for (let i = 0; i < foundUser.classIds.length; i++) {
        const mappedClass: classesWithName = {
          className: "",
          classId: foundUser.classIds[i],
        };

        const foundClassName = await Class.findById(foundUser.classIds[i])
          .select("name")
          .exec();
        if (foundClassName != null) {
          mappedClass.className = foundClassName.name;
        }
        sendClasses.push(mappedClass);
      }
      res.send(sendClasses);
    }
  } catch (error) {
    console.error();
    res.status(500).json({ error: "Internal server error" });
  }
}
