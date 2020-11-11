export default function(h) {
	let {
		$scopedSlots,
		animationEasing,
		animationOptions,
		cloudWords,
		separateAnimationDelay,
		separateAnimationDuration,
		trigger
	} = this;
	$scopedSlots = {
		default({text}) {
			return text;
		},
		...$scopedSlots,
	};
	return h(
		'div',
		{
			style: {
				height: '100%',
				position: 'relative',
				width: '100%',
			},
		},
		[h(
			'div',
			{
				style: {
					bottom: '50%',
					position: 'absolute',
					right: '50%',
					transform: 'translate(50%,50%)',
				},
			},
			cloudWords.map(({
				color,
				font,
				left,
				rotation,
				text,
				top,
				weight,
				word,
			}, index) => h(
				'transition',
				{...animationOptions},
				[h(
					'div',
					{
						key: index,
						style: {
							left: `${left}px`,
							position: 'absolute',
							top: `${top}px`,
							...((separateAnimationDuration > 0)
								? {
									animation: [
										`${separateAnimationDuration}ms`,
										animationEasing,
										`${separateAnimationDelay * index}ms`,
									].join(' '),
									transition: [
										'all',
										`${separateAnimationDuration}ms`,
										animationEasing,
										`${separateAnimationDelay * index}ms`,
									].join(' '),
								}
								: {}
							),
						},
					},
					[h(
						'span',
						{
							on: {
								click() {
									if (trigger) {
										trigger({
											color,
											font,
											left,
											rotation,
											text,
											top,
											weight,
											word
										});
									}
								}
							},
							style: {
								bottom: '50%',
								color: color,
								font: font,
								position: 'absolute',
								right: '50%',
								transform: [
									'translate(50%,50%)',
									`rotate(${rotation}rad)`,
								].join(' '),
								whiteSpace: 'nowrap',
								...((separateAnimationDuration > 0)
									? {
										transition: [
											'all',
											`${separateAnimationDuration}ms`,
											animationEasing,
											`${separateAnimationDelay * index}ms`,
										].join(' '),
									}
									: {}
								),
							},
						},
						[$scopedSlots.default({
							color,
							font,
							left,
							text,
							top,
							weight,
							word,
						})],
					)],
				)],
			)),
		)],
	);
}
