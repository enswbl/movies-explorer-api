const { celebrate, Joi } = require('celebrate');

const { RegExp } = require('../config');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),

    image: Joi.string().pattern(RegExp.URL).required(),
    trailer: Joi.string().pattern(RegExp.URL).required(),
    thumbnail: Joi.string().pattern(RegExp.URL).required(),

    movieId: Joi.string().required(),

    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  updateUserInfoValidation,
  movieIdValidation,
  createMovieValidation,
};
