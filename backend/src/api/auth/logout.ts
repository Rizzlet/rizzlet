import { Request, Response } from "express";

export async function logoutHandler(req: Request, res: Response) {
  res.clearCookie("token").sendStatus(204);
}
