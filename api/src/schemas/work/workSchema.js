import mongoose from 'mongoose';

const workSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    pdf: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['assigned', 'ongoing', 'completed'],
      default: 'assigned',
    }
  },
  {
    timestamps: true,
  }
);

export const Work = mongoose.model('Work', workSchema);
