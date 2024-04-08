import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./loadenvironment.mjs";
import "express-async-errors";
import api from "./routes/api.mjs";
const PORT = process.env.PORT || 5000;
import { app, server } from "./socket/socket.mjs";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", api);

// start the Express server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
