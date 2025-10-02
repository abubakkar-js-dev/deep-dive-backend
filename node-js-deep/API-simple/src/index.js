import express from "express";
import appRoutes from "./routes"
import { StatusCodes } from "http-status-codes";
const app = express();
const PORT = 3000;

const STATUS = {
  SUCCESS: "Success",
  ERROR: "Error",
};


// api routes
app.use("/v1", appRoutes);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// default route
app.get("/", (req, res) => {
  res.status(StatusCodes.OK);
  res.send("Hello world, this is my first API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
