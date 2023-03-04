const { faker } = require("@faker-js/faker");
const { encryptEmail } = require("../server/services/encryption.services");

const USERS = [];

const createUser = () => {
  return {
    alias: `anonymousUser${(Math.random() + 1).toString(36).substring(2, 10)}`,
    email: encryptEmail(faker.internet.email()),
    initialLogin: false,
  };
};

USERS.push({
  email: encryptEmail("martinmurjas@gmail.com"),
  admin: true,
  alias: "martinmurjas",
  initialLogin: false,
});

Array.from({ length: 10 }).forEach(() => USERS.push(createUser()));

module.exports = {
  USERS,
};
