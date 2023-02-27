import express, { Request, Response } from "express";

const router = express.Router();

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.DATABASE_URL,
  database: process.env.NAME,
  password: process.env.PASSWORD,
  port: 5432,
});
console.log(
  "🚀 ~ file: sql.ts:13 ~ process.env.PASSWORD:",
  process.env.PASSWORD
);
console.log("🚀 ~ file: sql.ts:13 ~ process.env.NAME:", process.env.NAME);
console.log(
  "🚀 ~ file: sql.ts:13 ~ process.env.DATABASE_URL:",
  process.env.DATABASE_URL
);

router.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Not found");
  }
});

router.get("/user", async (req: Request, res: Response) => {
  console.log("🚀 ~ file: sql.ts:44 ~ router.get ~ req:", req.query.name);
  try {
    const name = req.query.name;
    const result = await pool.query(
      `SELECT * FROM users WHERE name = '${name}'`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Not found");
  }
});

export default router;
