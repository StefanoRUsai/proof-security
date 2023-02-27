import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import data from "./data";
import login from "./login";
import sql from "./sql";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/dataStore", data);
router.use("/login", login);
router.use("/sql", sql);

export default router;
