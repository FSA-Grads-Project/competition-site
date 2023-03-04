const getLinkedInOAuthURL = () => {
  const rootUrl = "https://www.linkedin.com/oauth/v2/authorization";

  const params = {
    redirect_uri: process.env.LINKEDIN_OAUTH_REDIRECT_URI,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    response_type: "code",
    scope: "r_liteprofile r_emailaddress",
    state: "DCEeFWf45A53sdfKef424",
  };

  const queryString = new URLSearchParams(params);

  return `${rootUrl}?${queryString.toString()}`;
};

export default getLinkedInOAuthURL;
