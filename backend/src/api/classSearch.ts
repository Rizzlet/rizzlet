import joi from "joi";
import { Request, Response } from "express";
import { newClass } from "../models/class.js";

type classBody = {
  name: string;
};

const bodySchema = joi.object<classBody, true>({
  name: joi.string().required(),
});

export async function classHandler(req: Request, res: Response) {
  const { error, value: body } = bodySchema.validate(req.body);

  if (error) {
    res.status(422).send(error.message);
    return;
  }

  await newClass(body.name);

  res.send(`Class ${body.name}!`);
}
 