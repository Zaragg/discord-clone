import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
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

router.post("/users/auth", async (req, res) => {
  let collection = await db.collection("users");
  const { email, password } = req.body;
  const user = await collection.findOne({ email });
  if (user && req.body.password == user.password) {
    //jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    //save as http only coookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
    });
  } else {
    res.send("Invalid email or password").status(404);
  }
});
//protected, need to be logged in to access
router.get(
  "/users/profile",
  async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = await db
        //   .collection("users")
        //   .findOne({ _id: new ObjectId(decoded.userId) });
        let collection = await db.collection("users");
        req.user = await collection.findOne({
          _id: new ObjectId(decoded.userId),
        });
        next();
      } catch (error) {
        res.send("Token failed").status(401);
      }
    } else {
      res.send("Not authorized").status(404);
    }
  },
  (req, res) => {
    res.send("get user profile").status(200);
  }
);

export default router;
