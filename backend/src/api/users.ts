import { Request, Response } from "express";
import { User } from "../models/user.js"
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";

export async function GetIndividualUser(req: Request, res: Response){

  const userData = verifyAndDecodeToken(req.cookies.token);
  if (!userData){
    console.log("backend authentication failed");
    return;
  }

  try{
    const foundUser = User.find({_id: userData.id});
    res.send(foundUser).status(200);
  }
  catch(error){
    console.log("error getting specific user");
    res.status(error);
  }
}