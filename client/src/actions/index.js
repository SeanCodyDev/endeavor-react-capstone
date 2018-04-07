var moment = require('moment');

export const ADD_LIST = 'ADD_LIST';
export const addList = title => ({
    type: ADD_LIST,
    title
});

export const ADD_TASK = 'ADD_TASK';
export const addTask = (text, listIndex, dayIndex) => ({
    type: ADD_TASK,
    text,
    listIndex,
    dayIndex
});

export const ADD_DAY = 'ADD_DAY';
export const addDay = (title) => ({
    type: ADD_DAY,
    day: {
        title: title,
        lists: [{
            title: 'MORNING2',
            tasks: []
        }, {
            title: 'AFTERNOON2',
            tasks: []
        }, {
            title: 'NIGHT2',
            tasks: []
        }]
    }
 
});

export const COMPLETE_TASK = 'COMPLETE_TASK';
export const completeTask = (dayIndex, listIndex, taskIndex) => ({
    type: COMPLETE_TASK,
    dayIndex,
    listIndex, 
    taskIndex
})

export const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = (dayIndex, listIndex, taskIndex) => ({
    type: DELETE_TASK,
    dayIndex,
    listIndex, 
    taskIndex
})

export const EDIT_TASK = 'EDIT_TASK';
export const editTask = (dayIndex, listIndex, taskIndex) => ({
    type: EDIT_TASK,
    dayIndex,
    listIndex, 
    taskIndex
})

export const UPDATE_TASK = 'UPDATE_TASK';
export const updateTask = (text, dayIndex, listIndex, taskIndex) => ({
    type: UPDATE_TASK,
    text,
    dayIndex,
    listIndex, 
    taskIndex
})

export const GET_CALENDAR = 'GET_CALENDAR';
export const getCalendar = (props, num, period) => {
    // console.log(props);
    props.startOfCurrentWeek.add(num, period).startOf('week');
    return ({
    type: GET_CALENDAR,
    days: createArrayOfDays(props.startOfCurrentWeek, props.data),
    });
}


function createArrayOfDays(startOfCurrentWeek, daysArray){

const newDaysArray = { days: daysArray}
const finalDaysArray = {days:[]}; 

for (let i=0; i<7; i++) {
    for (let k=0; k<newDaysArray.days.length; k++) {
        // console.log(newDaysArray.days[k].date.format("MMM Do YY"), moment(startOfCurrentWeek).add(i, 'days').format("MMM Do YY"),newDaysArray.days[k].date.format("MMM Do YY") === moment(startOfCurrentWeek).add(i, 'days').format("MMM Do YY") )
        if (newDaysArray.days[k].date.format("MMM Do YY") === moment(startOfCurrentWeek).add(i, 'days').format("MMM Do YY")) {
            finalDaysArray.days[i] = newDaysArray.days[k];
            break
        } else {
            finalDaysArray.days[i] = {
                title: moment(startOfCurrentWeek).add(i, 'days').format("MMM Do YY"),
                date: moment(startOfCurrentWeek).add(i, 'days'),
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
            
        }  
    }
}

// console.log('newDaysArray:', newDaysArray)
// console.log('finalDaysArray:', finalDaysArray)
return finalDaysArray.days;
}