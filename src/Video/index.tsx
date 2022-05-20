import {Video, Loop, getInputProps} from 'remotion';

const {video} = getInputProps();

export const VideoTrack: React.FC<{
	videoFrames: number;
}> = ({videoFrames}) => {
	return (
		<Loop durationInFrames={videoFrames}>
			<Video
				muted
				style={{
					position: 'absolute',
					top: '20%',
					left: 0,
					width: '100%',
					height: 'auto',
				}}
				src={video}
			/>
		</Loop>
	);
};
