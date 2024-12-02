import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    fathername: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
    },
    aadhar: {
      type: String,
      required: true,
      unique: true,
      minlength: 12,
      maxlength: 12,
    },
    uan: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    mobilenumber: {
      type: String,
      default: "9988998899",
      match: /^[6-9]\d{9}$/,
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model('Employee', employeeSchema);
