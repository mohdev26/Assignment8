const express = require('express');

const booksRoutes = require('./routes/books.routes');

const app = express();

app.use(express.json());

app.use(booksRoutes);

module.exports = app;