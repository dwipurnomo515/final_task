const { Sequelize } = require('sequelize');


const db = new Sequelize({
    username: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'final_task',
    dialect: "postgres"
});

// module.exports = {
//     query: (text, params) => db.query(text, params)
// };

module.exports = db;