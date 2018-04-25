const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const DaySchema = new Schema({
//     user: {
//     	type: Object,
//     	email: String,
//     	id: String,
//     },
//     date: String,
//     lists: {
//     	type: Array,
//     	index: Number,
//     	title: String,
//     	tasks: Array
//     }
// });

const DaySchema = new Schema({
    user: {
    	type: Object,
    	email: String,
    	id: String,
    },
    date: String,
    test: String,
    lists: {
    	type: Array
    	// list: {
    	// 	title: String,
	    // 	tasks: {
	    // 		type: Array,
	    // 		task: {
		   //  		text: String,
		   //  		completed: Boolean,
		   //  		editing: Boolean
		   //  	}
	    // 	}
    	// }
    }
});


module.exports = mongoose.model('Day', DaySchema);