//import libraries
import React from 'react';

//import styles
import './add-form.css';

export default class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const text = this.textInput.value.trim();
        if (text && this.props.onAdd) {
            this.props.onAdd(this.textInput.value);
        }
        this.textInput.value = '';
    }

    setEditing(editing) {
        console.log("setEditing fired");
        this.setState({
            editing
        });
    }


    render() {
        if (!this.state.editing) {
            return (
                <div className="add-button"
                onClick={() => this.setEditing(true)}>
                    <p>Add a {this.props.type}...</p>
                </div>
            );
        }

        return (
            <form className="task add-form" onSubmit={this.onSubmit}>
                <input className="task-input" type="text" ref={input => this.textInput = input} />
                <button className="add-click">Add</button>
                <button className="cancel-button" type="button" onClick={() => this.setEditing(false)}>
                    Cancel
                </button>
            </form>
        );
    }
}
