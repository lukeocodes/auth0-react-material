const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const auth = (req, res, next) => {
  const issuer = `https://blog-posts.eu.auth0.com/`;
  return jwt({
    secret: jwksRsa.expressJwtSecret({ jwksUri: `${issuer}.well-known/jwks.json` }),
    audience: `${issuer}api/v2/`,
    issuer: issuer,
    algorithms: [ 'RS256' ]
  })(req, res, next);
};

module.exports = auth;
