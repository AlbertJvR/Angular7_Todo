
const config = {
    test: {
        port: 3000,
        mongodbUri: "mongodb://localhost:27017/TodoApp",
        jwtSecret: "abc123"
    },
    development: {
        port: process.env.PORT,
        mongodbUri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
        jwtSecret: "abc123"
    }
}

module.exports.config = config[process.env.NODE_ENV || 'development'];
