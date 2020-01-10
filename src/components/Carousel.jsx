import React, { Component } from 'react';
import Slide from './Slide';
import Indicators from './Indicators';
import Modal from './Modal';
import './Carousel.css';
import leftChevron from '../assets/leftChevron.svg';
import rightChevron from '../assets/rightChevron.svg';
export default class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImageIndex: 0,
            translateValue: 0,
            showHidePrevSlide: {display: 'none'},
            showHideNextSlide: {display: 'block'},
            goToSlide: false,
            videoOpen: false
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        
        this.carouselContainerRef = React.createRef();
        this.slideRef = React.createRef();
    }

    componentDidMount() {
        
        // on mount the function below is needed to work out the size of the screen
        // specifically if there are 2 or less images
        // this to help with the responsiveness of the carousel
        this.updateWindowDimensions();

        // on resize the function is then fire to give you a current
        // screen size to help with responsiveness
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentDidUpdate(prevProps, prevState){
        const lastIndex = this.props.media.length;
        const prevCurrentImageIndex = prevState.currentImageIndex;
        const prevTranslateValue = prevState.translateValue
        const { currentImageIndex, goToSlide } = this.state;
        const slideWidthFunc = this.slideWidth();
        const carouselWidth = this.carouselContainerRef.current.clientWidth / 2;
        let shouldResetIndex = currentImageIndex === lastIndex - 1;
        let slideWidth = (slideWidthFunc / 2) + ((20 * currentImageIndex) + slideWidthFunc);

        // flag is needed here to work out if the dots were clicked or not
        // the dots work in a different way
        if(goToSlide === false) {
            // below works out if the next slide button was clicked or not
            if(currentImageIndex > prevCurrentImageIndex) {

                // if you've hit the last slide, bar one, this will calculate how far to move
                // the carousel to the end of the last image
                if(shouldResetIndex) {
                    slideWidth = (slideWidthFunc / 2) + (20 + slideWidthFunc);
                    this.setState({
                        translateValue: prevTranslateValue + (carouselWidth - slideWidth),
                        showHideNextSlide: {display: 'none'},
                        showHidePrevSlide: {display: 'block'}
                    });
                }
                
                // if you are on the first item this will calculate how far to move the carousel 
                // so the next image is centered
                if(prevCurrentImageIndex === 0) {
                        this.setState({
                        translateValue: prevTranslateValue + (carouselWidth - slideWidth),
                        showHidePrevSlide: {display: 'block'}
                    });
                }

            // below works out if the previous slide button was clicked or not
            }else if(currentImageIndex < prevCurrentImageIndex) {
                shouldResetIndex = currentImageIndex === 0;

                // if you are one slide before the start then this will return the carousel
                // to its original starting position
                if(shouldResetIndex) {
                    this.setState({
                        translateValue: 0,
                        showHidePrevSlide: {display: 'none'},
                        showHideNextSlide: {display: 'block'}
                    });
                }
    
                // if you are on the last item and click previous button this will 
                // move the next image to the centre
                if(prevCurrentImageIndex === (lastIndex - 1)) {
                    slideWidth = (slideWidthFunc / 2) + (20 + slideWidthFunc);
                    this.setState({
                        translateValue: prevTranslateValue - (carouselWidth - slideWidth),
                        showHideNextSlide: {display: 'block'}
                    });
                }
            }
        }
    }
    // works out the screen size for responsiveness
    updateWindowDimensions() {
        const mediaLength = this.props.media.length;
        const windowWidth = window.innerWidth;
        const slide = this.slideRef.current;
        const totalElWidth = slide.clientWidth * mediaLength;
        const totalElMargin = parseInt(slide.style.marginRight) * mediaLength;
        const show = {display: 'block'};
        const hide = {display: 'none'};
        let showHidePrevSlide = hide;
        let showHideNextSlide = show;
        let totalWidthOfSlideContainer = null;

        // if the media less than or equal to 2 and above 800px window size
        // we then set a width so we can centre these images
        if(mediaLength <= 2 && windowWidth > 800) {
            totalWidthOfSlideContainer = totalElWidth + totalElMargin;
            showHidePrevSlide = hide;
            showHideNextSlide = hide;
        }

        if(mediaLength < 2 && windowWidth < 800) {
            totalWidthOfSlideContainer = totalElWidth + totalElMargin;
            showHidePrevSlide = hide;
            showHideNextSlide = hide;
        }

        this.setState({
            windowWidth: windowWidth,
            currentImageIndex: 0,
            translateValue: 0,
            showHidePrevSlide: showHidePrevSlide,
            showHideNextSlide: showHideNextSlide, 
            slideContainerWidth: totalWidthOfSlideContainer
        });
    }
    
    // sets the state to go to the previous slide
    prevSlide() {
        return (e) => {
            e.preventDefault();
            const slideWidthFunc = this.slideWidth();

            this.setState(prevState => ({
                currentImageIndex: prevState.currentImageIndex - 1,
                translateValue: prevState.translateValue + (slideWidthFunc + 20),
                showHideNextSlide: {display: 'block'},
                goToSlide: false
            }));
        }
    }

    // sets the state to go to the next slide
    nextSlide() {
        return (e) => {
            e.preventDefault();
            const slideWidthFunc = this.slideWidth();

            this.setState(prevState => ({
                currentImageIndex: prevState.currentImageIndex + 1,
                translateValue: prevState.translateValue - (slideWidthFunc + 20),
                showHidePrevSlide: {display: 'block'},
                goToSlide: false
            }));
        }
    }

    // works out which dot was clicked and take you to that slide
    goToSlide() {
        return (e) => {
            const index = parseInt(e.target.attributes['data-index'].value);
            const mediaLength = this.props.media.length;
            const slideWidth = this.slideWidth();
            let carouselWidth = this.carouselContainerRef.current.clientWidth / 2;
            const show = {display: 'block'};
            const hide = {display: 'none'};
            let showHidePrevSlide = show;
            let showHideNextSlide = show;
            let translateValue = carouselWidth - ((slideWidth*index) + (20 * index)) - (slideWidth / 2);

            // this take you to the start of the carousel
            if(index === 0) {
                showHidePrevSlide = hide;
                translateValue = 0;
            }

            // this takes you to the end of the carousel
            if(index === (mediaLength - 1)) {
                const totalSlideWidth = slideWidth * mediaLength;
                const totalSlideMargin = 20 * index;
                showHidePrevSlide = show;
                showHideNextSlide = hide;
                carouselWidth = this.carouselContainerRef.current.clientWidth;
                translateValue = ((carouselWidth - totalSlideWidth) - totalSlideMargin);
            }

            this.setState({
                currentImageIndex: index,
                translateValue: translateValue,
                showHidePrevSlide: showHidePrevSlide,
                showHideNextSlide: showHideNextSlide,
                goToSlide: true
            });
        }
    }

    // works out slide width
    slideWidth() { 
        return this.slideRef.current.clientWidth;
    }

    // renders the dots on load
    renderIndicators() {
        const media = this.props.media;
        const mediaLength = media.length;
        let indicators = null;
        // only show indicators if number of items are greater than 2
        // or
        // if number of items is less than or equal to 2 and window width is less than 800, for responsive carousel
        if((mediaLength > 2) || (mediaLength === 2 && this.state.windowWidth < 800)) {
            indicators = (
                <Indicators media={media} position={this.state.currentImageIndex} goToSlide={this.goToSlide()} />
            )
        }
        return indicators;
    }

    triggerLightbox(videoItem) {
        return (e) => {
            e.preventDefault();
            const embedUrl = videoItem.embedUrl;
            this.setState({videoOpen: !this.state.videoOpen, embedUrl})
        }
    }

    render() {
        const media = this.props.media;
        const mediaLength = media.length;
        let slideStyle = "brandedJobMainSlideStyle";
        let dynamicStyle = {transform: `translateX(${this.state.translateValue}px)`};
        let slideContainerStyle = slideStyle;
        if((mediaLength <= 2 && this.state.windowWidth > 800) || mediaLength < 2) {
            slideStyle = "brandedJobSecondarySlideStyle";
            dynamicStyle = {maxWidth: this.state.slideContainerWidth, margin: '0 auto'};
            slideContainerStyle = slideStyle
        }
        return (
            <>
            <div ref={this.carouselContainerRef} className="brandedJobCarouselContainer" data-qe="ctn-carousel-content">
                <div className="brandedJobCarouselContent">
                    <div className="brandedJobSlideLeft" style={this.state.showHidePrevSlide}>
                        <a href="#" onClick={this.prevSlide()} className="brandedJobSlideLeftBtn" data-qe="lnk-prev-slide" />
                        <div className="brandedJobLeftGlyph">
                            <img src={leftChevron} alt="chevron" />
                        </div>
                    </div>
                    <div className={slideContainerStyle} style={dynamicStyle} data-qe="ctn-slide-container">
                        {
                            media.map((item, i) => (
                                <Slide key={i} image={item.image} mediaType={item.mediaType} triggerLightbox={this.triggerLightbox(item)} index={item.displayOrder} slideRef={this.slideRef} />
                            ))   
                        }
                    </div>
                    <div className="brandedJobSlideRight" style={this.state.showHideNextSlide}>
                        <a href="#" onClick={this.nextSlide()} className="brandedJobSlideRightBtn" data-qe="lnk-next-slide" />
                        <div className="brandedJobRightGlyph">
                            <img src={rightChevron} alt="chevron" />
                        </div>
                    </div>
                </div>
                {this.renderIndicators()}
            </div>
            {this.state.videoOpen && <Modal isOpen={() => {this.setState({videoOpen: !this.state.videoOpen})}} embedUrl={this.state.embedUrl} />}
            </>
        );
    }
    
};