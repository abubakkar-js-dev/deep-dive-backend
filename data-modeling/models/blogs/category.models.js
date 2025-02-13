import mongoose from 'mongoose';

const blogSchema = new  mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
},{timestamps: true});


export const Blog = mongoose.model('Blog',blogSchema);