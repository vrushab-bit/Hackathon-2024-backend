import mongoose from "mongoose";

const AttendeesSchema = mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  attendingEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // Reference the Event model
      required: true,
    },
  ],
});

const AttendeesModel = mongoose.model("Attendees", AttendeesSchema);

export { AttendeesModel };
