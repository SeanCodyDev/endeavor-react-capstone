const Day  = require('../models/days');


//Add Days - never manually called
exports.addDay = function(req, res, next) {
    console.log('addDay called', req.body, req.params, req.user);
    let day = new Day();
    day['userId'] = req.user.id;
    day.save();
    return res.json({
       data: 'rosebud'
    });
};

//Add Tasks to new or existing days
exports.addTask = function(req, res, next) {
    console.log('addTask called', req.body, req.user);
    let id = req.body.id || null;
    console.log("id:", id);

// Setup stuff
var pushObj = {};
//dynamically set field name
pushObj[`lists.${req.body.listIndex}`] = req.body.text;
var query = { _id: id},
    update = { $push: pushObj},
    options = { upsert: false };


const newDayUpdates = Object.assign({user: req.user}, req.body);
newDayUpdates[`lists.${req.body.listIndex}`] = req.body.text;

// Find the document
Day.findOneAndUpdate(query, update, options, function(error, result) {
    if (!error) {
        // If the document doesn't exist
        if (!result) {
            // Create it
            result = new Day(newDayUpdates);
            //push task
            let listNumber = req.body.listIndex;

        }
        // Save the document
        result.save(function(error) {
            if (!error) {
                // Do something with the document
            } else {
                throw error;
            }
        });
    }
});

};

//Delete exixting tasks
exports.deleteTask = function(req, res, next) {
    console.log('deleteTask called', req.body, req.params, req.user);
    //
    return res.json({
       // data: 'rosebud'
    });
};

function createList(body) {


}

const newDay = {
                // title: moment(startOfCurrentWeek).add(i, 'days').format("MMM Do YY"),
                date: '',
                lists: [{
                    title: 'MORNING',
                    tasks: []
                }, {
                    title: 'AFTERNOON',
                    tasks: []
                }, {
                    title: 'NIGHT',
                    tasks: []
                }]
            }
