import {
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	getInputProps,
} from 'remotion';
import {Container, Paper, Typography} from '@mui/material';
import {useEffect, useCallback, useState} from 'react';

const title = getInputProps();

export const AudioText: React.FC<{
	titleText: string;
}> = ({titleText}) => {
	const [wordArray, setWordArray] = useState<string[]>([]);
	const frame = useCurrentFrame();

	const populatePassage = useCallback(() => {
		const tempArray = wordArray;
		tempArray.push(titleText);
		tempArray.push(' ');
		if (tempArray.length < 150) {
			setWordArray(tempArray);
		} else {
			setWordArray([]);
		}
	}, [titleText, wordArray]);

	useEffect(() => {
		populatePassage();
	}, [populatePassage]);

	return (
		<Container sx={{zIndex: 10, whiteSpace: 'pre-line'}}>
			<Paper>
				<Typography variant="h6">{wordArray}</Typography>
			</Paper>
		</Container>
	);
};
