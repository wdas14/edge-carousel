import React, { Component } from 'react';
import Carousel from './components/Carousel';
import './App.css';

import media1 from './assets/wombat2.jpg';
// import media2 from './assets/wombat1.jpg';
import media3 from './assets/wombat3.jpg';
import media4 from './assets/wombat4.jpg';

const video1 = 'https://www.youtube.com/watch?v=OiuQ_rVM-WE&t=3s'

const media = [
	{
		image: media1,
		mediaType: "Image",
		displayOrder: "0",
	},
	{
		image: video1,
		mediaType: "Video",
		displayOrder: "1",
	},
	{
		image: media3,
		mediaType: "Image",
		displayOrder: "2",
	},
	{
		image: media4,
		mediaType: "Image",
		displayOrder: "3",
	},
]

class App extends Component {
	constructor() {
		super();
		this.state = {
			media: media
		}
	}

	componentDidMount = () => {
		const {media} = this.state;
		media.length > 0 && this.cleanMedia(media)
		.then(cleanMedia => {
			this.setState({media: cleanMedia})
		})
	}

	cleanMedia = async (media) => {
		 
		const videoMedia = await media.filter(item => {
			let media = null;
			if(item.mediaType === 'Video') {
				media = item
			}
			return media
		})

		if(videoMedia !== null) {
			const videoMediaUpdate = await videoMedia.map(item => {
				const newMediaObj = {
					image: item.image,
					mediaType: item.mediaType,
					displayOrder: item.displayOrder,
				}
				const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
				const id = item.image.match(regExp);
	
				newMediaObj.image = `http://img.youtube.com/vi/${id[7]}/${0}.jpg`;
				newMediaObj.embedUrl = `https://www.youtube.com/embed/${id[7]}`;
				return newMediaObj;
			})
			
			const cleanMedia = await media.map(item => {
				const newMediaObj = {
					image: item.image,
					mediaType: item.mediaType,
					displayOrder: item.displayOrder,
				}
	
				videoMediaUpdate.map(videoItem => {
					if(item.displayOrder === videoItem.displayOrder) {
						newMediaObj.image = videoItem.image
						newMediaObj.embedUrl = videoItem.embedUrl;
					}
					return null;
				})
	
				return newMediaObj
			})
	
			return cleanMedia;
		}

		return this.state.media
	}

	render() {
		const {media} = this.state;
		console.log(media);
		return (
			<div className="App">
				<Carousel media={media} />
      		</div>
		);
	}
}

export default App;
