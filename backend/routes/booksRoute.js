import express from "express";
import { Book } from "../models/bookModels.js";

// initialize express router
const router = express.Router();

// save a new book instance
router.post("", async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.publication) {
      return response.status(400).send({
        message: "Some or all of the neccessary information are missing.",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publication: request.body.publication,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get all books from database
router.get("", async (request, response) => {
  try {
    const books = await Book.find({});
    //return response.status(200).json(books);
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get a book by id from database
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ message: "Book does not exist" });
    }
    return response.status(200).json({ data: book });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// update a book by id
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.publication) {
      return response.status(400).send({
        message: "Some or all of the neccessary information are missing.",
      });
    }
    const { id } = request.params;

    const book = await Book.findByIdAndUpdate(id, request.body);

    if (!book) {
      return response.status(404).json({ message: "Book does not exist." });
    }
    return response.status(200).send({ message: "Book updated successfuly" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// delete a book by id
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return response.status(404).json({ message: "Book does not exist" });
    }
    return response.status(200).json({ message: "Book deleted successfuly" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
