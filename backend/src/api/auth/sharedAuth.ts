import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { getEnvVars } from "../../env.js";

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
  const maybeToken = req.get("X-token");

  if (!maybeToken) {
    console.log("No token provided");
    res.status(401).send("Unauthorized");
    return;
  }

  // Verify the token
  const tokenData = verifyAndDecodeToken(maybeToken);

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
    decodedToken = jwt.verify(token, getEnvVars().JWT_SECRET);
  } catch (error) {
    return null;
  }

  if (typeof decodedToken === "string") {
    return null;
  }

  return {
    firstName: decodedToken.firstName,
    lastName: decodedToken.lastName,
    email: decodedToken.email,
    id: decodedToken.id!,
    sub: decodedToken.sub!,
  };
}
