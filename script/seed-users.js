const { faker } = require('@faker-js/faker');

const USERS = [];

const createUser = () => {
    return {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        birthdate: faker.date.birthdate(),
        email: faker.internet.email(),
        country: faker.address.country()
    }
}


Array.from({length: 10}).forEach(() => USERS.push(createUser()));

module.exports = {
    USERS
}