require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Test Route (for checking server)
app.get("/", (req, res) => {
  res.send("API Working");
});

// Routes
app.use("/users", require("./routes/user.routes"));
app.use("/vehicles", require("./routes/vehicle.routes"));
app.use("/trips", require("./routes/trip.routes"));
app.use("/analytics", require("./routes/analytics.routes"));

// 404 Handler (LAST)
app.use(notFound);
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on", process.env.PORT || 3000);
});
