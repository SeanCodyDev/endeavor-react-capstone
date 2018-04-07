const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
    userId: String,
    title: String,
    date: String,
    lists: Array
});

module.exports = mongoose.model('Day', DaySchema);