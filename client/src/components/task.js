import React from 'react';

import './task.css';

export default function Task(props) {

    if (props.editing) {
        let input;

        return (
            <div className="task" style={{
                textDecoration: props.completed ? 'line-through' : 'none'
            }}>

                <form className="task" onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                      return
                    }
                    props.onUpdate(input.value)
                    input.value = '' 
                    }}>
                   <input type="text" defaultValue={props.text} ref={node => input = node} />
                    <button>Done</button>
                    <button type="button" onClick={(e) => props.onEdit()}>
                        Cancel
                    </button>
                </form>
            </div>

        )


    } else {
        return(
            <div className="task" style={{
                textDecoration: props.completed ? 'line-through' : 'none'
            }}>
                <span className="task-checkbox"><input type="checkbox" defaultChecked={props.completed} onChange={(e) => props.onClick(props.text)} /></span>
                <span className="task-text" onClick={(e) => props.onEdit()}>{props.text}</span>
                <button type="button" className="close task-edit" onClick={(e) => props.onDelete()}>&times;</button>
            </div>
        );

    }

};

Task.defaultProps = {
    text: '',
    completed: false
};
