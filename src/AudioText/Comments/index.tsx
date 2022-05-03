import {Container, Paper, Typography} from '@mui/material';

export const Comments: React.FC<{
	selftext: string;
}> = ({selftext}) => {
	return (
		<Container
			sx={{
				zIndex: 10,
				whiteSpace: 'pre-line',
				width: 'auto',
				textAlign: 'center',
				padding: '5px',
			}}
		>
			<Typography variant="h6">{selftext}</Typography>
		</Container>
	);
};
