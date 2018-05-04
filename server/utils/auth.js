const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const issuer = `https://blog-posts.eu.auth0.com/`;
const config = {
  secret: jwksRsa.expressJwtSecret({ jwksUri: `${issuer}/.well-known/jwks.json` }),
  audience: `http://localhost:3001/`,
  issuer: issuer,
  algorithms: [ 'RS256' ]
};

module.exports = {
  required: (req, res, next) => {
    return jwt(config)(req, res, next);
  },
  optional: (req, res, next) => {
    return jwt({...config, credentialsRequired: false})(req, res, next);
  }
};
