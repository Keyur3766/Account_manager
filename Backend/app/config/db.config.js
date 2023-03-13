// Confuguration of the Database

module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "3766",
    DB: "Account_manager",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};