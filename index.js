import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { UserRouter } from "./routes/UserRoutes.js";
import { EventRouter } from "./routes/EventRoutes.js";
import { MongoInit } from "./config/Connect.js";
import { AttendeesRouter } from "./routes/Attendees.js";

dotenv.config();
MongoInit();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/event", EventRouter);
app.use("/api/attend", AttendeesRouter);

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
