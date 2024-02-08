import { Request, Response } from "express";
import joi from "joi";

type HelloWorldBody = {
  name: string;
};

const bodySchema = joi.object<HelloWorldBody, true>({
  name: joi.string().required(),
});

export function helloWorldHandler(req: Request, res: Response) {
  const { error, value: body } = bodySchema.validate(req.body);

  if (error) {
    res.status(422).send(error.message);
    return;
  }

  res.send(`Hello ${body.name}!`);
}
