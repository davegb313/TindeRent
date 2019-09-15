const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const ORM = require('sequelize');
const connection = new ORM(process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/tinderent');

const modelsFactory = require('./models');
const { Listing } = modelsFactory(connection, ORM);

app.use(express.json());

connection.authenticate()
  .then(()=> console.log('success'))
  .catch((err)=> console.error(err));


app.get('/hydrate', (req, res)=>{
  Listing.sync({ force: true })
    .then(()=> res.json({ message: 'tables created' }))
    .catch(err => console.error(err)|| res.status(500).json({ err }))
});

app.get('/yourlisting', (req, res)=>{
  Listing.findAll()
    .then(listings => res.json(listings))
    .catch(err=> console.error(err)|| res.status(500).json({ err }))
});

app.post('/makelisting', (req, res)=>{
  Listing.create(req.body)
    .then(response=> res.status(201).json({ created: response.dataValues }))
    .catch(err => console.error(err)|| res.status(500).json({ err }))
});

// app.get('/yourlisting', (req, res)=>{
//   Listing.findOne({ where: {id: req.body.author} })
//     .then(listings => res.json(listings))
//     .catch(err=> console.error(err)|| res.status(500).json({ err }))
// });

app.listen(port, () => console.log(`example on port ${port}`));
