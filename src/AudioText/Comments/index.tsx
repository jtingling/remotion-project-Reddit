import {Container, Paper, Typography} from '@mui/material';

export const Comments: React.FC<{
	titleText: string;
}> = ({titleText}) => {
	return (
		<Container sx={{zIndex: 10, whiteSpace: 'pre-line'}}>
			<Paper>
				<Typography variant="h6">{titleText}</Typography>
			</Paper>
		</Container>
	);
};
