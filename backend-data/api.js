require("dotenv").config(); // Load environment variables from .env file
var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

var conString = process.env.MONGO_URI; // Use environment variable
var app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
  res.status(200).send("Welcome to Our Site.");
})

app.get("/get-items", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db(process.env.DB_NAME); // Use environment variable
        database.collection("items").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    }).catch(err => console.error(err));
});

app.get("/get-items/:id", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db(process.env.DB_NAME); // Use environment variable
        database.collection("items").find({ Id: parseInt(req.params.id) }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    }).catch(err => console.error(err));
});

app.post("/list-items", (req, res) => {
    var list = {
        Id: parseInt(req.body.Id),
        Item: req.body.Item,
    };
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db(process.env.DB_NAME); // Use environment variable
        database.collection("items").insertOne(list).then(() => {
            console.log("Item Added");
            res.end();
        });
    }).catch(err => console.error(err));
});

app.put("/update/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var list = {
        Id: parseInt(req.body.Id),
        Item: req.body.Item
    };
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db(process.env.DB_NAME); // Use environment variable
        database.collection("items").updateOne({ Id: id }, { $set: list }).then(() => {
            console.log("Item updated..");
            res.end();
        });
    }).catch(err => console.error(err));
});

app.delete("/delete/:id", (req, res) => {
    var id = parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db(process.env.DB_NAME); // Use environment variable
        database.collection("items").deleteOne({ Id: id }).then(() => {
            console.log("Item deleted..");
            res.end();
        });
    }).catch(err => console.error(err));
});

const PORT = process.env.PORT || 3000; // Use environment variable
app.listen(PORT, () => {
    console.log(`Server started: http://127.0.0.1:${PORT}`);
});



