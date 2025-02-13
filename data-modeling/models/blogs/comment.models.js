import mongoose from 'mongoose';

const commentSchema = new  mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{timestamps: true});


export const Comment = mongoose.model('Comment',commentSchema);