const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gameSchema = new Schema({
    slug: { type: String },
    title: { type: String },
    systems: [{ type: Schema.Types.ObjectId, ref: 'System' }]
});

module.exports = mongoose.model('Game', gameSchema);