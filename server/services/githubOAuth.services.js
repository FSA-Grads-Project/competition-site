const getGithubTokens = async (code, axios) => {
  const url = "https://github.com/login/oauth/access_token";

  const values = {
    code,
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
  };

  const queryString = new URLSearchParams(values);

  const response = (await axios.post(url, queryString.toString())).data;

  const accessToken = response.split("&")[0].split("=")[1];

  return accessToken;
};

// Function to retrieve user info from googleAPI using the id and access tokens provided by google
const getGithubUserInfo = async (access_token, axios) => {
  const user = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const email = await axios.get(`https://api.github.com/user/emails`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return {
    ...user.data,
    email: email.data
      .filter((email) => email.primary)
      .map((email) => email.email)[0],
  };
};

module.exports = { getGithubTokens, getGithubUserInfo };
