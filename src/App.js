import React, { Component } from 'react';
import Carousel from './components/Carousel';
import './App.css';

import media1 from './assets/wombat1.jpg';
import media2 from './assets/wombat2.jpg';
import media3 from './assets/wombat3.jpg';
import media4 from './assets/wombat4.jpg';

const media = [
	{
		image: media1,
		mediaType: "Image",
		displayOrder: "0",
	},
	{
		image: media2,
		mediaType: "Image",
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
	render() {
		const {media} = this.state;
		return (
			<div className="App">
				<Carousel media={media} />
      		</div>
		);
	}
}

export default App;
