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

export default router;
