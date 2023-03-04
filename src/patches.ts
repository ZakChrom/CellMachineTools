const patches = [
	{
		replacements: [
			{
				match: /.\?(..)\(\{key:"reply-other",channel:(.{1,5}),message:(.{1,5}),label:.{1,50},icon:.{1,5},onClick:.{1,6}\}\):null/gm,
				replace: `$&,window?.CMTOOLS?.buildPopover($1, $2, $3)`,
			},
		],
	},
]

export default patches