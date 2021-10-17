const express = require("express");
const app = express();
const multer = require("multer");

const fileFilter = (_, file, cb) => {
  if (file.mimetype === "image/*") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

require("dotenv").config();

const port = process.env.PORT || 5000;

const allow = function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
};

app.get("/thoughts", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", [allow, upload.single("image")], async (req, res) => {
  console.log(req.file);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App running at: ${port}`);
});
