const express = require('express');
const movies = require('../../data/movie_metadata.json')
const theaters = require('../../data/theater_showtimes.json')

const router = express.Router();

router.all('/', (req, res) => {
  res.send({ message: 'Hello world' });
});

router.get('/movies', (req, res) => {
  res.json(movies);
});

router.get('/movies/find/:keyword', (req, res) => {
  res.json(movies.filter(r => r.title.toLowerCase().includes(req.params.keyword.toLowerCase())));
});

router.get('/movie/:movieID', (req, res) => {
  const movie = movies.find(r => r.id === req.params.movieID)
  if (!movie) {
    res.status(404)
  }
  res.json(movie);
});

router.get('/theaters', (req, res) => {
  res.json(theaters);
});

router.get('/theater/:theaterID/', (req, res) => {
  const theater = theaters.find(t => t.id === req.params.theaterID);
  if (!theater) {
    res.status(404)
  }
  res.json(theater);
});


module.exports = router;
