import mongoose from 'mongoose';

const subTotoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      refer: 'User'
    }
  },
  {
    timestamps: true,
  }
  )


export const SubTodo = mongoose.model('SubTodo',subTotoSchema);