import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { envVars } from "../../env.js";

export type ClientTokenData = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  sub: string;
};

export function requireAuth(
  req: Request & { cookies: { token: string | undefined } },
  res: Response,
  next: NextFunction,
) {
  if (!req.cookies.token) {
    console.log("No token provided");
    res.status(401).send("Unauthorized");
    return;
  }

  // Verify the token
  const tokenData = verifyAndDecodeToken(req.cookies.token);

  if (!tokenData) {
    console.log("Invalid token provided");
    res.status(401).send("Unauthorized");
    return;
  }

  next();
}

export function verifyAndDecodeToken(token: string): ClientTokenData | null {
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, envVars.JWT_SECRET);
  } catch (error) {
    return null;
  }

  if (typeof decodedToken === "string") {
    return null;
  }

  return {
    firstName: decodedToken.given_name,
    lastName: decodedToken.family_name,
    email: decodedToken.email,
    id: decodedToken.id!,
    sub: decodedToken.sub!,
  };
}
