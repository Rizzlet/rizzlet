import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// declare a route with a response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// start the server
app.listen(process.env.PORT, () => {
  console.log(
    `Server running : http://${process.env.HOST}:${process.env.PORT}`,
  );
});
