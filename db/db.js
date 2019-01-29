const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/practice'

/**
 * 连接
 */
mongoose.connect(
    DB_URL,
    { useNewUrlParser: true, autoIndex: false }
)

/**
 * 连接成功
 */
mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + DB_URL) // eslint-disable-line
})

/**
 * 连接异常
 */
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err) // eslint-disable-line
})

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected') // eslint-disable-line
})

module.exports = mongoose
