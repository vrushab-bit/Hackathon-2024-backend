import express from "express";
import { EventModel } from "../models/EventSchema.js";

export const EventRouter = express.Router();

EventRouter.get("/", (req, res) => {
  res.send("");
});
