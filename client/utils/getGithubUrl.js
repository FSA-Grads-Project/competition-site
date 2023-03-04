const getGithubOAuthURL = () => {
  const rootUrl = "https://github.com/login/oauth/authorize";

  const params = {
    redirect_uri: process.env.GITHUB_OAUTH_REDIRECT_URI,
    client_id: process.env.GITHUB_CLIENT_ID,
    scope: ["user", "email"].join(":"),
  };

  const queryString = new URLSearchParams(params);

  return `${rootUrl}?${queryString.toString()}`;
};

export default getGithubOAuthURL;
