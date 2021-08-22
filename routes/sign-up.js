const usersRouter = require('express').Router();

const { createUser } = require('../controllers/users');

const { createUserValidation } = require('../middlewares/validation');

usersRouter.post('/signup', createUserValidation, createUser);

module.exports = usersRouter;
