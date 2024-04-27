import mongoose from "mongoose";
import { UserSchema } from "./UserSchema.js";

const RegisteredUserSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
});

const EventSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  name: {
    required: true,
    type: String,
  },
  dateFrom: {
    required: true,
    type: Date,
  },
  dateTo: {
    required: true,
    type: Date,
  },
  duration: {
    required: true,
    type: String,
  },
  desription: {
    required: false,
    type: String,
  },
  registered_users: [RegisteredUserSchema],
});

const EventModel = mongoose.model("Event", EventSchema);

export { EventModel };
