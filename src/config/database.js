require('dotenv').config()

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.NODE_ENV === "test" ? process.env.DB_DATABASE_TEST : process.env.DB_DATABASE,
    define:{
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}