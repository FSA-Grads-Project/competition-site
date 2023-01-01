const getGoogleTokens = async (code, axios) => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    grant_type: "authorization_code",
  };

  const queryString = new URLSearchParams(values);

  const { id_token, access_token, refresh_token } = (
    await axios.post(url, queryString.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  ).data;

  return { id_token, access_token, refresh_token };
};

// Not needed at the moment but could potentially be used to re-retrieve user profile from Google if we decide to send email notifications to users
const refreshGoogleTokens = async (refreshToken, axios) => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  };

  const queryString = new URLSearchParams(values);

  const data = (
    await axios.post(url, queryString.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  ).data;
};

const getUserInfo = async (id_token, access_token, axios) => {
  const res = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    }
  );

  // console.log(res.data);

  return res.data;
};

module.exports = { getGoogleTokens, getUserInfo, refreshGoogleTokens };
