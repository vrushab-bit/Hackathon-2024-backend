import mongoose from "mongoose";

export const MongoInit = () => {
  const URL = process.env.DATABASE_URL;
  mongoose.connect(URL);
  const database = mongoose.connection;

  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });

  return database;
};
