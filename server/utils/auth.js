const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const config = require('../config');
const issuer = `https://${config.auth0Domain}/`;
const jwtConfig = {
  secret: jwksRsa.expressJwtSecret({ jwksUri: `${issuer}/.well-known/jwks.json` }),
  audience: config.auth0Audience,
  issuer: issuer,
  algorithms: [ 'RS256' ]
};

module.exports = {
  required: (req, res, next) => {
    return jwt(jwtConfig)(req, res, next);
  },
  optional: (req, res, next) => {
    return jwt({...jwtConfig, credentialsRequired: false})(req, res, next);
  }
};
