const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
mongoose.set("strictQuery", false);

const app = express();
const port = process.env.PORT || 10000;

// CORS - allow credentials for cookies from frontend
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
routes(app);

// Connect DB rồi mới listen
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect Db success!");
    app.listen(port, () => {
      console.log("Server is running on port:", port);
    });
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });
