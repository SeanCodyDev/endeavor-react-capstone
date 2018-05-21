import React, { Component } from 'react'
import Slider from 'react-slick'
import Day from './day'
import {connect} from 'react-redux';
import './day.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export class LazyLoad extends Component {
  // begin default
  render() {
    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2
    };
  // end default

        const days = this.props.days.map((day, index) => (
            <Day key={index} {...day} />
        ));

        console.log(days);


    // begin default
    return (
      <div>
        <h2>Lazy Load</h2>
        <Slider {...settings}>
          {/*<h3>{this.props.days[0].lists[0].title}</h3>
          <h3>{this.props.days[0].lists[0].title}</h3>*/}
            {this.props.days.map((day, index) => (
              <Day key={index} {...day} />
            ))}
            {/*
          <div><img src={'./images/tiger.jpg'} /></div>
          <div><img src={'./images/tiger.jpg'} /></div>
          <div><img src={'./images/tiger.jpg'} /></div>
          <div><img src={'./images/tiger.jpg'} /></div>*/}

        </Slider>
      </div>
    );
    // end default
  }
}



const mapStateToProps = state => ({
    days: state.days
});

export default connect(mapStateToProps)(LazyLoad);