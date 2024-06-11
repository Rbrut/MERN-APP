import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import cors from "cors";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";

// Initialize app
const app = express();

// Middleware for paring requestbody
app.use(express.json());

// Middleware for handling CORS Policy
// Option 1: allow all origin with default of cors(*)
app.use(cors());
// option 2: Allow custom origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// Views + URL //
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Hello World");
});

// Book route
app.use("/books", booksRoute);

// Connect MongoDB using mongoose
// only run server if database is connected successfully
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Database connected succesfully.");
    // Only run server if database is connected
    app.listen(PORT, () => {
      console.log(`App is listenning on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
