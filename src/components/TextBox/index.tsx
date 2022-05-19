import Avatar from '@mui/material/Avatar';
import {BubbleBody} from './BubbleBody';

interface iTextBox {
	redditor: string;
	snooImage: string;
	text: any;
}
export const TextBox: React.FC<iTextBox> = ({redditor, snooImage, text}) => {
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
					snooImage
						? snooImage
						: 'https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png'
				}
			/>
			<BubbleBody>{text}</BubbleBody>
		</div>
	);
};
