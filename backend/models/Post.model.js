import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postBody:{
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  links: [
    {
      type: String,
    },
  ],
    tags: [
        {
        type: String,
        },
    ],
    upvotes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
    },
});

const Post = mongoose.model('Post', postSchema);

export default Post;