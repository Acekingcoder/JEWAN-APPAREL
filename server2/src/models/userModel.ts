import mongoose, { Document, Model, Schema } from "mongoose";

// Define the User interface for the document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Create a schema for the User
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the User model
const User: Model<IUser> = mongoose.model("User", userSchema);

export default User;
