import mongoose from 'mongoose';
const { Schema } = mongoose;

const BlogSchema = new Schema({
    title: String,
    description: String
}, {timestamps: true});

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;