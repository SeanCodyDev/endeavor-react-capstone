import React, { Component } from 'react'
import {connect} from 'react-redux';
import Slider from 'react-slick'

import styled from "styled-components";
import {getCalendar} from '../actions';

import CalendarNav from './cal-nav';
import Day from './day';
import Button from './button';
import Title from './title';
import Header from './header';
// var moment = require('moment');




export class DynamicSlides extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slides: []
    }
  }

  componentDidMount(){
    this.props.dispatch(getDays(this.props, 0, 'week'));
  }


  render() {
    const slidesToShow = 3;

    const days = this.props.days.map((day, index) => (
        <div className="day-wrapper" key={index}>
            <Day index={index} {...day} />
        </div>
    ));

    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: false,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Header />
        <CalendarNav />
        <Slider {...settings}
          ref={slider => this.slider = slider}
        >
        {days}
          {/*{this.state.slides.map(function (slide) {
            return <div key={slide}><h3>{slide}</h3></div>
          })}*/}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    dateDisplayed: state.dateDisplayed,
    startOfCurrentWeek: state.startOfCurrentWeek,
    data: state.data,
    days: state.days
});
}

export default connect(mapStateToProps)(DynamicSlides);