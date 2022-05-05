import {Container, Paper, Typography, Divider} from '@mui/material';

export const Comments: React.FC<{
	selftext: string;
	redditor: string;
}> = ({selftext, redditor}) => {
	return (
		<Container
			sx={{
				zIndex: 10,
				whiteSpace: 'pre-line',
				width: 'auto',
				textAlign: 'left',
				padding: '5px',
			}}
		>
			<Typography>{redditor} says:</Typography>
			<Divider />
			<Typography variant="h6">{selftext}</Typography>
		</Container>
	);
};
