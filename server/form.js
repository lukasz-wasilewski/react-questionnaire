const express = require('express');
const path = require('path');
const app = express();

app.get('/:id', (req, res) => {
  res.sendFile(path.normalize(path.join(__dirname, `/formsData/${req.params.id}.json`)));
});

app.post('/:id', (req, res) => {
  const response = {
    answers: req.body,
    formName: req.params.id,
  };
  console.log(response);
  res.json(response);
});

module.exports = app;
