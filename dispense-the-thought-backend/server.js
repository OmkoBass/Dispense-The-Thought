const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");

// Check if the dir you want to place pictures in exists
// IF YOU GET A PERMISSION DENIED
// With dest or with diskStorage then you also need to add
// __dirname here
if (!fs.existsSync("./thoughts")) {
  fs.mkdir("./thoughts", (err) => {});
}

const storage = multer.diskStorage({
  // YOU NEED TO USE THE __dirname, IT WILL NOT WORK WITHOUT IT
  destination: (req, file, cb) => cb(null, __dirname + `/thoughts`),
  // Always give a UNIQUE filename so that the file is not overwritten
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  // This part is not needed but if you want to check
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    // Returning false will reject it,
    // your req.file will be undefined
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    // 5MB is the max size allowed
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
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

app.post("/upload", [allow, upload.single("file")], async (req, res) => {
  if (req.file) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`App running at: ${port}`);
});
