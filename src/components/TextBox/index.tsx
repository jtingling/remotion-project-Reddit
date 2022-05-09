import Avatar from '@mui/material/Avatar';
import {BubbleBody} from './BubbleBody';

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
				src={
					!snooImage
						? 'https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png'
						: snooImage
				}
			/>
			<BubbleBody>{text}</BubbleBody>
		</div>
	);
};
