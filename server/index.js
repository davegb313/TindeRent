const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const jwt = require('jsonwebtoken');

const calculateHash = require('./hash');

app.use(express.json());


app.listen(port, () => console.log(`example on port ${port}`));
