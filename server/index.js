const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const ORM = require('sequelize');
const connection = new ORM(
  process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/tinderent',
);
const request = require('request-promise');

const modelsFactory = require('./models');
const {Listing, User} = modelsFactory(connection, ORM);

app.use(express.json());

const fbAuth = (req, res, next) => {
  token = req.get('Authorization').split(' ')[1];
  request(`https://graph.facebook.com/me?access_token=${token}`,)
         .then(response => {
    if (res.status > 200)
      console.error(err) || res.status(401).end();
    else {
      req.session = JSON.parse(response);
      next();
    }
  });
  // req to fb graph /me
  // 200-> authd, req.session = profile (response from call), next()
  // any error -> 401 / 403
};

connection
  .authenticate()
  .then(() => console.log('success'))
  .catch(err => console.error(err));

app.get('/hydrate', (req, res) => {
  Listing.sync({force: true})
    .then(()=> User.sync({ force: true }))
    .then(() => res.json({message: 'tables Listing and User created'}))
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
    .catch(
      err =>
        console.error(err) ||
        res.status(500).json({message: 'read listing failed'}),
    );
});

app.post('/updatelisting/:id', (req, res) => {
  Listing.update(req.body, {where: {id: (1*req.params.id)}})
    .then(response => res.status(201).json({created: response.dataValues}))
    .catch(err => console.error(err) || res.status(500).json({err}));
});

app.get('/checkuser', fbAuth, (req, res) => {
  User.findAll({where: {FBid: req.session.id}})
    .then(user => res.json(user))
    .catch(err => console.error(err) || res.status(500).json({err}));
})

app.post('/makeuser', fbAuth, (req, res) => {
  User.create(req.body)
    .then(response => res.status(201).json({created: response.dataValues}))
    .catch(err => console.error(err) || res.status(500).json({err}));
});

app.get('/users', (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => console.error(err) || res.status(500).json({err}));
});

app.listen(port, () => console.log(`example on port ${port}`));
