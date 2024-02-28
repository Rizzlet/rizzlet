import joi from "joi";
import { Request, Response } from "express";
import { newClass } from "../models/class.js";
import { getClassNames } from "../models/class.js";
import { User } from "../models/user.js";

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
  try {
    const { userId, classIds } = req.body; 

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { classIds: classIds } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User classes updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user classes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  return;
}






