// var express = require("express");
// var cors = require("cors");
// var mongoClient = require("mongodb").MongoClient;

// var conString = "mongodb://127.0.0.1:27017";
// var app = express();
// app.use(cors());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.get("/get-items",(req,res)=>{
//          mongoClient.connect(conString).then(clientObject=>{
//              var database=clientObject.db("todo-list");
//              database.collection("items").find({}).toArray().then(documents=>{
//                  res.send(documents);
//                  res.end();
//              });
//          });
//     });
// app.get("/get-items/:id",(req,res)=>{
//     mongoClient.connect(conString).then(clientObject=>{
//         var database=clientObject.db("todo-list");
//         database.collection("items").find({Id:parseInt(req.params.id)}).toArray().then(documents=>{
//             res.send(documents);
//             res.end();
//         })
//     })
// })

// app.post("/list-items", (req, res) => {
//     var list = {
//         Id:parseInt(req.body.Id),
//         Item: req.body.Item,
//     }
//     mongoClient.connect(conString).then(clientObject => {
//         var database = clientObject.db("todo-list");
//         database.collection("items").insertOne(list).then(() => {
//             console.log("Item Added");
//             res.end();
//         })
//     })
// })
// app.put("/update/:id",(req,res)=>{
//     var id=parseInt(req.params.id);
//     var list={
//         Id:parseInt(req.body.Id),
//         Item:req.body.Item
//     };
//    mongoClient.connect(conString).then(clientObject=>{
//     var database=clientObject.db("todo-list");
//     database.collection("items").updateOne({Id:id},{$set:list}).then(()=>{
//         console.log("Item updated..");
//         res.end();
//     });
//    });

// });
// app.delete("/delete/:id",(req,res)=>{
//     var id=parseInt(req.params.id);
//     mongoClient.connect(conString).then(clientObject=>{
//         var database=clientObject.db("todo-list");
//         database.collection("items").deleteOne({Id:id}).then(()=>{
//             console.log("Item deleted..");
//             res.end();
//         });

//     });

// });
// app.listen(7700);
// console.log(`Server started: http://127.0.0.1:7700`);

require('dotenv').config(); // Add this line to load environment variables

var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

// Use environment variables
var conString = process.env.MONGO_URI;
var app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/get-items", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo-list");
        database.collection("items").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.get("/get-items/:id", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo-list");
        database.collection("items").find({ Id: parseInt(req.params.id) }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.post("/list-items", (req, res) => {
    var list = {
        Id: parseInt(req.body.Id),
        Item: req.body.Item,
    };
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo-list");
        database.collection("items").insertOne(list).then(() => {
            console.log("Item Added");
            res.end();
        });
    });
});

app.put("/update/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var list = {
        Id: parseInt(req.body.Id),
        Item: req.body.Item
    };
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo-list");
        database.collection("items").updateOne({ Id: id }, { $set: list }).then(() => {
            console.log("Item updated..");
            res.end();
        });
    });
});

app.delete("/delete/:id", (req, res) => {
    var id = parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo-list");
        database.collection("items").deleteOne({ Id: id }).then(() => {
            console.log("Item deleted..");
            res.end();
        });
    });
});

// Use environment variable for port
var port = process.env.PORT || 7700;
app.listen(port, () => {
    console.log(`Server started: http://127.0.0.1:${port}`);
});
