const allowedOrigins = require('./allowed_origins');

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed to CORS'));
    }
  },
};

module.exports = corsOptions;
