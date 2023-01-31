// Local imports
const User = require("../db/models/user");

// Function to find user or create new user
const loginUser = async (userInfo) => {
  let user = await User.findOne({
    where: {
      email: userInfo.email,
    },
  });

  if (!user) {
    user = await User.create({
      email: userInfo.email,
      alias: `anonymousUser${(Math.random() + 1)
        .toString(36)
        .substring(2, 10)}`,
    });
  }

  return user;
};

module.exports = { loginUser };
