import { verifyAndDecodeToken } from "./auth/sharedAuth.js";
import { Request, Response } from "express";
import joi from "joi";
import { getAllUsersScoreByClass, getClass } from "../models/class.js";

type GetUserGroup = {
  classId: string;
};

const getUserGroupBodySchema = joi.object<GetUserGroup, true>({
  classId: joi.string().hex({ prefix: false }).length(24).required(),
});

export async function getUserGroup(req: Request, res: Response) {
  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { error, value: body } = getUserGroupBodySchema.validate(req.params);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  // Gets the user from the database

  const now = new Date();
  const now_month = now.getMonth() + 1;
  const now_day = now.getDay();
  const day = now_month * 31 + now_day;

  const usersInClass = await getAllUsersScoreByClass(body.classId);

  if (!usersInClass) {
    res.status(400).json({ message: "User is not in class" });
    return;
  }

  const scores = (await getClass(body.classId))!.scores;

  const users = usersInClass.map((u) => {
    return {
      health: scores.find((su) => su.user.toString() === u.user._id.toString())
        ?.health,
      id: u.user._id.toString(),
      firstName: u.user.firstName,
      lastName: u.user.lastName,
      profileColor: u.user.profileColor,
    };
  });

  console.log(users);

  shuffle(users, day);

  const userIdx = users.findIndex((u) => u.id === userData.id)!;

  const group = Math.floor(userIdx / 4);

  console.log(group);
  console.log(userIdx);
  console.log(userData.id);

  // TODO: This will return <4 users for the last group. So we will need some kind of padding
  res.send(users.slice(group * 4, group * 4 + 4));
}

function shuffle<T>(array: T[], seed: number) {
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    i = Math.floor(random(seed) * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i]!;
    array[i] = t!;
    ++seed; // <-- ADDED LINE
  }

  return array;
}

function random(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
