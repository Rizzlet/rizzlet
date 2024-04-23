import { verifyAndDecodeToken } from "./auth/sharedAuth";
import { Request, Response } from "express";
import joi from "joi";
import { getAllUsersInClass } from "../models/class.js";

type GetUserGroup = {
  classId: string;
};

const getUserGroupBodySchema = joi.object<GetUserGroup, true>({
  classId: joi.string().hex({ prefix: false }).length(24).required(),
});

export async function getUserClasses(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { error, value: body } = getUserGroupBodySchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  // Gets the user from the database

  const usersInClass = getAllUsersInClass(body.classId);
  console.log(usersInClass);
}
