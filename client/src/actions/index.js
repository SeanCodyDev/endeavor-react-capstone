var moment = require('moment');
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const ADD_LIST = 'ADD_LIST';
export const addList = title => ({
    type: ADD_LIST,
    title
});

export const ADD_TASK = 'ADD_TASK';
export const addTask = (text, listIndex, dayIndex) => {    
    return {
        type: ADD_TASK,
        text,
        listIndex,
        dayIndex
    }};


export const saveTask = (text, listIndex, dayIndex, date, id, taskIndex, del, completed) => (dispatch, getState) => {
    console.log(text, listIndex, dayIndex, date, id, taskIndex, del, completed);
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/saveTask`, {
        method: 'POST',
        body: JSON.stringify({text: text, listIndex: listIndex, date: date, id: id, taskIndex: taskIndex, del: del, completed: completed}),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            if (!taskIndex && taskIndex != 0) {
                dispatch(addTask(text, listIndex, dayIndex))
                
            } else if(!del) {
                if (!completed) {
                    dispatch(updateTask(text, dayIndex, listIndex, taskIndex))
                } else {

                    dispatch(completeTask(dayIndex, listIndex, taskIndex))
                }

            } else {
                dispatch(deleteTask(dayIndex, listIndex, taskIndex))
            }
        })   
        .catch(err => {
            console.log(err);
            // dispatch(fetchProtectedDataError(err));
        });
};

export const ADD_DAY = 'ADD_DAY';
export const addDay = (title) => ({
    type: ADD_DAY,
    day: {
        title: title,
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
export const updateTask = (text, dayIndex, listIndex, taskIndex) => {
    console.log("testing updateTask");

    return {
        type: UPDATE_TASK,
        text,
        dayIndex,
        listIndex, 
        taskIndex
    }};

// export const updateTaskToCollection = (text, dayIndex, listIndex, taskIndex, id) => (dispatch, getState) => {
//     const authToken = getState().auth.authToken;
//     console.log('eraseTask called');
//     return fetch(`${API_BASE_URL}/updateTask`, {
//         method: 'POST',
//         body: JSON.stringify({text: text, listIndex: listIndex, dayIndex: dayIndex, taskIndex: taskIndex, id: id}),
//         headers: {
//             // Provide our auth token as credentials
//             Authorization: `Bearer ${authToken}`,
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(res => normalizeResponseErrors(res))
//         .then(res => res.json())
//         .then(({data}) => dispatch(updateTask(text, dayIndex, listIndex, taskIndex)))
//         .catch(err => {
//             console.log(err);
//             // dispatch(fetchProtectedDataError(err));
//         });
// };

export const GET_CALENDAR = 'GET_CALENDAR';
export const getCalendar = (days, props, num, period) => {
    console.log("this:", this);
    console.log("props:", props);
    console.log('props start', props.startOfCurrentWeek);
    props.startOfCurrentWeek.add(num, period).startOf('week');
    return ({
    type: GET_CALENDAR,
    days: createArrayOfDays(props.startOfCurrentWeek, days),
    data: days
    });
}

export const getDays = (props, num, period) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/getDays`, {
        method: 'POST',
        body: JSON.stringify({props: props, num: num, period: period}),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(getCalendar(data, props, num, period)))
        .catch(err => {
            console.log(err);
            // dispatch(fetchProtectedDataError(err));
        });
};



function createArrayOfDays(startOfCurrentWeek, daysArray){
if (daysArray.length === 0) {
    daysArray.push({date: null, lists: []});
}
const newDaysArray = { days: daysArray}
const finalDaysArray = {days:[]};
console.log(newDaysArray);

 

for (let i=0; i<7; i++) {
    for (let k=0; k<newDaysArray.days.length; k++) {
        // console.log(newDaysArray.days[k].date.format("MMM Do YY"), moment(startOfCurrentWeek).add(i, 'days').format("MMM Do YY"),newDaysArray.days[k].date.format("MMM Do YY") === moment(startOfCurrentWeek).add(i, 'days').format("MMM Do YY") )
        if (moment(newDaysArray.days[k].date).format("MMM Do YY") === moment(startOfCurrentWeek).add(i, 'days').format("MMM Do YY")) {
            finalDaysArray.days[i] = newDaysArray.days[k];
            break
        } else {
            finalDaysArray.days[i] = {
                date: moment(startOfCurrentWeek).add(i, 'days'),
                lists: [{
                    title: 'Morning',
                    tasks: []
                }, {
                    title: 'Afternoon',
                    tasks: []
                }, {
                    title: 'Night',
                    tasks: []
                }]
            }
            
        }  
    }
}

// console.log('newDaysArray:', newDaysArray)
console.log('finalDaysArray:', finalDaysArray)
return finalDaysArray.days;
}