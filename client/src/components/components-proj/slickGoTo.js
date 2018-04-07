import React, { Component } from 'react'
import Slider from 'react-slick'
// import { baseUrl } from './config'

export default class SlickGoTo extends Component {
  constructor(props) {
    super(props)
    this.changeHandler = this.changeHandler.bind(this)
    this.changeSlider = this.changeSlider.bind(this)
    this.state = {
      slides: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      slideIndex: 0,
      updateCount: 0,
    }
    this.fetchSlidesLeft = this.fetchSlidesLeft.bind(this)
    this.fetchSlidesRight = this.fetchSlidesRight.bind(this)
  }

  changeHandler(e) {
    this.sliderWrapper.slider.slickGoTo(e.target.value)
  }

  changeSlider(){
    this.setState({
      slideIndex: this.sliderWrapper.slider.innerSlider.state.currentSlide
    })
  }

  changeUpdateCount(e) {
    this.setState({
      updateCount: this.state.updateCount + 1
    }, () => console.log(`test state after update: ${this.state.updateCount}`))
  }
  

  fetchSlidesRight() {
    const {slides}  = this.state
    const newSlides = [(slides.length + 1), (slides.length + 2), (slides.length + 3)];
    this.setState({
      slides: slides.concat(newSlides),

    })
  }

  fetchSlidesLeft(){
    const {slides} = this.state
    const newSlides = [(slides[0] - 3), (slides[0] - 2), (slides[0] - 1)];
    console.log(this.props, this.state);
    this.setState({
      currentSlide: 5,
      slides: newSlides.concat(slides)
    })
    console.log(this)
    // this.slider.innerSlider.slickGoTo(5)

  }

  render() {
    return (
      <div>
        <h2>Slick Go To</h2>
        <input onChange={this.changeHandler} value={this.state.slideIndex} 
          type='range' min={0} max={3} />
        <SliderWrapper 
          ref={sliderWrapper => this.sliderWrapper = sliderWrapper}  
          beforeChange={this.changeUpdateCount.bind(this)}
          afterChange={this.changeSlider.bind(this)}
          slideIndex={this.state.slideIndex}
          updateCount={this.state.updateCount}
        />
      </div>
    );
  }
}

class SliderWrapper extends React.Component {
  
  shouldComponentUpdate(nextProps, nextState) {
    // certain condition here, perhaps comparison between this.props and nextProps
    // and if you want to update slider on setState in parent of this, return true, otherwise return false
    if (this.props.updateCount !== nextProps.updateCount) {
      return false
    }
    return true
  }

  render() {
          const slidesToShow = 3;
    const settings = {
      // dots: false,
      // infinite: true,
      // speed: 500,
      // slidesToShow: 1,
      // slidesToScroll: 1,
      // afterChange: this.props.afterChange,
      // beforeChange: this.props.beforeChange,
      // },

      beforeChange: (current, next) => {
        console.log('current', current, 'next', next)
        console.log(this.state);
        const lastSlide = next + slidesToShow;
        if (next === 0) {
          console.log('left edge')
          this.fetchSlidesLeft()
          this.slider.slickGoTo(5)

        } else if (lastSlide === this.state.slides.length) {
          console.log('right edge');
          this.fetchSlidesRight()
        }

      },
      // afterChange: current => {
      //   const lastSlide = current + slidesToShow;
      //   if (lastSlide === this.state.slides.length) {
      //     console.log('right edge');
      //     this.fetchSlidesRight()
      //   }
      //   console.log(lastSlide, this.state)
      // },
      dots: true,
      lazyLoad: true,
      infinite: false,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1
      };
    return (
      <Slider ref={slider => this.slider = slider} {...settings}>
        <div>test</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Slider>
    )
  }
}