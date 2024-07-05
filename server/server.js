// import my packeges
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

//package coinfigs

// express config
const app = express();
app.use(express.json());

// cors config
app.use(cors());

// dotenv config
dotenv.config();

// pg config
// connection string --> we store it in the .env / the value is in the Supabase conncet section
// set up a pool
export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// listen on port
const PORT = process.env.PORT || 8080; // if we have a port in the .env file we use it, if not we use 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// endpoints

app.get("/", (req, res) => {
  res.send("Root endpoint");
});

// GET endpoint --> we need to SELECT data from database
app.get("/getFormData", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT posts.title, posts.content, posts.likes, categories.name AS "category", posts.id FROM posts, categories WHERE posts.category_id = categories.id ORDER BY posts.id`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing GET query:", error);
    res.status(500).send("Server Error");
  }
});

// GET endpoint --> for categories
app.get("/getCategories", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM categories`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing GET query:", error);
    res.status(500).send("Server Error");
  }
});

// POST endpoint --> we receive the body from client and we INSERT the body into the database
app.post("/postFormData", async (req, res) => {
  try {
    const result = await db.query(
      `INSERT INTO posts (title, content, likes, category_id) VALUES ($1, $2, 0, $3) RETURNING *`,
      [req.body.title, req.body.content, req.body.category_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing POST query:", error);
    res.status(500).send("Server Error");
  }
});

//! STRECTH GOALS: UPDATE(PUT) and DELETE endpoints

app.put("/updateFormData/:id", async (req, res) => {
  try {
    const dataId = req.params.id;
    const result = await db.query(
      `UPDATE posts SET title = $1, content = $2, likes = $3, category_id = $4 WHERE id = $5 RETURNING *`,
      [
        req.body.title,
        req.body.content,
        req.body.likes,
        req.body.category_id,
        dataId,
      ]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing PUT query:", error);
    res.status(500).send("Server Error");
  }
});

app.put("/updateLikes/:id", async (req, res) => {
  try {
    const dataId = req.params.id;
    const result = await db.query(
      `UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *`,
      [req.body.likes, dataId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing PUT query:", error);
    res.status(500).send("Server Error");
  }
});

app.delete("/deleteFormData/:id", async (req, res) => {
  try {
    const dataId = req.params.id;
    const result = await db.query(`DELETE FROM posts WHERE id = $1`, [dataId]);
    res.status(200).send("Post deleted successfully");
  } catch (error) {
    console.error("Error executing DELETE query:", error);
    res.status(500).send("Server Error");
  }
});
