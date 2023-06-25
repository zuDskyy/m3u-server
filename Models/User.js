const mongoose = require("mongoose");

// Define a schema for the user collection
const userSchema = new mongoose.Schema(
  {
    secretId: { type: String, required: true, unique: true },
    // Add more fields as needed
  },
  { timestamps: true }
);

// Create a User model based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
