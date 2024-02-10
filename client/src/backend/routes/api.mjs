import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.

// This will help us connect to the database

// This section will help you get a list of all the records.
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
export default router;
