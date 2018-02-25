const mongoose = require('mongoose');
const systemSchema = new mongoose.Schema({
    slug: String,
    title: String
});

module.exports = mongoose.model('System', systemSchema);