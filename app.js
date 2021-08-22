require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const { errors } = require('celebrate');

const cors = require('cors');

const path = require('path');

const app = express();

const { PORT, DATA_BASE } = require('./config');

const { auth } = require('./middlewares/auth');

const handleErrors = require('./middlewares/handleErrors');

const NotFoundError = require('./errors/not-found-err');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const crashTest = require('./routes/crash-test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  const allowedCors = [
    'https://localhost:3000',
    'http://localhost:3000',
  ];

  const { origin } = req.headers;

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    res.status(res.statusCode).send();

    return;
  }

  next();
});

app.use(cors({ origin: true, credentials: true }));

app.use(requestLogger);

app.use(crashTest);
app.use(require('./routes/sign-up'));
app.use(require('./routes/sign-in'));

app.use(auth, require('./routes/users'));
app.use(auth, require('./routes/movies'));

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
