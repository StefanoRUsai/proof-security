import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

interface User {
  id: number;
  username: string;
  password: string;
}

const users: User[] = [
  { id: 1, username: "Topolino", password: "pluto" },
  { id: 2, username: "Paperino", password: "pipo" },
  { id: 3, username: "Minni", password: "paperoga" },
];

router.get("/csrf-token", (req, res) => {
  //res.json({ CSRFToken: req.csrfToken() });
  res.send({ csrfToken: req.csrfToken() });
});

router.post("/", (req, res) => {
  console.log("login di merda", req);
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    "your_secret_key_here"
  );

  res.cookie("TOKEN_POC", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  }); // scade dopo 1 giorno

  res.json({ user, token });
});

router.post("/nosec", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    "your_secret_key_here"
  );

  res.cookie("TOKEN_POC", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  }); // scade dopo 1 giorno

  res.json({ user, token });
});

export default router;
