//import libraries
import React from 'react';
import {connect} from 'react-redux';
var moment = require('moment');

//import components
import List from './list';

//import actions
import {addTask, completeTask, deleteTask, editTask, updateTask, saveTask, eraseTask} from '../actions';

export class Day extends React.Component {

    addTask(text, listIndex) {
        console.log(this);
        this.props.dispatch(saveTask(text, listIndex, this.props.index, this.props.date, this.props._id));
    }

    completeTask(text, listIndex, taskIndex){
        this.props.dispatch(saveTask(text, listIndex, this.props.index, this.props.date, this.props._id, taskIndex.index, false, true))
    }

    deleteTask(listIndex, taskIndex) {
        this.props.dispatch(saveTask("", listIndex, this.props.index, this.props.date, this.props._id, taskIndex.index, true));
    }

    editTask(listIndex, taskIndex) {
        this.props.dispatch(editTask(this.props.index, listIndex, taskIndex))
    }

    updateTask(text, listIndex, taskIndex) {
        this.props.dispatch(saveTask(text, listIndex, this.props.index, this.props.date, this.props._id, taskIndex.index));
        // this.props.dispatch(updateTask(text, this.props.index, listIndex, taskIndex))
    }

    render() {
        const lists = this.props.lists.map((list, index) => (
            <li className="list-wrapper" key={index}>
                <List 
                    index={index} {...list} 
                    addTask={(text, listIndex) => this.addTask(text, listIndex)} 
                    completeTask={(text, listIndex, taskIndex) => this.completeTask(text, listIndex, taskIndex)}
                    deleteTask={(listIndex, taskIndex) => this.deleteTask(listIndex, taskIndex)}
                    editTask={(listIndex, taskIndex) => this.editTask(listIndex, taskIndex)}
                    updateTask={(text, listIndex, taskIndex) => this.updateTask(text, listIndex, taskIndex)}
                />
            </li>
        ));

        const title = moment(this.props.date).format("MMM Do YY");

        return (
            <div className="day">
                <h3 className="date-title">{title}</h3>
                <ul className="lists">
                    {lists}
                </ul>
            </div>
        );
    }
}

Day.defaultProps = {
    title: 'Today'
};

const mapStateToProps = state => ({
    // lists: state.boards.lists
});

export default connect(mapStateToProps)(Day);
