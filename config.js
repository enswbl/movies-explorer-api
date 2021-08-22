const {
  NODE_ENV, PORT = 3000, DATA_BASE = 'mongodb://localhost:27017/moviesdb', JWT_SECRET = 'dev-secret-101',
} = process.env;

const RegExp = {
  URL: /^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/,
};

module.exports = {
  NODE_ENV,
  PORT,
  DATA_BASE,
  JWT_SECRET,
  RegExp,
};
