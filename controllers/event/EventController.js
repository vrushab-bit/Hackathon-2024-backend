import { EventModel } from "../../models/EventSchema.js";

const createEvent = async (req, res) => {
  try {
    const { name, dateFrom, dateTo, duration, description = "" } = req.body;
    const userId = req.userId;
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
};

const getEventsByUserId = async (req, res) => {
  try {
    const Events = await EventModel.find({ createdBy: req.userId });
    if (!Events) {
      return res.status(404).json({ message: "Event not found" }); // Not Found
    }
    res.status(200).json(Events); // OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error Fetching Events" });
  }
};

const getEventById = async (req, res) => {
  try {
    if (req.userId != req.params.id) {
      return res.status(403).json({ message: "Event Doesnt Belong To you" });
    }
    const event = await EventModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" }); // Not Found
    }
    return res.status(200).json(event); // OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching event" }); // Internal Server Error
  }
};

const updateEventById = async (req, res) => {
  try {
    if (req.userId != req.params.id) {
      return res.status(403).json({ message: "Event Doesnt Belong To you" });
    }
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
};

const deleteEventById = async (req, res) => {
  try {
    if (req.userId != req.params.id) {
      return res.status(200).json({ message: "Event Doesnt Belong To you" });
    }
    const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" }); // Not Found
    }
    return res.status(200).json({ message: "Event deleted" }); // OK
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting event" }); // Internal Server Error
  }
};

export {
  createEvent,
  getEventById,
  updateEventById,
  deleteEventById,
  getEventsByUserId,
};
