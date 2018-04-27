import React from 'react';
import {connect} from 'react-redux';
var moment = require('moment');


import List from './list';

import {addList, addDay, addTask, completeTask, deleteTask, editTask, updateTask, saveTask, eraseTask, updateTaskToCollection} from '../actions';

export class Day extends React.Component {
    addList(title) {
        this.props.dispatch(addList(title));
    }

    addDay(){
        this.props.dispatch(addDay());
    }

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
                <h3>{title}</h3>
                <ul className="lists">
                    {lists}
                    {/*<li className="add-list-wrapper">
                        <AddForm
                            type="list"
                            onAdd={title => this.addList(title)}
                        />
                    </li>*/}
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
