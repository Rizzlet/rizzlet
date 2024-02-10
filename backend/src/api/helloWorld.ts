import { Request, Response } from "express";
import joi from "joi";
import { recordHello } from "../models/hello.js";

type HelloWorldBody = {
  name: string;
};

const bodySchema = joi.object<HelloWorldBody, true>({
  name: joi.string().required(),
});

export async function helloWorldHandler(req: Request, res: Response) {
  const { error, value: body } = bodySchema.validate(req.body);

  if (error) {
    res.status(422).send(error.message);
    return;
  }

  await recordHello(body.name);

  res.send(`Hello ${body.name}!`);
}
