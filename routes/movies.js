const moviesRouter = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const { movieIdValidation, createMovieValidation } = require('../middlewares/validation');

moviesRouter.get('/movies', getMovies);

moviesRouter.post('/movies', createMovieValidation, createMovie);

moviesRouter.delete('/movies/:movieId', movieIdValidation, deleteMovie);

module.exports = moviesRouter;
