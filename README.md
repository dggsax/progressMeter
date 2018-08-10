# scoreMeter
making a react progress meter component for my internship

## How to Use
Import Score Meter with:
    `import ScoreMeter from 'scoremeter';`

And then refer to it like:
    `<ScoreMeter
        bounds={[.6,.8,.9]}
        coverage={.85}
        width={250}
        height={50}
        className={"hello"}
        starSize={20}
     />`
The className, starSize, width, and height props are all optional. By default, the width is 250, the height is 35, the className for the generated div is "Stars", and the default size of the stars is 10 pixels
