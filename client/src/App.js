import React from 'react';
import styles from './App.module.scss';

// from https://riptutorial.com/html5-canvas/example/18742/rendering-text-along-an-arc-
(function(){
    const FILL = 0;        // const to indicate filltext render
    const STROKE = 1;
    var renderType = FILL; // used internal to set fill or stroke text
    const multiplyCurrentTransform = true; // if true Use current transform when rendering
                                           // if false use absolute coordinates which is a little quicker
                                           // after render the currentTransform is restored to default transform
                                           
      

    // measure circle text
    // ctx: canvas context
    // text: string of text to measure
    // r: radius in pixels
    //
    // returns the size metrics of the text
    //
    // width: Pixel width of text
    // angularWidth : angular width of text in radians
    // pixelAngularSize : angular width of a pixel in radians
    var measure = function(ctx, text, radius){        
        var textWidth = ctx.measureText(text).width; // get the width of all the text
        return {
            width               : textWidth,
            angularWidth        : (1 / radius) * textWidth,
            pixelAngularSize    : 1 / radius
        };
    }

    // displays text along a circle
    // ctx: canvas context
    // text: string of text to measure
    // x,y: position of circle center
    // r: radius of circle in pixels
    // start: angle in radians to start. 
    // [end]: optional. If included text align is ignored and the text is 
    //        scaled to fit between start and end;
    // [forward]: optional default true. if true text direction is forwards, if false  direction is backward
    const circleText = function (ctx, text, x, y, radius, start, end, forward) {
        let i, textWidth, pA, pAS, a, aw, wScale, aligned, dir;
        if(text.trim() === "" || ctx.globalAlpha === 0){ // dont render empty string or transparent
            return;
        }
        if(isNaN(x) || isNaN(y) || isNaN(radius) || isNaN(start) || (end !== undefined && end !== null && isNaN(end))){ // 
            throw TypeError("circle text arguments requires a number for x,y, radius, start, and end.")
        }
        aligned = ctx.textAlign;        // save the current textAlign so that it can be restored at end
        dir = forward ? 1 : forward === false ? -1 : 1;  // set dir if not true or false set forward as true  
        pAS = 1 / radius;               // get the angular size of a pixel in radians
        textWidth = ctx.measureText(text).width; // get the width of all the text
        if (end !== undefined && end !== null) { // if end is supplied then fit text between start and end
            pA = ((end - start) / textWidth) * dir;
            wScale = (pA / pAS) * dir;
        } else {                 // if no end is supplied correct start and end for alignment
            // if forward is not given then swap top of circle text to read the correct direction
            if(forward === null || forward === undefined){
                if(((start % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) > Math.PI){
                    dir = -1;
                }
            }
            pA = -pAS * dir ;
            wScale = -1 * dir;
            switch (aligned) {
				case "center":       // if centered move around half width
					start -= (pA * textWidth )/2;
					end = start + pA * textWidth;
					break;
				case "right":// intentionally falls through to case "end"
				case "end":
					end = start;
					start -= pA * textWidth;
					break;
				case "left":  // intentionally falls through to case "start"
				case "start":
					end = start + pA * textWidth;
					break;
				default:
					break;
            }
        }

        ctx.textAlign = "center";                     // align for rendering
        a = start;                                    // set the start angle
        for (i = 0; i < text.length; i += 1) {    // for each character
            aw = ctx.measureText(text[i]).width * pA; // get the angular width of the text
            var xDx = Math.cos(a + aw / 2);           // get the yAxies vector from the center x,y out
            var xDy = Math.sin(a + aw / 2);
            if(multiplyCurrentTransform){ // transform multiplying current transform
                ctx.save();
                if (xDy < 0) { // is the text upside down. If it is flip it
                    ctx.transform(-xDy * wScale, xDx * wScale, -xDx, -xDy, xDx * radius + x, xDy * radius + y);
                } else {
                    ctx.transform(-xDy * wScale, xDx * wScale, xDx, xDy, xDx * radius + x, xDy * radius + y);
                }
            }else{
                if (xDy < 0) { // is the text upside down. If it is flip it
                    ctx.setTransform(-xDy * wScale, xDx * wScale, -xDx, -xDy, xDx * radius + x, xDy * radius + y);
                } else {
                    ctx.setTransform(-xDy * wScale, xDx * wScale, xDx, xDy, xDx * radius + x, xDy * radius + y);
                }
            }
            if(renderType === FILL){
                ctx.fillText(text[i], 0, 0);    // render the character
            }else{                    
                ctx.strokeText(text[i], 0, 0);  // render the character
            }
            if(multiplyCurrentTransform){  // restore current transform
                ctx.restore();
            }
            a += aw;                     // step to the next angle
        }
        // all done clean up.
        if(!multiplyCurrentTransform){
            ctx.setTransform(1, 0, 0, 1, 0, 0); // restore the transform
        }
        ctx.textAlign = aligned;            // restore the text alignment
    }
    // define fill text
    var fillCircleText = function(text, x, y, radius, start, end, forward){
        renderType = FILL;
        circleText(this, text, x, y, radius, start, end, forward);
    }
    // define stroke text
    var strokeCircleText = function(text, x, y, radius, start, end, forward){
        renderType = STROKE;
        circleText(this, text, x, y, radius, start, end, forward);
    }
    // define measure text
    var measureCircleTextExt = function(text,radius){
        return measure(this, text, radius);
    }
    // set the prototypes
    CanvasRenderingContext2D.prototype.fillCircleText = fillCircleText;
    CanvasRenderingContext2D.prototype.strokeCircleText = strokeCircleText;
    CanvasRenderingContext2D.prototype.measureCircleText = measureCircleTextExt;  
})();


function TwoWorldsProto() {
	const canvasRef = React.useRef(null);

	const worldsDef = {
		inner: {
			name: "Union City",
			gmtOffset: -5,
			blocks: [
				{
					start: 2230,
					end:    630,
					name:  'Sleep',
				},
				{
					start:  630,
					end:   1300,
					name:  'Morning',
				},
				{
					start: 1300,
					end:   1700,
					name:  'Rest',
				},
				{
					start: 1700,
					end:   2230,
					name:  'Evening',
				}
			],
			days: {
				Weekend: [0, 6],
				Weekday: [1,2,3,4,5]
			}
		},
		outer: {
			name: "Israel",
			gmtOffset: +2,
			blocks: [
				{
					start: 2230,
					end:    700,
					name:  'Sleep',
					current: true
				},
				{
					start:  700,
					end:   1730,
					name:  'Work',
				},
				{
					start: 1730,
					end:   2230,
					name:  'Evening',
				}
			],
			days: {
				Weekend: [5, 6],
				Weekday: [0,1,2,3,4]
			}
		}
	}

	const a2r = angle => (Math.PI / 180) * angle;

	// Useful code also received from https://stackoverflow.com/questions/14193956/draw-arc-will-linear-gradient-html5-canvas

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if(canvas) {
			if(TwoWorldsProto.tid) {
				clearInterval(TwoWorldsProto.tid)
			}

			// const setIntervalx = f => f();

			TwoWorldsProto.tid = setInterval(() => {

				const ctx = canvas.getContext('2d');
				ctx.clearRect(0,0,canvas.width,canvas.height)

				ctx.font = "12px verdana";
				ctx.textAlign = "center";
				ctx.textBaseline = "bottom";
				ctx.fillStyle = "#fff";
				ctx.strokeStyle = "#00ff00";
					
				const timeMax = 2400;

				const { inner, outer } = worldsDef;

				const currentDate = new Date(),
					currentUtcHours = currentDate.getUTCHours();

				// console.log({ currentUtcHours, currentLocalTime })

				// const localGmtOffset = -5, //currentDate.getTimezoneOffset() / 60 * -1,
				const localGmtOffset = currentDate.getTimezoneOffset() / 60 * -1,
					innerGmtDiff = Math.abs(inner.gmtOffset - localGmtOffset),
					outerGmtDiff = Math.abs(outer.gmtOffset - localGmtOffset),
					localSet = innerGmtDiff < outerGmtDiff ? inner : outer;

				// console.log(`Local set name: ${localSet.name}`, innerGmtDiff, outerGmtDiff)

				const minutesPadded = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
				
				const [ cx, cy ] = [ canvas.width / 2, canvas.height / 2 ];

				ctx.save();
				ctx.translate(cx, cy);
				ctx.rotate(a2r(-90));
				ctx.translate(-cx, -cy);
				
				const radiusBase = Math.min(canvas.height, canvas.width);
				
				for(const set of [ inner, outer ]) {
					ctx.save();

					const radius = radiusBase * (set === localSet ? .3 : .4);

					let currentTimeAdjusted = currentUtcHours + set.gmtOffset;
					if (currentTimeAdjusted < 0) {
						currentTimeAdjusted = 24 + currentTimeAdjusted;
					}

					currentTimeAdjusted = parseFloat(currentTimeAdjusted + minutesPadded)
						+ (currentDate.getMilliseconds() / 1000 + currentDate.getSeconds()) / 60;

					const currentRotation = currentTimeAdjusted / timeMax * 360;
					 
					ctx.translate(cx, cy);
					ctx.rotate(a2r(currentRotation));
					ctx.translate(-cx, -cy);
					
					// console.log(`Set: ${set.name}, currentTimeAdjusted=${currentTimeAdjusted}, currentRotation=${currentRotation}`)

					set.blocks.forEach(block => {
						const { start, end } = block;

						let current = start > end ? 
							(
								(currentTimeAdjusted > start && currentTimeAdjusted <= timeMax) ||
								(currentTimeAdjusted >= 0    && currentTimeAdjusted <= end)
							) :
							(
								currentTimeAdjusted > start && currentTimeAdjusted <= end
							);

						if(current) {
							block.current = true;
						} else {
							block.current = false;
						}
					})

					const blocks = set.blocks.sort((b, a) => {
						if(a.current && !b.current) {
							return -1;
						} else
						if(!a.current && b.current) {
							return +1;
						} else {
							return 0;
						}
					});

					blocks.forEach(block => {
						
						const { start, end, name, current } = block;
						// Subtract end from timeMax and label as start (and visa-versa)
						// so that it renders in clockwise order (e.g. starting at top of circle
						// and proceeding to the left, so it would be morning>afternoon>evening (to the left))
						const tStart = timeMax - end;
						const tEnd   = timeMax - start;
						const aStart = tStart / timeMax * 360;
						const aEnd   = tEnd   / timeMax * 360;

						const gradient = ctx.createLinearGradient(0,1024,0, 0);
						gradient.addColorStop(1, '#c0e674');
						gradient.addColorStop(0, '#40d6a5');
						
						// Draw arc.
						ctx.beginPath();
						// ctx.arc(cx, cy, radius, a2r(aStart - .25), a2r(aEnd + .25));
						ctx.arc(cx, cy, radius, a2r(aStart), a2r(aEnd));
						ctx.strokeStyle = current ? gradient : 'rgba(255,255,255,0.25)';
						ctx.lineWidth = 30;
						ctx.lineCap = current ? 'round' : 'butt';
						ctx.stroke();

						// Draw text
						const mp1 = aStart > aEnd ? 360 - aStart : aStart;
						const mp2 = aEnd;
						const midpoint = (mp2 - mp1) / 2 + (aStart > aEnd ? 0 : mp1 );

						ctx.textBaseline = "middle";
						ctx.textAlign = "center";
						ctx.fillStyle = current ? '#000' : "#fff";
						ctx.fillCircleText(name, cx, cy, radius * .99, a2r(midpoint));
					});

					ctx.restore();
				}

				ctx.restore();

				const nonLocalSet = localSet === inner ? outer : inner;

				if(!TwoWorldsProto.counter) {
					TwoWorldsProto.counter = 0;
				}

				return;

				const lpad = x => (x<10 ? '0' : '') + x;
				const innerTime = lpad(currentUtcHours + localSet.gmtOffset)    + ':' + minutesPadded;
				const outerTime = lpad(currentUtcHours + nonLocalSet.gmtOffset) + ':' + minutesPadded;

				const currentDayNum = currentDate.getDay(),
					currentDayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][currentDayNum],
					isLocalWeekend = localSet.days.Weekend.includes(currentDayNum),
					isNonLocalWeeked = nonLocalSet.days.Weekend.includes(currentDayNum);

				ctx.font = '48px serif';
				ctx.fillText(outerTime, cx, radiusBase * .3);
				ctx.fillText(innerTime, cx, radiusBase * .51 + 48 * 1.25);

				ctx.font = '18px serif';
				ctx.fillText(nonLocalSet.name, cx, radiusBase * .3  - 48 * 1);
				ctx.fillText(localSet.name,    cx, radiusBase * .51 + 48 * 1.4);

				ctx.fillText(currentDayName,   cx - 18 * 4, radiusBase * .3 - 18 * 1.1);
				
				ctx.fillText(isNonLocalWeeked ? 'Weekend' : 'Weekday', cx + 18 * 5, radiusBase * .3 - 18 * 1.1);
				ctx.fillText(isLocalWeekend   ? 'Weekend' : 'Weekday', cx, radiusBase * .51 + 48 * 1.8);

				// Draw line at current time
				ctx.beginPath();
				ctx.moveTo(cx, radiusBase * .3);
				ctx.lineTo(cx, radiusBase * .51);
				ctx.lineCap = 'round';
				ctx.lineWidth = 20;
				ctx.strokeStyle = 'rgba(255,255,255,0.5)'
				ctx.stroke();

			}, 1000 / 10);

		} else {
			console.warn("No canvas available")
		}
	});

	return <canvas ref={canvasRef} width={320} height={480}/>

}

function App() {
	return (
		<div className={styles.root}>
			<header className={styles.header}>
				<TwoWorldsProto/>
			</header>
		</div>
	);
}

export default App;