const mongoose = require('./db')

const Schema = mongoose.Schema
const BlogSchema = new Schema({
    title: String,
    category: String,
    tags: [String],
    time: { type: Date, default: Date.now },
    read: { type: Number, default: 0 },
    comment: { type: Number, default: 0 },
    content: String,
    draft: { type: Boolean, default: true },
    update: { type: Date, default: Date.now }
})

module.exports = mongoose.model('blog', BlogSchema)
