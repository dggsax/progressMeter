import React from 'react';

export default class ScoreMeter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: this.props.width || 250,
			height: this.props.height || 35,
			bounds: this.props.bounds,
			coverage: this.props.coverage,
			color: this.props.color || "#F8F8F8",
			starSize: this.props.starSize || 10,
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
		var filledStars = this.getPlacementIndex();
		var emptyStars = this.state.bounds.length - filledStars;

		var fills = []

		fills.push(...Array(filledStars).fill("#FFD700"));
		fills.push(...Array(emptyStars).fill("none"))

		return fills;
	}

	getStarStyle(fill) {
		let starStyle = {
			fill: fill,
		    stroke: '#FFD700',
		  	stopColor: '#FFD700',
		    strokeWidth: 1,
		}

		return starStyle;
	}

	buildMeter() {
		var width = this.state.width;
		var height = this.state.height;
		var scoreWidth = width * this.state.coverage;
		var scoreColor = this.determineColor();
		var tickWidth = 1;
		var starFills = this.getStarFills();

		var starSize = this.state.starSize; // the size of the stars
		var starDisplacement = starSize / 2 + 0.5; // how much the stars have to shift to the left to align centers with the ticks
		var meterDisplacement = starSize + 2; // how much the meter needs to shift down to make room for the stars
		var meterTranslate = `translate(0 ${meterDisplacement})`; // the translate function for making room for the stars
		var outlineTranslate = `translate(-0.5 ${meterDisplacement - .5})`; // the outline has to move a slightly different way

		var meter = (
			<div className={this.props.className}>
				<svg width={width} height={height+meterDisplacement} >
					{/* Base Rectangle */}
					<rect width={width} height={height} transform={meterTranslate} fill={this.state.color} />


					{/* Score Rectangle */}
					<rect width={scoreWidth} transform={meterTranslate} height={height} fill={scoreColor} />
					

					{/* Stars */}
					<svg viewBox="0 0 32 32" width={starSize} height={starSize} x={this.state.bounds[0] * width - starDisplacement}>
						<g id="icon-star" style={this.getStarStyle(starFills[0])} >
				          <path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118 l11.547-1.2L16.026,0.6L20.388,10.918z"/>
				        </g>
			        </svg>
					<svg viewBox="0 0 32 32" width={starSize} height={starSize} x={this.state.bounds[1] * width - starDisplacement}>
						<g id="icon-star" style={this.getStarStyle(starFills[1])} >
				          <path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118 l11.547-1.2L16.026,0.6L20.388,10.918z"/>
				        </g>
			        </svg>
					<svg viewBox="0 0 32 32" width={starSize} height={starSize} x={this.state.bounds[2] * width - starDisplacement}>
						<g id="icon-star" style={this.getStarStyle(starFills[2])} >
				          <path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118 l11.547-1.2L16.026,0.6L20.388,10.918z"/>
				        </g>
			        </svg>
			        
			        {/* Tick marks */}
					<rect width={tickWidth} height={height} transform={meterTranslate} fill="#95989A" x={this.state.bounds[0] * width - 1}/>
			        <rect width={tickWidth} height={height} transform={meterTranslate} fill="#95989A" x={this.state.bounds[1] * width - 1}/>
					<rect width={tickWidth} height={height} transform={meterTranslate} fill="#95989A" x={this.state.bounds[2] * width - 1}/>

					
					{/* The outline that goes above everything */}
					<rect width={tickWidth} height={height} transform={meterTranslate} fill="#95989A" x={0}/>
					<rect width={width} height={height} 
						transform={outlineTranslate} 
						stroke={"#95989A"} 
						fill="none"
					/> 
					
				</svg>
			</div>
		)

		return meter;
	}

	render() {
		return (
			this.buildMeter()
		)
	}
}
