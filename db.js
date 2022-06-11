const {Sequelize} = require('sequelize')


module.exports = new Sequelize(  // экспортируем объект который создаем их этого класса
    process.env.DB_NAME, // название бд
    process.env.DB_USER, // пользователь
    process.env.DB_PASSWORD, // пароль
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // <<<<<<< YOU NEED THIS
            }
        },
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT
    }
)

// module.exports = new Sequelize(process.env.DATABASE_URL ) // экспортируем объект который создаем их этого класса