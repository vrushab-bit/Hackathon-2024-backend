import express from "express";
import { registerForEvent } from "../controllers/attendees/AttendeesController.js";

export const AttendeesRouter = express.Router();

AttendeesRouter.post("/", registerForEvent);
