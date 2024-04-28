import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  title: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
  duration: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
});

const EventModel = mongoose.model("Event", EventSchema);

export { EventModel };
