import {Video, Loop, getInputProps} from 'remotion';

const inputProps = getInputProps();

export const VideoTrack: React.FC<{
	videoFrames: number;
}> = ({videoFrames}) => {
	return (
		<Loop durationInFrames={videoFrames}>
			<Video
				muted
				crossOrigin="youtube.com"
				style={{
					position: 'absolute',
					top: '25%',
					left: 0,
					width: '100%',
					height: 'auto',
				}}
				src={inputProps.video}
			/>
		</Loop>
	);
};
