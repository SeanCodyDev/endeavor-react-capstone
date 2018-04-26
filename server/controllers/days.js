const Day = require('../models/days');


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

//Get Days
exports.getDays = function(req, res, next) {
    console.log('getDays called', req.body);
    Day
        .find()
        .then(days => {
            res.json(days);
          // res.json(days.map(days => post.serialize()));
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'something went terribly wrong' });
        });
}

//Add Tasks to new or existing days
exports.addTask = function(req, res, next) {
    console.log('addTask called', req.body, req.user);
    let id = req.body.id || null;

    // Setup stuff
    let query = {
            _id: id
        },
        options = {
            upsert: false
        };

    let listNumber = Number(req.body.listIndex);

    // Find the document
    Day.findOneAndUpdate(query, {}, options, function(error, result) {
        console.log(error);
        if (!error) {
            // If the document doesn't exist
            if (!result) {
                // Create it
                result = new Day(req.body);
                //push task
                result['user'] = {email: req.user.email, id: req.user.id};
                // result[`lists[${listNumber}].tasks`] = {text: req.body.text, completed: false, editing: false};
                result['lists']=[];
                result.lists.push({title: "morning", tasks: []}, {title: "afternoon", tasks: []}, {title: "night", tasks: []});


            }
            result.lists[listNumber].tasks.push({text: req.body.text, completed: false, editing: false});
            result.markModified('lists');
            console.log('result', result);
            // Save the document
            result.save(function(error) {
                if (!error) {
                    // Do something with the document
                } else {
                    console.log(error);
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