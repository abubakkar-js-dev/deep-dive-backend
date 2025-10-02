import express from "express";
import { StatusCodes } from "http-status-codes";
import buffer from "buffer";
import fs from "fs";
import path from "path";
import http from "http";

const router = express.Router();


const STATUS = {
  SUCCESS: "Success",
  ERROR: "Error",
};





router.post("/add", (req, res) => {
  const data = [];
  const { body } = req;
  if (!body.name || !body.age) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ status: STATUS.ERROR, message: "Name and age are required" });
  }
  data.push(body);
  res.status(StatusCodes.CREATED).send({ status: STATUS.SUCCESS, data });f
});

router.post("/hello", (req, res) => {
  res.status(StatusCodes.OK);
  res.send("Hello from /hello endpoint");
});


export default router;