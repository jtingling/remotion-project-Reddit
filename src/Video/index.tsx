import {Video, Loop, getInputProps} from 'remotion';

const inputProps = getInputProps();

export const VideoTrack: React.FC<{
	videoFrames: number;
}> = ({videoFrames}) => {
	return (
		<Loop durationInFrames={videoFrames}>
			<Video muted src={`${inputProps.video}`} />
		</Loop>
	);
};
