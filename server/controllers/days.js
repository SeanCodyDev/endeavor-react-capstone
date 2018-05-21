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
    console.log("req.user:", req.user);
    Day
        .find({"user.id": req.user.id})
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
exports.saveTask = function(req, res, next) {
    console.log('addTask called', req.body, req.user);
    let id = req.body.id || null;
    let taskIndex = Number(req.body.taskIndex);

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
                result.lists.push({title: "Morning", tasks: []}, {title: "Afternoon", tasks: []}, {title: "Night", tasks: []});


            }

            if (!taskIndex && taskIndex != 0) {
                result.lists[listNumber].tasks.push({text: req.body.text, completed: false, editing: false});
            
            } else {
                if (!req.body.del){
                    if (!req.body.completed){
                        result.lists[listNumber].tasks[taskIndex] = {text: req.body.text, completed: false, editing: false};
                    } else {
                        result.lists[listNumber].tasks[taskIndex] = {text: req.body.text, completed: true, editing: false};
                    }
                } else {
                    result.lists[listNumber].tasks.splice(taskIndex, 1);
                }


            }
            result.markModified('lists');
            console.log('result', result);
            // Save the document
            result.save(function(error) {
                if (!error) {
                    // Do something with the document
                    res.json({success: true})
                } else {
                    console.log(error);
                    throw error;
                }
            });
        }
    });

};


// //Update existing tasks
// exports.updateTask = function(req, res, next) {
//     console.log('updateTask called', req.body, req.user);

//     // Setup stuff
//     let options = {
//             upsert: false
//         };

//     let listNumber = Number(req.body.listIndex);
//     let taskNumber = Number(req.body.taskIndex);
//     console.log("listNumber:", listNumber, "taskNumber:", taskNumber);

//       const updated = {};
//       console.log("check:", updated.lists[listNumber].tasks);
//       updated.lists[listNumber].tasks[taskNumber].text = req.body.text;

//       console.log(updated);

//       Day
//         .findByIdAndUpdate(req.body.id, { $set: updated }, options)
//         .then(updatedPost => res.status(204).end())
//         .catch(err => res.status(500).json({ message: 'Something went wrong' }));

// };

