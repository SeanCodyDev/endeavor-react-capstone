//import actions
import {ADD_DAY, ADD_TASK, ADD_LIST, COMPLETE_TASK, DELETE_TASK, EDIT_TASK, UPDATE_TASK, GET_CALENDAR} from '../actions';

//import libraries
var moment = require('moment');

//set initial state
const initialState = {
    dateDisplayed: moment(),
    startOfCurrentWeek: moment().startOf('week'),
    days: [],
    data: []

};

//reducer handles actions from /actions/index.js
export const endeavorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DAY:
        
            return {
                ...state,
                days: [...state.days, action.day]
            };
        case ADD_LIST:
            return Object.assign({}, state, {
                lists: [...state.lists, {
                    title: action.title,
                    tasks: []
                }]
            });
        case ADD_TASK:
            //loop through days to find relevant day
            let days = state.days.map((day, index) => {
                //return untargeted days to state
                if (index !== action.dayIndex) {
                    return day;
                } else {
                    //loop through lists to find relevant list
                    let lists = day.lists.map((list, index) => {
                        if (index !== action.listIndex) {
                            return list;
                        }
                        return Object.assign({}, list, {
                            tasks: [...list.tasks, {
                                text: action.text,
                                completed: false,
                                editing: false
                            }]
                        });
                    });
                    return Object.assign({}, day, {
                        lists
                    });
                }
                
                
            });
            return Object.assign({}, state, {
                days
            });

        case COMPLETE_TASK:
            console.log(action);


            days = state.days.map((day, dayInd) => {
                if (dayInd !== action.dayIndex) {
                    return day;
                } else {

                    let lists = day.lists.map((list, listInd) => {
                        if (listInd !== action.listIndex) {
                            return list;
                        } else {

                            let tasks = list.tasks.map((task, taskInd) => {
                                if (taskInd !== action.taskIndex) {
                                    return task;
                                } else {

                                    return Object.assign({}, task, {
                                        completed: !task.completed
                                    });
                                }
                            });
                            return Object.assign({}, list, {
                                tasks
                            });
                        }

                    });
                    return Object.assign({}, day, {
                        lists
                    });

                }
            });
            return Object.assign({},state, {
                days
            });

        case EDIT_TASK:

            days = state.days.map((day, dayInd) => {
                if (dayInd !== action.dayIndex) {
                    return day;
                } else {
                    let lists = day.lists.map((list, listInd) => {
                        if (listInd !== action.listIndex) {
                            return list;
                        } else {
                            //EDIT HERE

                            let tasks = list.tasks.map((task, taskInd) => {
                                if (taskInd !== action.taskIndex.index) {
                                    return task;
                                } else {
                                    return Object.assign({}, task, {
                                        editing: !task.editing
                                    });
                                }

                            });

                            console.log(tasks);
                            //FINISH EDIT HERE
                            return Object.assign({}, list, {
                                tasks
                            });
                        }

                    });
                    return Object.assign({}, day, {
                        lists
                    });

                }
            });
            return Object.assign({},state, {
                days
            });


        case UPDATE_TASK:

            days = state.days.map((day, dayInd) => {
                if (dayInd !== action.dayIndex) {
                    return day;
                } else {

                    let lists = day.lists.map((list, listInd) => {
                        if (listInd !== action.listIndex) {
                            return list;
                        } else {

                            let tasks = list.tasks.map((task, taskInd) => {
                                if (taskInd !== action.taskIndex) {
                                    return task;
                                } else {

                                    return Object.assign({}, task, {
                                        text: action.text,
                                        editing: !task.editing
                                    });
                                }
                            });
                            return Object.assign({}, list, {
                                tasks
                            });
                        }

                    });
                    return Object.assign({}, day, {
                        lists
                    });

                }
            });
            return Object.assign({},state, {
                days
            });


        case DELETE_TASK:

            days = state.days.map((day, dayInd) => {
                if (dayInd !== action.dayIndex) {
                    return day;
                } else {

                    let lists = day.lists.map((list, listInd) => {
                        if (listInd !== action.listIndex) {
                            return list;
                        } else {

                            let tasks = list.tasks.filter((task, taskInd) => {
                                return taskInd !== action.taskIndex;
                            });
                            return Object.assign({}, list, {
                                tasks
                            });
                        }

                    });
                    return Object.assign({}, day, {
                        lists
                    });

                }
            });
            return Object.assign({},state, {
                days
            });

        case GET_CALENDAR:

            return {
                ...state,
                days:action.days,
                data: action.data
            }

        default:
            return state
    }

};