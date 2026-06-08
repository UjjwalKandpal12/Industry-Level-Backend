import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";
import { app } from "./app.js";

// Connect to MongoDB, then start the server
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Express error:", err);
      throw err;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
