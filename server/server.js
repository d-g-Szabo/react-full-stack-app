// import my packeges

const { application } = require("express");

//package coinfigs

// express config
// cors config
// dotenv config
// pg config
// connection string --> we store it in the .env / the value is in the Supabase conncet section
// set up a pool

// listen on port

// endpoints
// GET endpoint --> we need to SELECT data from database
// POST endpoint --> we receive the body from client and we INSERT the body into the database

//! STRECTH GOALS: UPDATE(PUT) and DELETE endpoints

app.put("/updateFormData/:id", async (req, res) => {
  const dataId = req.params.id;
  const result = await db.query(
    `UPDATE tableName SET name = $1, email = $2, message = $3 WHERE id = $4 RETURNING *`,
    [req.body.name, req.body.email, req.body.message, dataId]
  );
  res.json(result.rows[0]);
});

app.delete("/deleteFormData/:id", async (req, res) => {
  const dataId = req.params.id;
  const result = await db.query(
    `DELETE FROM tableName WHERE id = $1 RETURNING *`,
    [dataId]
  );
  res.json(result.rows[0]);
});
