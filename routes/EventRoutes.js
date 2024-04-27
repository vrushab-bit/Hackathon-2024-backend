import express from "express";
import { checkJWT } from "../middleware/auth.js";
import {
  createEvent,
  deleteEventById,
  getEventById,
  getEventsByUserId,
  updateEventById,
} from "../controllers/event/EventController.js";

export const EventRouter = express.Router();

// Create Event
EventRouter.post("/", checkJWT, createEvent);

// Get Event By Id
EventRouter.get("/getEvents", checkJWT, getEventsByUserId);

EventRouter.get("/:id", checkJWT, getEventById);
// Update Event
// **Update Event (PUT)**
EventRouter.put("/:id", checkJWT, updateEventById);

// Delete Event
EventRouter.delete("/:id", checkJWT, deleteEventById);
