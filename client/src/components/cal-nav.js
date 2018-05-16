import React, { Component } from 'react'
import {connect} from 'react-redux';
import styled from "styled-components";
import {getCalendar, getDays} from '../actions';
import Button from './button';
import Title from './title';


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
  	`

    const NavTitle = styled.span`
      padding: 10px;

      @media (max-width: 800px) {
        display: none;
      }
    `
	    return (
	      <Nav>
	        <Button className='button' onClick={this.fetchPrevMonth}><span className="fa fa-chevron-left"></span><span className="fa fa-chevron-left"></span><NavTitle>Prev Month</NavTitle></Button>
	        <Button className='button' onClick={this.fetchPrevWeek}><span className="fa fa-chevron-left"></span><NavTitle>Prev Week</NavTitle></Button>
	        <Button className='button' onClick={this.fetchNextWeek}><NavTitle>Next Week</NavTitle><span className="fa fa-chevron-right"></span></Button>
	        <Button className='button' onClick={this.fetchNextMonth}><NavTitle>Next Month</NavTitle><span className="fa fa-chevron-right"></span><span className="fa fa-chevron-right"></span></Button>
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
