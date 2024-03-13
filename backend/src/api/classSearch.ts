import joi from "joi";
import { Request, Response } from "express";
import { newClass } from "../models/class.js";
import { getClassNames } from "../models/class.js";
import { User } from "../models/user.js";
import { verifyAndDecodeToken } from "./auth/sharedAuth.js";
import { Question } from "../models/question.js";

type classBody = {
  name: string;
};

const bodySchema = joi.object<classBody, true>({
  name: joi.string().required(),
});

export async function fetchClassesHandler(req: Request, res: Response) {
  try {
    // Fetch class names from the database
    const classNames = await getClassNames();

    // Send the class names as a JSON response
    res.json(classNames);
  } catch (error) {
    console.error("Error fetching class names:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function classHandler(req: Request, res: Response) {
  const { error, value: body } = bodySchema.validate(req.body);

  if (error) { 
    res.status(422).send(error.message);
    return;
  }

  await newClass(body.name);

  res.sendStatus(201);
}

export async function updateUserClassesHandler(req: Request, res: Response) {
  try {
    const { classIds } = req.body;
    const userData = verifyAndDecodeToken(req.cookies.token)!;
    
    // Update the user's classIds with the new classes
    const updatedUser = await User.findByIdAndUpdate(
      userData.id,
      { $set: { classIds: classIds } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
  
    res.status(200).json({ message: "User classes updated successfully", user: updatedUser });

  } catch (error) {
    console.error("Error updating user classes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  return;
}

export async function fetchQuestionsByClass(req: Request, res: Response){
  const classId = req.params["id"];
  try {    
    const userData = verifyAndDecodeToken(req.cookies.token);

      if (!userData){
        res.status(401);
        return;
      }
      
      // Gets the user from the database
      const foundUser = await User.findById(userData.id).exec();
      if (foundUser != null){
        // Finds the questions associated with the class
        const foundQuestions = await Question.find({class: classId}).exec();

        if (foundQuestions.length == 0){
          res.status(404);
        }
        else{
          // Checks to see if the user is registered with the classid
          for (let i = 0; i < foundUser.classIds.length; i++){
            if (foundUser.classIds[i] == classId){
              res.send(JSON.stringify(foundQuestions)).status(201);
              return;
            }
          }
        }
        res.status(401);
      }
    }
  catch(error){
    console.error();
    res.status(500).json({error: "Internal server error"});
  }

}