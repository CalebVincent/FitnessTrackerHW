const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const Exercise = require("./exerciseModel");
// const exercise_view = require("Develop/public/exercise.html");

const databaseUrl = "workout";
const collections = ["exercise"];
const db = mongojs(databaseUrl, collections);

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("Develop/public"));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


db.on("error", error => {
  console.log("Database Error:", error);
});

// link api routes
require("./api_routes")

// setup get routes for so that pages are visitable
app.get("/exercise", (req, res) => {
  res.sendFile(__dirname + "/Develop/public/exercise.html");
});

// setup post routes for updating database
app.post("/submit", ({ body }, res) => {
  Exercise.create(body)
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(3000, () => {
    console.log("App running on port 3000!");
  });
  