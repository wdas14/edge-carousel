import React from 'react';
import './Slide.css';

const Slide = (props) => {
	const styles = {
		float: 'left',
		marginRight: '20px',
		position: 'relative'
	}
	let showLightbox = null;
	let playIcon = null;
	let cursor = null;
	if(props.mediaType === 'Video') {
		showLightbox = props.showLightbox;
		playIcon = <img src="/resources/images/controllers/jobs/playButton.svg" className="brandedJobPlayButton" alt="" />
		cursor = 'pointer';
	}
	return (
		<div onClick={showLightbox} ref={props.slideRef} className="slide" style={styles} data-displayorder={props.index}>
			<img src={props.image} className="brandedJobSlideImg" style={{cursor: cursor}} />
			{playIcon}
		</div>
	)
}

export default Slide;