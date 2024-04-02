import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/users", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
});

router.get("/servers", async (req, res) => {
  let collection = await db.collection("servers");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("servers");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.get("/channels/:id", async (req, res) => {
  let collection = await db.collection("channel");
  let query = { serverID: new ObjectId(req.params.id) };
  let result = await collection.find(query).toArray();
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
//get specific channel name
router.get("/channel/:id", async (req, res) => {
  let collection = await db.collection("channel");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.get("/message/:id", async (req, res) => {
  let collection = await db.collection("message");
  let query = { channelID: new ObjectId(req.params.id) };
  let result = await collection.find(query).toArray();
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.get("/user/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/user/auth", async (req, res) => {
  let collection = await db.collection("users");
  const { email, password } = req.body;
  const user = await collection.findOne({ email });
  if (user && req.body.password == user.password) {
    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
    });
  } else {
    res.send("Invalid email or password").status(404);
  }
});

export default router;
