const Day  = require('../models/days');


//Add Days
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
    let day = new Day();
    day['userId'] = req.user.id;
    day.save();
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
