const db = require("./exerciseModel");

module.exports = function (app) {

    // creates an empty table for exercises to be added to


    app.post("/api/exercise", async ({ body }, res) => {
        const request = await db.create(body)
        res.send(request)
    });

    // route for adding exercise
    app.put("/api/exercise/:id", async (req, res) => {
        const request = await db.findOneAndUpdate({_id: req.params.id}, {
            $push: {exercises: req.body}
        })
        res.send(request)
    });

    app.get("/api/exercise", async ({body}, res) => {
        const request = await db.find({})
        res.send(request)
    });

}