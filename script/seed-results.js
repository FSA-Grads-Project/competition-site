const { faker } = require('@faker-js/faker');

const RESULTS = [];

const createResults = () => {
    return {
        spaceUsed: Math.floor(Math.random() * 10),
        timeElapsed: Math.floor(Math.random() * 100),
        startDatetime: faker.date.recent(),
        completeDatetime: faker.date.future(), 
    }
};

Array.from({length: 10}).forEach(() => RESULTS.push(createResults()));

module.exports = {
    RESULTS
}