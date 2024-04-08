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

router.get("/serversusers/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = { joined_servers: new ObjectId(req.params.id) };
  let results = await collection.find(query).toArray();
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

router.post(
  "/message/send",
  async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.userId;

        next();
      } catch (error) {
        res.send("Token failed").status(401);
      }
    } else {
      res.send("Not authorized").status(404);
    }
  },
  async (req, res) => {
    let time = new Date();
    let collection = await db.collection("message");
    let message = req.body.message;
    let channel = req.body.channelID;
    try {
      const insertMessage = await collection.insertOne({
        author_id: new ObjectId(req.user),
        message_content: message,
        channelID: new ObjectId(channel),
        timestamp: time,
      });
      return res.status(201).json({
        _id: insertMessage.insertedId,
      });
    } catch (error) {
      console.log(error);
    }
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  }
);

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
        let collection = await db.collection("users");
        req.user = await collection.findOne({
          _id: new ObjectId(decoded.userId),
        });
        next();
      } catch (error) {
        res.status(404).json({ message: "Token failed" });
      }
    } else {
      res.status(404).json({ message: "Not authorized" });
    }
  },
  async (req, res) => {
    let collection = await db.collection("users");
    const user = await collection.findOne({ _id: new ObjectId(req.user._id) });
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar_url: user.avatar_url,
    });
  }
);

router.post("/users/register", async (req, res) => {
  const { username, email, password } = req.body;
  let collection = await db.collection("users");
  const userExists = await collection.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "user already exists" });
  }

  const user = await collection.insertOne({
    username,
    email,
    password,
  });

  if (user) {
    //jwt token

    const token = jwt.sign(
      { userId: user.insertedId },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    //save as http only coookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      _id: user.insertedId,
    });
  } else {
    res.status(400).json({ message: "error occured" });
  }
});

router.post("/users/logout", async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out" });
});

export default router;
