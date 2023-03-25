import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide unique email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    unique: false,
  },
  dob: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  residence: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  homevia: {
    type: String,
    required: true,
  },
  homenumber: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  postalcode: {
    type: String,
    required: true,
  },
  neocheckId: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: true,
  },
  member_since: {
    type: Date,
    default: Date.now,
  },
  verified:{
    type: Boolean,
    default: false
  },
  img:{
    type: String,
    default: ""
  }
});

export default mongoose.model("User", UserSchema);
