import React from 'react';
import {connect} from 'react-redux';

import Day from './day';
import AddForm from './add-form';

import {addDay} from '../actions';

import './day.css';
import './add-form.js';

export class App extends React.Component {

    addDay(title){
        this.props.dispatch(addDay(title));
    }

    render() {
        const days = this.props.days.map((day, index) => (
            <li className="day-wrapper" key={index}>
                <Day index={index} {...day} />
            </li>
        ));

        return (
            <div className="day">
                {/*<h2>Example Day</h2>
                <button onClick={(e) => this.addDay()}>Add Day</button>*/}
                <ul className="days">
                    {days}
                    <li className="add-list-wrapper">
                        <AddForm
                            type="day"
                            onAdd={title => this.addDay(title)}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

App.defaultProps = {
    title: 'App'
};

const mapStateToProps = state => ({
    days: state.days
});

export default connect(mapStateToProps)(App);
