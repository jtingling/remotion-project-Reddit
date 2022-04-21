import {Video, Loop} from 'remotion';
import sampleVideo from '../../raw-videos/production ID_4010184.mp4';

export const VideoTrack: React.FC<{
	videoFrames: number;
}> = ({videoFrames}) => {
	return (
		<Loop durationInFrames={videoFrames}>
			<Video muted src={sampleVideo} />
		</Loop>
	);
};
