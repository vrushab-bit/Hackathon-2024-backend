import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", UserSchema);

export { UserModel, UserSchema };
