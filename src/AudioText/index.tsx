import {Sequence, useVideoConfig} from 'remotion';
export const AudioText: React.FC<{
	titleText: string;
}> = ({titleText}) => {
	return (
		<div
			style={{
				width: '50%',
				height: '180px',
				zIndex: 5,
				justifyContent: 'center',
			}}
		>
			{titleText}
		</div>
	);
};
