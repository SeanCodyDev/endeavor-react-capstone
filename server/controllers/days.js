const Day  = require('../models/days');


//Add Days
exports.addDay = function(req, res, next) {
    console.log('addDay called', req.body, req.params, req.user);
    let day = new Day(req.body);
    day['userId'] = req.user.id;
    day.save();
    return res.json({
       data: 'rosebud'
    });
};