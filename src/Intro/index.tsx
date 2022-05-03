import {useEffect, useCallback, useState} from 'react';
import {Container, Paper, Typography} from '@mui/material';
import {
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	getInputProps,
	Easing,
} from 'remotion';

export const Intro: React.FC<{title: string | undefined}> = ({title}) => {
	return (
		<Container sx={{zIndex: 10, whiteSpace: 'pre-line'}}>
			<Paper>
				<Typography variant="h4">{title}</Typography>
			</Paper>
		</Container>
	);
};