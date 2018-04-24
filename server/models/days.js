const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
    user: {
    	type: Object,
    	email: String,
    	id: String,
    },
    date: String,
    lists: {
    	type: Array,
    	index: Number,
    	tasks: Array
    }
});

module.exports = mongoose.model('Day', DaySchema);