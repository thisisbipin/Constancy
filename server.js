const Datastore = require("nedb");
const express = require("express");
var cors = require("cors");

const app = express();
const database = new Datastore("memes.db");
database.loadDatabase();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get("/track", async (req, res) => {
    database.find({}, (err, data) => {
        res.send(data);
    });
    console.log("Data were fetched...");
});

app.get("/update", function (req, res) {
    let user = parseInt(req.query.user);
    let day = parseInt(req.query.day);
    let ques = parseInt(req.query.ques);
    console.log(user, day, ques);
    database.find({ user: user }, (err, data) => {
        // getting hold of the first result
        let newdata = data[0];

        newdata.noofques[day] = ques;
        console.log(newdata);
        database.update(
            { user: user },
            newdata,
            {},
            function (err, numReplaced) {}
        );
        res.send('<script>window.location.href = "/" </script>');
    });
});

app.post("/track", (req, res) => {
    console.log(">> POST requested");
    console.log(req.body);
    res.send("Done");
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
