const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const ORM = require('sequelize');
const connection = new ORM(
  process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/tinderent',
);

const modelsFactory = require('./models');
const {Listing} = modelsFactory(connection, ORM);

app.use(express.json());

const fbAuth = (req, res, next)=> {
  console.log(req.headers);
  // Promise.request(`https://graph.facebook.com/me?access_token=${token}`)
  // req to fb graph /me
  // 200-> authd, req.session = profile (response from call), next()
  // any error -> 401 / 403
  req.session = {
    id: '2292117644339273',
  };

  next()
};

connection
  .authenticate()
  .then(() => console.log('success'))
  .catch(err => console.error(err));

app.get('/hydrate', (req, res) => {
  Listing.sync({force: true})
    .then(() => res.json({message: 'tables created'}))
    .catch(err => console.error(err) || res.status(500).json({err}));
});

app.get('/yourlisting', fbAuth, (req, res) => {
  Listing.findAll({where: {author: req.session.id}})
    .then(listings => res.json(listings))
    .catch(err => console.error(err) || res.status(500).json({err}));
});

app.post('/makelisting', fbAuth, (req, res) => {
  Listing.create(req.body)
    .then(response => res.status(201).json({created: response.dataValues}))
    .catch(err => console.error(err) || res.status(500).json({err}));
});

app.get('/yourlisting/:id', (req, res) => {
  Listing.findByPk(1 * req.params.id)
    .then(listing => res.json(listing))
    .catch(err => console.error(err) ||
        res.status(500).json({message: 'read listing failed'}));
});

app.listen(port, () => console.log(`example on port ${port}`));
