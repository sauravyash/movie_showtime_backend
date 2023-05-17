const express = require('express');

const movies = require('../../data/movie_metadata.json')
const theaters = require('../../data/theater_showtimes.json')


const router = express.Router();

// display frontend code in public folder
router.all('/', (req, res) => {
  res.sendFile('index.html');
});

// retrieve the list of all movies
router.get('/movies', (req, res) => {
  res.json(movies);
});

// search for a specific movie according to a keyword
router.get('/movies/find/:keyword', (req, res) => {
  res.json(movies.filter(r => r.title.toLowerCase().includes(req.params.keyword.toLowerCase())));
});

// search for a specific movie according to the given ID
router.get('/movie/:movieID', (req, res) => {
  const movie = movies.find(r => r.id === req.params.movieID)
  if (!movie) {
    res.status(404)
  }
  res.json(movie);
});

// retrieve the list of all theaters
router.get('/theaters', (req, res) => {
  res.json(theaters);
});

// search for a specific theater according to the given ID
router.get('/theater/:theaterID/', (req, res) => {
  const theater = theaters.find(t => t.id === req.params.theaterID);
  if (!theater) {
    res.status(404)
  }
  res.json(theater);
});


module.exports = router;
