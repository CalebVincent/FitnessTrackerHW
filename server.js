const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const mongoose = require("mongoose");

const databaseUrl = "workout";
const collections = ["exercise"];
const db = mongojs(databaseUrl, collections);

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("Develop/public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


db.on("error", error => {
  console.log("Database Error:", error);
});

// link api routes
require("./api_routes")(app);
require("./html_routes.js")(app);

app.listen(3000, () => {
    console.log("App running on port 3000!");
  });
  