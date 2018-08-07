import React from 'react';

export default class ScoreMeter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: this.props.width || 250,
			height: this.props.height || 35,
			bounds: this.props.bounds,
			coverage: this.props.coverage,
			color: this.props.color || "#F8F8F8"
		}
	}

	getPlacementIndex() {
		var coverage = this.state.coverage;
		var placementIndex = 0;
		var boundsLength = this.state.bounds.length;

		for (var i = 0; i < boundsLength; i++) {
			var currentBound = this.state.bounds[i];
			if (coverage >= currentBound) {
				placementIndex++
			} else { break }
		}

		return placementIndex;
	}

	determineColor() {
		var color = {
			RED: "#E81123",
			ORANGE: "orange",
			YELLOW: "#FCD116",
			GREEN: "#7FBA00",
		}
		
		var placementIndex = this.getPlacementIndex()		

		switch (placementIndex) {
			case 0:
				return color.RED;
			case 1:
				return color.ORANGE;
			case 2: 
				return color.YELLOW;
			case 3:
				return color.GREEN
			default:
				return "";
		}
	}

	getStarFills() {
		console.log("yeet");
		var filledStars = this.getPlacementIndex();
		var emptyStars = this.state.bounds.length - filledStars;

		var fills = []

		fills.push(...Array(filledStars).fill("#FFD700"));
		fills.push(...Array(emptyStars).fill("none"))

		return fills;
	}

	buildMeter() {
		var width = this.state.width;
		var height = this.state.height;
		var scoreWidth = width * this.state.coverage;
		var scoreColor = this.determineColor();
		var tickWidth = 1;

		var starFills = this.getStarFills();
		
		let starStyle1 = {
			fill: starFills[0],
		    stroke: '#FFD700',
		  	stopColor: '#FFD700',
		    strokeWidth: 1,
		}

		let starStyle2 = {
			fill: starFills[1],
		    stroke: '#FFD700',
		  	stopColor: '#FFD700',
		    strokeWidth: 1,
		}

		let starStyle3 = {
			fill: starFills[2],
		    stroke: '#FFD700',
		  	stopColor: '#FFD700',
		    strokeWidth: 1,
		}

		var meter = (
			<svg width={width} height={height+12} >
				{/* Base Rectangle */}
				<rect width={width} height={height} transform="translate(0 12)" fill={this.state.color} />

				{/* Score Rectangle */}
				<rect width={scoreWidth} transform="translate(0 12)" height={height} fill={scoreColor} />
				
				{/* Tick Mark 1 */}
				<svg viewBox="0 0 32 32" width="10px" height="10px" x={this.state.bounds[0] * width - 6.5}>
					<g id="icon-star" style={starStyle1} >
			          <path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118 l11.547-1.2L16.026,0.6L20.388,10.918z"/>
			        </g>
		        </svg>
		        <rect width={tickWidth} height={height} transform="translate(0 12)" fill="#95989A" x={this.state.bounds[0] * width - 1}/>
				
				{/* Tick Mark 2 */}
				<svg viewBox="0 0 32 32" width="10px" height="10px" x={this.state.bounds[1] * width - 6.5}>
					<g id="icon-star" style={starStyle2} >
			          <path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118 l11.547-1.2L16.026,0.6L20.388,10.918z"/>
			        </g>
		        </svg>
		        <rect width={tickWidth} height={height} transform="translate(0 12)" fill="#95989A" x={this.state.bounds[1] * width - 1}/>

		    	{/* Tick Mark 3 */}
				<svg viewBox="0 0 32 32" width="10px" height="10px" x={this.state.bounds[2] * width - 6.5}>
					<g id="icon-star" style={starStyle3} >
			          <path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118 l11.547-1.2L16.026,0.6L20.388,10.918z"/>
			        </g>
		        </svg>
		        <rect width={tickWidth} height={height} transform="translate(0 12)" fill="#95989A" x={this.state.bounds[2] * width - 1}/>


				
				{/* The outline! */}
				<rect width={tickWidth -.5} height={height} transform="translate(0 12)" fill="#95989A" x={0}/>
				<rect width={width} height={height} 
					transform="translate(-0.5 11.5)" 
					stroke={"#95989A"} 
					fill="none"
				/> 
				
			</svg>
		)

		return meter;
	}

	render() {
		return (
			this.buildMeter()
		)
	}
}
