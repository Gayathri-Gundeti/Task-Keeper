// api/index.js

require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const conString = process.env.MONGO_URI; // Use environment variable
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint: Get all items
app.get("/api/get-items", async (req, res) => {
  try {
    const clientObject = await MongoClient.connect(conString);
    const database = clientObject.db(process.env.DB_NAME);
    const documents = await database.collection("items").find({}).toArray();
    res.send(documents);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching items");
  }
});

// Endpoint: Get item by ID
app.get("/api/get-items/:id", async (req, res) => {
  try {
    const clientObject = await MongoClient.connect(conString);
    const database = clientObject.db(process.env.DB_NAME);
    const documents = await database.collection("items").find({ Id: parseInt(req.params.id) }).toArray();
    res.send(documents);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching item by ID");
  }
});

// Endpoint: Add a new item
app.post("/api/list-items", async (req, res) => {
  try {
    const list = {
      Id: parseInt(req.body.Id),
      Item: req.body.Item,
    };
    const clientObject = await MongoClient.connect(conString);
    const database = clientObject.db(process.env.DB_NAME);
    await database.collection("items").insertOne(list);
    console.log("Item Added");
    res.status(201).send("Item added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding item");
  }
});

// Endpoint: Update an item by ID
app.put("/api/update/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const list = {
      Id: parseInt(req.body.Id),
      Item: req.body.Item
    };
    const clientObject = await MongoClient.connect(conString);
    const database = clientObject.db(process.env.DB_NAME);
    await database.collection("items").updateOne({ Id: id }, { $set: list });
    console.log("Item updated..");
    res.status(200).send("Item updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating item");
  }
});

// Endpoint: Delete an item by ID
app.delete("/api/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const clientObject = await MongoClient.connect(conString);
    const database = clientObject.db(process.env.DB_NAME);
    await database.collection("items").deleteOne({ Id: id });
    console.log("Item deleted..");
    res.status(200).send("Item deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item");
  }
});

const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
