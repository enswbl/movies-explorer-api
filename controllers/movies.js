const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const { Error } = require('../errors/error-messages');

const getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(new NotFoundError(Error.movieIdNotFound))
    .then((movies) => res.send({ movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(Error.incorrectData));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(Error.movieIdNotFound))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(Error.invalidOwner);
      }

      Movie.findByIdAndRemove(req.params.movieId)
        .orFail(new NotFoundError(Error.movieIdNotFound))
        .then((removedMovie) => res.send({ removedMovie }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
