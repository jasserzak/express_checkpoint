// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const path = require("node:path");

//config
dotenv.config();
const publicDir = path.join(__dirname, "public");

// initialize application
const app = express();

//Define authorize middleware
const workingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 10 && hour <= 17) {
    next();
  } else {
    res.status(403).send("Out of working hours");
  }
};

app.use(workingHours);
app.use(express.static(publicDir));
// define port
const port = process.env.PORT || 5000;

//listen to the port{}
app.listen(port, () => console.log(`server is running on port ${port}`));
