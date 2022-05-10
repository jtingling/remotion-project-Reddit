import React from 'react';
import {useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {Arrow} from '../Arrow';
export const BubbleBody = ({
	children,
}: React.PropsWithChildren<{children: React.ReactNode}>) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const value = spring({
		frame,
		from: -145,
		to: 0,
		fps: videoConfig.fps,
		config: {
			stiffness: 100,
		},
	});
	return (
		<div style={{position: 'relative', top: `${value}px`}}>
			<Arrow />
			<div
				style={{
					position: 'relative',
					top: '0px',
					left: '40px',
					display: 'flex',
					borderRadius: '10px',
					backgroundColor: 'white',
					maxWidth: '440px',
					minHeight: '70px',
				}}
			>
				<div>{children}</div>
			</div>
		</div>
	);
};
