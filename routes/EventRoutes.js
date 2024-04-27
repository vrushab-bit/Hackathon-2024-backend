import express from "express";
import { EventModel } from "../models/EventSchema.js";
import { checkJWT } from "../middleware/auth.js";

export const EventRouter = express.Router();

// Create Event
EventRouter.post("/", async (req, res) => {
  try {
    const {
      userId,
      name,
      dateFrom,
      dateTo,
      duration,
      description = "",
    } = req.body;

    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    if ((userId, !name || !dateFrom || !dateTo || !duration)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newEvent = new EventModel({
      createdBy: userId,
      name,
      dateFrom: from,
      dateTo: to,
      duration,
      description,
    });

    // Save the event
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent); // Created
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating event" }); // Internal Server Error
  }
});

// Get All Events
EventRouter.get("/", checkJWT, async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).json(events); // OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching events" }); // Internal Server Error
  }
});

// Get Event By Id
EventRouter.get("/:id", async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" }); // Not Found
    }
    res.status(200).json(event); // OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching event" }); // Internal Server Error
  }
});

// Update Event
// **Update Event (PUT)**
EventRouter.put("/:id", async (req, res) => {
  try {
    const updates = req.body;

    // Optionally validate updates (e.g., dateFrom < dateTo)
    // ... (implement your specific validation logic)

    const updatedEvent = await EventModel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true } // Return the updated document
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" }); // Not Found
    }
    res.status(200).json(updatedEvent); // OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating event" }); // Internal Server Error
  }
});

// Delete Event
EventRouter.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" }); // Not Found
    }
    res.status(200).json({ message: "Event deleted" }); // OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting event" }); // Internal Server Error
  }
});
