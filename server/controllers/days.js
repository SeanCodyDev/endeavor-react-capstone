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

//Add Tasks to existing days
exports.addTask = function(req, res, next) {
    console.log('addTask called', req.body, req.params, req.user);
    let id = req.body.id || null;
    // Day.findOneAndUpdate(
    //     { _id: id },
    //     { title: "updated"},
    //     { upsert: true, new: true, setDefaultsOnInsert: true },
    //         function(error, result) {
    //             console.log(error, result);
    //         }

    // )

// Setup stuff
var query = { _id: "5addf83215301b18a78e4dee" },
    update = { title: "foobar"},
    options = { upsert: false };

// Find the document
Day.findOneAndUpdate(query, update, options, function(error, result) {
    if (!error) {
        // If the document doesn't exist
        if (!result) {
            // Create it
            result = new Day(req.body);
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
