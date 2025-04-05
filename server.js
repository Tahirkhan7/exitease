const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const resignationRoutes = require("./routes/resignationRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resignations", resignationRoutes);
app.use("/api/interviews", interviewRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
