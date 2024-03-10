const mongoose = require('mongoose');

const ApiSchema = mongoose.Schema({
    title: String,
    content: String,
}, {
    timestamps: false
});

module.exports = mongoose.model('Api', ApiSchema);