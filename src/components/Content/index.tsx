import {AbsoluteFill} from 'remotion';
import React from 'react';
import {ReactJSXElementChildrenAttribute} from '@emotion/react/types/jsx-namespace';

export const Content: React.FC<ReactJSXElementChildrenAttribute> = ({
	children,
}) => {
	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				justifyContent: 'start',
				alignContent: 'center',
				top: '70%',
				zIndex: 1,
			}}
		>
			{children}
		</AbsoluteFill>
	);
};
