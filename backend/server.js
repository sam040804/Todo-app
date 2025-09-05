const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const taskRoutes = require("./routes/app");

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

// Local MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected locally"))
.catch(err => console.error(err));

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const path = require("path");

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
