import {getInputProps} from 'remotion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Arrow} from './Arrow';
import {ContentSlice} from '../../types';
import {BubbleBody} from './BubbleBody';

const inputProps = getInputProps();
interface iTextBox {
	redditor: string;
	snooImage: string;
	text: any;
}
export const TextBox = ({redditor, snooImage, text}: iTextBox) => {
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
					width: '125px',
					height: '125px',
				}}
				alt={redditor}
				src={snooImage}
			/>
			<BubbleBody>{text}</BubbleBody>
		</div>
	);
};
