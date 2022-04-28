import {Container, Paper, Typography} from '@mui/material';

export const Comments: React.FC<{
	selftext: string;
}> = ({selftext}) => {
	return (
		<Container sx={{zIndex: 10, whiteSpace: 'pre-line'}}>
			<Paper>
				<Typography variant="h6">{selftext}</Typography>
			</Paper>
		</Container>
	);
};
