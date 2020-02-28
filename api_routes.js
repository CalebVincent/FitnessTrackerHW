const db = require("./exerciseModel");

module.exports = function (app) {

    app.post("api/exercise/", function (req, res) {
        db.Workout.create({ exercise: req.body }).then(function (dbWorkout) {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err)
        })
    })

    // route for adding exercise
    app.put("/api/exercise/:id", function (req, res) {
        var query = { _id: req.params.id };
        db.Workout.findOneAndUpdate(query, {
            $push: { exercises: [req.body] }
        }, function (err, dbWorkout) {
            if (err) {
                res.json(err);
            } else {
                res.send(dbWorkout)
            }
        })
    })

    app.get("/api/exercise", function (req, res) {
        db.Workout.find({}).then(function (dbWorkout) {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        })
    })

    app.get("api/exercise/range", (req, res) => {
        db.Workout.find({}).then(function (dbWorkout) {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        })
    })

    // app.get("/api/exercise/:id", function (req, res) {
    //     const request = req.params.id
    //     db.Workout.findById(request, function (err, dbWorkout) {
    //     }).catch(err => {
    //         res.json(err);
    //     })
    // })

}