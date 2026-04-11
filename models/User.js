import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  purchasedCourses: {
    type: [String],
    default: [],
  },

  completedModules: {
    type: [String], // Format: "slug_module_index"
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);