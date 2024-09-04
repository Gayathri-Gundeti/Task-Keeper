var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

var conString = "mongodb+srv://gundetigayathri0502:gayathri@todo-list.7kkxt.mongodb.net/";
var app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/get-items",(req,res)=>{
         mongoClient.connect(conString).then(clientObject=>{
             var database=clientObject.db("todo-list");
             database.collection("items").find({}).toArray().then(documents=>{
                 res.send(documents);
                 res.end();
             });
         });
    });
app.get("/get-items/:id",(req,res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("todo-list");
        database.collection("items").find({Id:parseInt(req.params.id)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})

app.post("/list-items", (req, res) => {
    var list = {
        Id:parseInt(req.body.Id),
        Item: req.body.Item,
    }
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo-list");
        database.collection("items").insertOne(list).then(() => {
            console.log("Item Added");
            res.end();
        })
    })
})
app.put("/update/:id",(req,res)=>{
    var id=parseInt(req.params.id);
    var list={
        Id:parseInt(req.body.Id),
        Item:req.body.Item
    };
   mongoClient.connect(conString).then(clientObject=>{
    var database=clientObject.db("todo-list");
    database.collection("items").updateOne({Id:id},{$set:list}).then(()=>{
        console.log("Item updated..");
        res.end();
    });
   });

});
app.delete("/delete/:id",(req,res)=>{
    var id=parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("todo-list");
        database.collection("items").deleteOne({Id:id}).then(()=>{
            console.log("Item deleted..");
            res.end();
        });

    });

});
app.listen(7700);
console.log(`Server started: http://127.0.0.1:7700`);



