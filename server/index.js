const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Welcome1",
  database: "ez-assi",
  port: "9000",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.get("/cards", (req, res) => {
  db.query("SELECT * FROM cards", (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error retrieving cards from database" });
    }
    res.json(results);
  });
});

app.post("/cards", (req, res) => {
  const { imagePath, assignees, ideaSummary } = req.body;
  db.query(
    "INSERT INTO cards (imagePath, assignees, ideaSummary) VALUES (?, ?, ?)",
    [imagePath, assignees, ideaSummary],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error adding card to database" });
      }
      res.status(201).json({ message: "Card added", cardId: results.insertId });
    }
  );
});

app.put("/cards/:id", (req, res) => {
  const { id } = req.params;
  const { imagePath, assignees, ideaSummary } = req.body;
  db.query(
    "UPDATE cards SET imagePath = ?, assignees = ?, ideaSummary = ? WHERE id = ?",
    [imagePath, assignees, ideaSummary, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error updating card in database" });
      }
      res.json({ message: "Card updated" });
    }
  );
});

app.delete("/cards/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM cards WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error deleting card from database" });
    }
    res.json({ message: "Card deleted" });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
