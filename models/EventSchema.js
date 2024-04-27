import mongoose from "mongoose";
import { UserSchema } from "./UserSchema.js";

const RegisteredUserSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
});

const EventSchema = new mongoose.Schema({
  createdBy: UserSchema,
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
  time: {
    required: true,
    type: Date,
  },
  desription: {
    required: false,
    type: String,
  },
  time: {
    required: true,
    type: Date,
  },
  registered_users: [RegisteredUserSchema],
});

const EventModel = mongoose.model("Event", EventSchema);

export { EventModel };
