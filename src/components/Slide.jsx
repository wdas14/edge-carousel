import React from 'react';
import './Slide.css';

import playButton from '../assets/playButton.svg';

const Slide = (props) => {
	const styles = {
		float: 'left',
		marginRight: '20px',
		position: 'relative'
	}
	let triggerLightbox = null;
	let playIcon = null;
	let cursor = null;
	if(props.mediaType === 'Video') {
		triggerLightbox = props.triggerLightbox;
		playIcon = <img src={playButton} className="brandedJobPlayButton" alt="play icon" />
		cursor = 'pointer';
	}
	return (
		<div onClick={triggerLightbox} ref={props.slideRef} className="slide" style={styles} data-displayorder={props.index}>
			<img src={props.image} className="brandedJobSlideImg" style={{cursor: cursor}}  alt="media" />
			{playIcon}
		</div>
	)
}

export default Slide;