import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';

const app = express();
const port = 8000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk'); // Set Nunjucks as the view engine


const MOST_LIKED_FOSSILS = {
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587,
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
];

// TODO: Replace this comment with your code

app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

app.get('/top-fossils', (req, res) => {
  const userName = req.session.userName; // Get the userName from the session
   // Check if userName is stored in the session
   if (req.session.userName) {
    res.render('top-fossils.html.njk', { userName: req.session.userName, fossils: MOST_LIKED_FOSSILS });
  } else {
    res.redirect('/homepage');
  }
});

app.get('/homepage', (req, res) => {
  // Check if userName is stored in the session
  if (req.session.userName) {
    res.redirect('/top-fossils');
  } else {
    res.render('homepage.html.njk');
  }
});


// Import necessary modules and initialize Express app

app.post('/get-name', (req, res) => {
  const { name } = req.body; // Retrieve user's name from the submitted form
  req.session.userName = name; // Store the user's name in the session
  res.redirect('/top-fossils'); // Redirect the user to /top-fossils
});

// Add other routes and middleware as needed

// Start the server and listen on the specified port

app.post('/like-fossil', (req, res) => {
  const { fossil } = req.body;
  
  if (MOST_LIKED_FOSSILS[fossil]) {
    MOST_LIKED_FOSSILS[fossil].num_likes++;
    res.render('thank-you.html.njk', { userName: req.session.userName });
  } else {
    res.status(404).send('Fossil not found');
  }
});


ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});


//const express = require('express');
//const app = express();

// Assuming MOST_LIKED_FOSSILS is defined in a file named app.js
//const { MOST_LIKED_FOSSILS } = require('./app');


// Set up view engine and static files if using a templating engine like Nunjucks