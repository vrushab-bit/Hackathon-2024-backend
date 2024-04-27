import { AttendeesModel } from "../../models/AttendeesSchema.js";

const registerForEvent = async (req, res) => {
  try {
    const { email, name, phone, event_id } = req.body;

    // Find attendee by email
    const attendee = await AttendeesModel.findOne({ email });

    if (attendee) {
      // Update attendee details (excluding email, which is unique)
      attendee.name = name;
      attendee.phone = phone;

      // Push new event ID to attendingEvents array (avoid duplicates)
      if (!attendee.attendingEvents.includes(event_id)) {
        attendee.attendingEvents.push(event_id);
      }

      // Save updated attendee
      const updatedAttendee = await attendee.save();
      return res.status(200).json(updatedAttendee); // OK
    } else {
      // Create new attendee if email doesn't exist
      const newAttendee = new AttendeesModel({
        name,
        email,
        phone,
        attendingEvents: [event_id],
      });

      const savedAttendee = await newAttendee.save();
      return res.status(201).json(savedAttendee); // Created
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error Registering Event" });
  }
};

export { registerForEvent };
