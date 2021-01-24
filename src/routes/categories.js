const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    const query = `
    SELECT * FROM categories
    `;
    db.query(query)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post('/', (req, res) => {
    const category = req.body;
    const query = `
    INSERT INTO categories (name, color)
    VALUES ($1, $2)
    RETURNING *;
    `;
    db.query(query, [category.name, category.color])
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.delete('/:id', (req, res) => {
    const query = `
    DELETE FROM categories WHERE id = $1;
    `;
    db.query(query, [req.params.id])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  return router;

};