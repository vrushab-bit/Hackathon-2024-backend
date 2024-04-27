import express from "express";

import {
  createuser,
  deleteUser,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers/user/UserController.js";
import { checkJWT } from "../middleware/auth.js";

export const UserRouter = express.Router();

// Create User
UserRouter.post("/", createuser);

// Read All Users
// Not Required
// UserRouter.get("/", getAllUsers);

UserRouter.post("/login", loginUser);

// Read User By ID
UserRouter.get("/me", checkJWT, getUserById);

// Update User
UserRouter.put("/update/me", checkJWT, updateUser);

// Delete User
UserRouter.delete("/delete/me", checkJWT, deleteUser);

export default UserRouter;
