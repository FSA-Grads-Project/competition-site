const Sequelize = require('sequelize');
const url = process.env.DATABASE_URL || 'postgres://localhost/competition_site_db';

const connection = new Sequelize(url);

module.exports = connection;
