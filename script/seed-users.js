const { faker } = require("@faker-js/faker");

const USERS = [];

const createUser = () => {
  return {
    // providerId: Math.floor(Math.random() * 1000000000000000000000).toString(),
    // provider: "GOOGLE",
    alias: `anonymousUser${(Math.random() + 1).toString(36).substring(2, 10)}`,
    // username: faker.internet.userName(),
    // password: faker.internet.password(),
    // firstName: faker.name.firstName(),
    // lastName: faker.name.lastName(),
    // birthdate: faker.date.birthdate(),
    email: faker.internet.email(),
    // country: faker.address.country()
  };
};

USERS.push({
  // providerId: "106070769519563768221",
  // provider: "GOOGLE",
  email: "martinmurjas@gmail.com",
  admin: true,
  alias: "martinmurjas",
});

Array.from({ length: 10 }).forEach(() => USERS.push(createUser()));

module.exports = {
  USERS,
};
