import {getInputProps} from 'remotion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Arrow} from './Arrow';
import {BubbleBody} from './BubbleBody';

const inputProps = getInputProps();

export const TextBox: React.FC = ({children}) => {
	return (
		<div
			style={{
				position: 'relative',
				left: '250px',
				marginTop: '2%',
				zIndex: 5,
				display: 'flex',
			}}
		>
			<Avatar
				sx={{
					width: '100px',
					height: '100px',
				}}
				alt={inputProps.user.data.name}
				src={inputProps.user.data.icon_img}
			/>
			<BubbleBody>{children}</BubbleBody>
		</div>
	);
};