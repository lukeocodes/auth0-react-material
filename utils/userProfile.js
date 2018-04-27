const fetch = require('node-fetch');

const userProfile = async (req) => {
  const userinfo = `https://blog-posts.eu.auth0.com/userinfo`;
  return await fetch(userinfo, { headers: { Authorization: req.headers.authorization }})
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    })
    .then(data => {
      return data;
    });
}

module.exports = userProfile;