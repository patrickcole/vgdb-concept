const mongoose = require('mongoose');
const systemSchema = new mongoose.Schema({
    slug: { type: String },
    title: { type: String }
});

module.exports = mongoose.model('System', systemSchema);