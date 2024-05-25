// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const path = require('path');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB = require("./database/db");
const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/video");
const httpServer = http.createServer(app);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

app.use(express.urlencoded({ extended: true }));

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes)
connectDB();

//for testing the app
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
httpServer.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
