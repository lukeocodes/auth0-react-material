# Auth0, React and Material UI: In the wild.

This repository reflects the working result of following the Auth0 blog post titled `Auth0, React and Material UI: In the wild`.

## Get this repo working!

You're going to need an mLab account (or local Mongo DB) and an Auth0 application and api.

### Sign Up for Auth0

You'll need an [Auth0](https://auth0.com) account to manage authentication. You can [sign up for a free Auth0 account here](https://auth0.com/signup).

Next, set up an Auth0 Application and API so Auth0 can interface with the React app and Node API.

### Set Up an Auth0 Application

1. Go to your [**Auth0 Dashboard**](https://manage.auth0.com/#/) and click the "[Create a New Application](https://manage.auth0.com/#/applications/create)" button.
2. Name your new app (something like `Angular Firebase`) and select "Single Page Web Applications".
3. In the **Settings** for your new Auth0 application app, add `http://localhost:4200/callback` to the **Allowed Callback URLs**.
4. Enable the toggle for **Use Auth0 instead of the IdP to do Single Sign On**. 
5. At the bottom of the **Settings** section, click "Show Advanced Settings". Choose the **OAuth** tab and verify that the **JsonWebToken Signature Algorithm** is set to "RS256".
6. If you'd like, you can [set up some social connections](https://manage.auth0.com/#/connections/social). You can then enable them for your app in the **Application** options under the **Connections** tab. The example shown in the screenshot above uses username/password database, Facebook, Google, and Twitter. 

> **Note:** For production, make sure you set up your own social keys and do not leave social connections set to use Auth0 dev keys.

### Set Up an Auth0 API

1. Go to [**APIs**](https://manage.auth0.com/#/apis) in your Auth0 dashboard and click on the "Create API" button. Enter a name for the API, such as `Auth0 Videos API`. Set the **Identifier** to your API endpoint URL. In this tutorial, our API identifier is `http://localhost:3001/`. The **Signing Algorithm** should be "RS256".
2. You can consult the Node.js example under the **Quick Start** tab in your new API's settings. In the next steps, we'll implement our Node API in this fashion using [Express](https://expressjs.com/), [express-jwt](https://github.com/auth0/express-jwt), and [jwks-rsa](https://github.com/auth0/node-jwks-rsa).

We're now ready to implement Auth0 authentication on both our React client and Node back end API.

### Setting up a MongoDB database

We're going to use mLab's free cloud-hosted "sandbox" database. This database is not considered suitable for production websites because it lacks redundancy and its support, availability, and size are limited; however, this database is great for development and prototyping.

[Create a free account](https://mlab.com/signup/) with mLab. The bonus over a free AWS or Google Cloud instance is that you can get up and running without providing any payment details.

![Create an mLab account](https://cdn.auth0.com/blog/react-express-and-material-ui-in-the-wild/mlab-signup-created-an-mlab-account.png)

After logging in, you'll be taken to your [home screen](https://mlab.com/home).

* Click **Create New** in the MongoDB Deployments section of the home screen.

  ![Click Create New in the MongoDB Deployments section](https://cdn.auth0.com/blog/react-express-and-material-ui-in-the-wild/mlab-signup-home-screen-click-create-new-deployment.png)

* This opens the Cloud Provider Selection screen.

  ![Select any provider and a free SANDBOX plan](https://cdn.auth0.com/blog/react-express-and-material-ui-in-the-wild/mlab-signup-select-any-provider-and-free-sandbox-plan.png)

  * Select any provider from the Cloud Provider section. Their availability regions differ.

  * Select the 'SANDBOX' plan from the Plan Type section, it's free.

  * Now click **Continue**.

* This opens the Select Region screen.

  ![Select a suitable region that's close to you](https://cdn.auth0.com/blog/react-express-and-material-ui-in-the-wild/mlab-signup-select-a-suitable-region-close-to-you.png)

  * Select the region closest to you and click **Continue**.

* This opens the Final Details screen.

  ![Name your database and click continue](https://cdn.auth0.com/blog/react-express-and-material-ui-in-the-wild/mlab-signup-name-your-database-click-continue.png)

  * Enter the name of your new database and click **Continue**.

* This opens the Order Confirmation screen.

  ![Confirm your details and submit order](https://cdn.auth0.com/blog/react-express-and-material-ui-in-the-wild/mlab-signup-continue-your-details-submit-order.png)

  * Confirm the details and click **Submit Order**.

* You'll be returned to the home screen.

  * Open the database you just created. Note the URL shown here (or where to go find it), as you'll need it later.

  ![Open your new database and note the URL](https://cdn.auth0.com/blog/react-express-and-material-ui-in-the-wild/open-the-database-and-note-the-url.png)

  * Click on the **Users** tab.

  * Click the Add database user button.

  ![Click to add a new database user](https://cdn.auth0.com/blog/react-express-and-material-ui-in-the-wild/click-to-add-a-new-database-user.png)

* This opens an Add new database user form.

  * Complete form and click **Create**.

  ![Complete the user details and click create](https://cdn.auth0.com/blog/react-express-and-material-ui-in-the-wild/complete-user-details-click-create.png)

* You'll be returned to the home screen.

  * Click on the **Collections** tab.

  * Click the Add collection button.
  
  ![Click to add a new database collection](https://cdn.auth0.com/blog/react-express-and-material-ui-in-the-wild/click-to-add-a-new-database-collection.png)

* This opens an Add new collection form.

  * Complete form and click **Create**.
  
  ![Complete the collection details and click create](https://cdn.auth0.com/blog/react-express-and-material-ui-in-the-wild/complete-collection-details-click-create.png)

You now have the URL of a database you can use for development along with a username and password to access it, and a collection to store your favourite videos in. The URL should be something along the lines of `mongodb://<db-user>:<db-password>@<user-domain>.mlab.com:<port>/<db-name>`.

### Edit configs

Edit `server/config.js` and `www-client/src/config.js` and complete with the details required for Auth0 and mLab.

```js
// server/config.js
module.exports = {
  auth0Domain: '<auth0-domain>.auth0.com',
  auth0Audience: '<auth0-api-audience-identifier>',
  auth0YoutubeRss: '<youtube-rss-feed>', // https://www.youtube.com/feeds/videos.xml?channel_id=UCUlQ5VoIzE_kFbYjzUwHTKA
  mlabConnectionString: '<mlab-url-string-or-localhost>',
  corsOrigin: '*',
  nodePort: 3001
};
```

```js
// www-client/src/config.js
module.exports = {
  auth0Domain: '<auth0-domain>.auth0.com',
  auth0ClientID: '<auth0-client-id>',
  auth0RedirectUri: '<auth0-redirect-uri>',
  auth0Audience: '<auth0-api-audience-identifier>',
  auth0ResponseType: 'token id_token',
  auth0Scope: 'openid profile email',
  apiUrl: '<url-to-express-server-application>' // http://localhost:3001
};
```

### Yarn installs

```bash
yarn && yarn --cwd=server && yarn --cwd=www-client
```

### Run the apps

```bash
# From project root
yarn dev # runs both server & www-client
```