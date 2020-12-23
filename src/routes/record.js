import { Router } from "express";
import RecordsController from "../controllers/RecordsController";
import validatePayload from "../middlewares";
import schemas from '../middlewares/schemas';

const router = Router();

router.post(
  "/",
  validatePayload(schemas.recordPost),
  RecordsController.getRecords,
);

export default router;
