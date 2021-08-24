const router = require('express').Router();

const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.use(require('./sign-up'));
router.use(require('./sign-in'));

router.use(auth, require('./users'));
router.use(auth, require('./movies'));

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
