import React, { Component } from 'react'
import {connect} from 'react-redux';
import styled from "styled-components";
import {getCalendar, getDays} from '../actions';
import Button from './button';
import Title from './title';
import Header from './header';


export class CalendarNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

   fetchNextWeek = () => {
    this.props.dispatch(getDays(this.props, 1, 'week'));
    }

  fetchPrevWeek = () => {
    this.props.dispatch(getDays(this.props, -1, 'week'));
    }

  fetchNextMonth = () => {
    console.log(this);
    this.props.dispatch(getDays(this.props, 1, 'month'));
    }

  fetchPrevMonth = () => {
    this.props.dispatch(getDays(this.props, -1, 'month'));
    }

  render() {

  	const Nav = styled.div`
  		text-align: center;
      padding-top: 80px;
  	`
	    return (
	      <Nav>
	        <Button className='button' onClick={this.fetchPrevMonth}>Prev Month</Button>
	        <Button className='button' onClick={this.fetchPrevWeek}>Prev Week</Button>
	        <Button className='button' onClick={this.fetchNextWeek}>Next Week</Button>
	        <Button className='button' onClick={this.fetchNextMonth}>Next Month</Button>
	      </Nav>
	    );
 	}
}

const mapStateToProps = state => {
  return ({
    dateDisplayed: state.endeavor.dateDisplayed,
    startOfCurrentWeek: state.endeavor.startOfCurrentWeek,
    data: state.endeavor.data,
    days: state.endeavor.days
});
}

export default connect(mapStateToProps)(CalendarNav);
