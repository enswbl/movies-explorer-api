const router = require('express').Router();

const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

const { Error } = require('../errors/error-messages');

router.use(require('./sign-up'));
router.use(require('./sign-in'));

router.use(auth, require('./users'));
router.use(auth, require('./movies'));

router.use('*', () => {
  throw new NotFoundError(Error.resourceNotFound);
});

module.exports = router;
