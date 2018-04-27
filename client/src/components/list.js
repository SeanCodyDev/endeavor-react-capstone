import React from 'react';
import {connect} from 'react-redux';

import Task from './task';
import AddForm from './add-form';

//this line isn't necessary because these methods are passed as props?
// import {addTask, completeTask} from '../actions';

export class List extends React.Component {
    addTask(text) {
        this.props.addTask(text, this.props.index);
    }

    completeTask(text, taskIndex) {
        this.props.completeTask(text, this.props.index, taskIndex);
    }

    deleteTask(taskIndex) {
        this.props.deleteTask(this.props.index, taskIndex);
    }

    editTask(taskIndex) {
        this.props.editTask(this.props.index, taskIndex);
    }

    updateTask(text, taskIndex) {
        console.log('taskIndex at list:', taskIndex);
        this.props.updateTask(text, this.props.index, taskIndex);
    }

    render() {
        const tasks = this.props.tasks.map((task, index) =>
            <li key={index}>
                <Task {...task} 
                    onClick={(text) => this.completeTask(text, {index})} 
                    onDelete={(e) => this.deleteTask({index})}
                    onEdit={(e) => this.editTask({index})}
                    onUpdate={(text) => this.updateTask(text, {index})}
                    />
            </li>
        );
        return (
            <div>
                <h3>{this.props.title}</h3>
                <ul className="list">
                    {tasks}
                    <li>
                        <AddForm
                            type="task"
                            onAdd={text => this.addTask(text)}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

List.defaultProps = {
    title: ''
};

export default connect()(List);
