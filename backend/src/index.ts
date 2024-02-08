import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
dotenv.config();

// So we can see the requests in the console
app.use(morgan("dev"));

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
