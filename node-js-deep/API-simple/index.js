import express from "express";
import { StatusCodes } from "http-status-codes";
import buffer from "buffer";
import fs from "fs";
import path from "path";
import http from "http";

const app = express();
const PORT = 3000;

const STATUS = {
  SUCCESS: "Success",
  ERROR: "Error",
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(StatusCodes.OK);
  res.send("Hello world, this is my first API");
});

app.post("/add", (req, res) => {
  const data = [];
  const { body } = req;
  if (!body.name || !body.age) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ status: STATUS.ERROR, message: "Name and age are required" });
  }
  data.push(body);
  res.status(StatusCodes.CREATED).send({ status: STATUS.SUCCESS, data });
});

app.post("/hello", (req, res) => {
  res.status(StatusCodes.OK);
  res.send("Hello from /hello endpoint");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
