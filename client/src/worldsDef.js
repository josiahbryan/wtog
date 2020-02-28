const worldsDef = {
	inner: {
		name: "Union City",
		gmtOffset: -5,
		// Allow weekdays to be spec apart from week:[]
		// because day 6 in UC is same as day 5 but a weekend.
		// This way we dont have to dup day 5 struct just to set a weekend flag
		weekdays: [ 1,2,3,4,5 ],
		week: [
			{
				days: [ 1,2,3,4,5,6 ],
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
			},
			{
				days: [ 0 ],
				blocks: [
					{
						start: 2230,
						end:    630,
						name:  'Sleep',
					},
					{
						start:  630,
						end:   1230,
						name:  'Church',
					},
					{
						start: 1230,
						end:   1630,
						name:  'Rest',
					},
					{
						start: 1630,
						end:   2000,
						name:  'Church',
					},
					{
						start: 2000,
						end:   2230,
						name:  'Evening',
					}
				], // blocks
			} // day
		], // week
	},
	outer: {
		name: "Israel",
		gmtOffset: +2,
		// Allow weekdays to be spec apart from week:[]
		// because day 6 in UC is same as day 5 but a weekend.
		// This way we dont have to dup day 5 struct just to set a weekend flag
		weekdays: [ 0,1,2,3,4 ],
		week: [
			{
				days: [ 0,1,2,3 ],
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
				], // blocks
			}, // day
			{
				days: [ 4 ],
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
						end:   2030,
						name:  'Church',
					},
					{
						start: 2030,
						end:   2230,
						name:  'Evening',
					}
				], // blocks
			}, // day
			{
				days: [ 5 ],
				blocks: [
					{
						start: 2300,
						end:    830,
						name:  'Sleep',
						current: true
					},
					{
						start:  830,
						end:   1200,
						name:  'Morning',
					},
					{
						start: 1200,
						end:   1500,
						name:  'Afternoon',
					},
					{
						start: 1500,
						end:   1945,
						name:  'Church',
					},
					{
						start: 1945,
						end:   2300,
						name:  'Evening',
					}
				], // blocks
			}, // day 
			{
				days: [ 6 ],
				blocks: [
					{
						start: 2300,
						end:    830,
						name:  'Sleep',
						current: true
					},
					{
						start:  830,
						end:   1200,
						name:  'Morning',
					},
					{
						start: 1200,
						end:   1500,
						name:  'Afternoon',
					},
					{
						start: 1500,
						end:   2300,
						name:  'Church',
					},
				], // blocks
			}, // day 
		], // week
	}
};
export default worldsDef;