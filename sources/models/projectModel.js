const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
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
    description: {
        type: String,
        required: true
    },
    tools: {
        type: String,
        required: true
    },
    author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'authData',
         required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('projectData', projectSchema);