import React, { Component } from 'react';
import './Indicators.css';

export default class Indicators extends Component {
	
	render() {
		const { media, position, goToSlide } = this.props;
		let dotColour = null;
		return (
			<div className="brandedJobDotContainer">
				{
					media.map((dot, i) => {
						if(i === position) {
							dotColour = {backgroundColor: '#0079d1'}
						}else {
							dotColour = {backgroundColor: '#d8d8d8'}
						}
						return (<div key={i} onClick={goToSlide} className="brandedJobDotHolder" style={dotColour} data-index={i} data-qe={`btn-dot-${i}`}></div>);
					})
				}
			</div>
		)
	}
}