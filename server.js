const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
// Define your routes here

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://magdalene809:UFeKg0plYmQnp4L7@maintainappclus.afmc1oc.mongodb.net/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
