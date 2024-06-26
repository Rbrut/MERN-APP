import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publication: {
      type: Number,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

export const Book = mongoose.model("Book", BookSchema);
