const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authData',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('articleData', articleSchema);