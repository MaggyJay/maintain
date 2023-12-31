

import auth0 from "auth0-js";

const { host, protocol } = window.location
const homepage = protocol + '//' + host
// const oauthCallbackUrl = homepage + '/callback'
const oauthCallbackUrl = "http://localhost:3000/callback"; // Replace 3000 with your development server's port number


console.log(process.env.REACT_APP_AUTH0_DOMAIN);


export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-qzt0df8qypsfsny3.us.auth0.com',
      // process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: 'nIIdL0AsrIdlYa8mxsSsBW45hghY9ssP',
      // process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: oauthCallbackUrl,
      responseType: "token id_token",
      scope: "openid profile email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  setSession = authResult => {
    console.log(authResult);
    // set the time that the access token will expire
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    sessionStorage.setItem("access_token", authResult.accessToken);
    sessionStorage.setItem("id_token", authResult.idToken);
    sessionStorage.setItem("expires_at", expiresAt);
  };

  isAuthenticated() {
    const expiresAt = JSON.parse(sessionStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("id_token");
    sessionStorage.removeItem("expires_at");
    this.userProfile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: homepage
    });
  };

  getAccessToken = () => {
    const accessToken = sessionStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };

  getProfile = cb => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };
}
// console.log(process.env.REACT_APP_AUTH0_DOMAIN);