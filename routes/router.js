/* Import express */
const express = require("express");

/* Setup router */
const router = express.Router();

/* Import db.js */
const db = require("../sql/db");

/* Get all information from database table */
router.get("/", (req, res) => {
  db.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    } else if (res.status(200)) {
      res.json(results.rows);
    }
  });
});

/* Get information from database table by ID */
router.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  db.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    } else if (res.status(200)) {
      res.json(results.rows);
    }
  });
});

/* Insert information into the database table */
router.post("/users", (req, res) => {
  /* Store body variables */
  const { name, email } = req.body;

  if (name != null && email != null) {
    db.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, results) => {
        if (error) {
          throw error;
        } else if (res.status(201)) {
          res.send(`User added with ID: ${results.rows[0].id}`);
        }
      }
    );
  } else if (name == null && email == null) {
    res.send("Request body is invalid!");
  }
});

/* Patch database table information */
router.patch("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const { name, email } = req.body;

  db.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      } else if (res.status(200)) {
        res.send(`User with ID: ${id} has been modified!`);
      }
    }
  );
});

/* Delete user information from database table */
router.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  db.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    } else if (res.status(200)) {
      res.send(`User with ID: ${id} has been deleted!`)
    }
  });
});

module.exports = router;
