const getLinkedinTokens = async (code, axios) => {
  const url = "https://www.linkedin.com/oauth/v2/accessToken";

  const values = {
    code,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: process.env.LINKEDIN_OAUTH_REDIRECT_URI,
  };

  const queryString = new URLSearchParams(values);

  const { access_token } = (await axios.post(url, queryString.toString())).data;

  return access_token;
};

// Function to retrieve user info from googleAPI using the id and access tokens provided by google
const getLinkedinUserInfo = async (access_token, axios) => {
  const user = await axios.get(`https://api.linkedin.com/v2/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const email = await axios.get(
    `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return {
    ...user.data,
    email: email.data.elements[0]["handle~"].emailAddress,
  };
};

module.exports = { getLinkedinTokens, getLinkedinUserInfo };
