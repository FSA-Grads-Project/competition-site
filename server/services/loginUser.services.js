// Local imports
const User = require("../db/models/user");
const { encryptEmail } = require("./encryption.services");

// Function to find user or create new user
const loginUser = async (userInfo) => {
  let user = await User.findOne({
    where: {
      email: encryptEmail(userInfo.email),
    },
  });

  if (!user) {
    // use email as initial alias option (without @domain.com)
    let alias = userInfo.email.slice(0, userInfo.email.search("@"));

    // check if alias is already being used
    let aliasUser = await User.findOne({ where: { alias } });

    // if alias already exists, begin while loop adding random string after initial alias
    while (aliasUser) {
      alias = `${userInfo.email.slice(0, userInfo.email.search("@"))}${(
        Math.random() + 1
      )
        .toString(36)
        .substring(2, 10)}`;

      aliasUser = await User.findOne({ where: { alias } });
    }

    // create new user using encrypted email and unique alias found above
    user = await User.create({
      email: encryptEmail(userInfo.email),
      alias,
    });
  }

  return user;
};

module.exports = { loginUser };
