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
  const res = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  console.log(res.data);

  return res.data;
};

module.exports = { getGithubTokens, getGithubUserInfo };
