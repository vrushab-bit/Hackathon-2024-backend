import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/UserSchema.js";

const createuser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new UserModel({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // Created
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
};

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await UserModel.find();
//     res.status(200).json(users); // OK
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching users" });
//   }
// };

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return res.status(200).send({
      message: "Authentication successful!",
      token,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updates = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(req.userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
};

export { createuser, loginUser, getUserById, updateUser, deleteUser };
