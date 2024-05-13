import axios from "axios";
import { Request, Response } from "express";
import joi from "joi";
import jwt from "jsonwebtoken";
import { getEnvVars } from "../../env.js";
import { getIdCreateOrUpdate } from "../../models/user.js";
import { ClientTokenData } from "./sharedAuth.js";

type GoogleAuthBody = {
  authorizationCode: string;
};

const bodySchema = joi.object<GoogleAuthBody, true>({
  authorizationCode: joi.string().required(),
});

export async function googleAuthHandler(req: Request, res: Response) {
  const { error, value: body } = bodySchema.validate(req.body);

  if (error) {
    res.status(422).send(error.message);
    return;
  }

  const {
    data: { id_token },
  } = await axios.post("https://www.googleapis.com/oauth2/v4/token", {
    code: body.authorizationCode,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.FRONTEND_BASE_URL + "/login",
    grant_type: "authorization_code",
  });

  if (!id_token) {
    console.error("Auth failure from google");
    res.status(400).send("Auth Error");
    return;
  }

  const data = jwt.decode(id_token);

  if (data === null || typeof data === "string") {
    console.error("Unable to decode JWT");
    res.status(500).send("Auth Error");
    return;
  }

  const user = {
    firstName: data.given_name,
    lastName: data.family_name,
    email: data.email,
    sub: data.sub!,
    profileColor: "#FFA500",
  };

  // We assume that the sub field always exists on google tokens
  const userId = data.sub!;

  const results = await getIdCreateOrUpdate(
    user.firstName,
    user.lastName,
    user.email,
    userId,
    user.profileColor,
  );

  if (results === null) {
    console.error("Failed to create or update user");
    res.status(500).send("Auth Error");
    return;
  }

  const tokenData: ClientTokenData = { ...user, id: results };

  const encodedToken = jwt.sign(tokenData, getEnvVars().JWT_SECRET);

  res.cookie("token", encodedToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "none",
    secure: true,
  });

  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_BASE_URL);
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  res.status(200).json(tokenData);
}
