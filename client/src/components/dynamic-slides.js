//import libraries
import React, { Component } from 'react'
import {connect} from 'react-redux';

//import actions
import {getDays} from '../actions';

//import components
import Slider from 'react-slick'
import CalendarNav from './cal-nav';
import Day from './day';



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
    // const slidesToShow = 3;

    const days = this.props.days.map((day, index) => (
        <div className="day-wrapper" key={index}>
            <Day ref={day._id} index={index} {...day} />
        </div>
    ));

    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    };

        // {
        //   breakpoint: 1024,
        //   settings: {
        //     slidesToShow: 3,
        //     slidesToScroll: 3,
        //     infinite: true,
        //     dots: true
        //   }
        // },

    if (this.props.loggedIn) {
      return (
        <div>
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
    } else {
      return (
        <div>
        </div>
      )
    } 
  }
}

const mapStateToProps = state => {
  return ({
    dateDisplayed: state.endeavor.dateDisplayed,
    startOfCurrentWeek: state.endeavor.startOfCurrentWeek,
    data: state.endeavor.data,
    days: state.endeavor.days,
    loggedIn: state.auth.currentUser !== null
});
}

export default connect(mapStateToProps)(DynamicSlides);