import { Router } from "express";
import recordRouter from "./record";

const router = Router();

router.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome to the home page" })
);

router.use("/records", recordRouter);

export default router;
