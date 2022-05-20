import {Img} from 'remotion';
import Avatar from '@mui/material/Avatar';
import {BubbleBody} from './BubbleBody';
import bgImg from '../../../public/pexels-marcelo-jaboo-696407.jpg';
import {iTextBox} from '../../types';

export const TextBox: React.FC<iTextBox> = ({redditor, snooImage, text}) => {
	return (
		<div
			style={{
				backgroundImage: `url(${bgImg})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: '100%',
				backgroundPosition: '50% 55%',
				position: 'absolute',
				left: '0px',
				top: '-355px',
				width: '100%',
				height: '575px',
				zIndex: 5,
				display: 'flex',
			}}
		>
			<Avatar
				sx={{
					position: 'relative',
					top: '240px',
					left: '195px',
					width: '170px',
					height: '170px',
				}}
				alt={redditor}
				src={snooImage}
			/>
			<BubbleBody>{text}</BubbleBody>
		</div>
	);
};
