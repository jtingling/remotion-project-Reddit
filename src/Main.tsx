import {Sequence, useVideoConfig} from 'remotion';
import {AudioTrack} from './Audio';
import {VideoTrack} from './Video/';
import {AudioText} from './AudioText';

export const Main: React.FC<{
	titleText: string;
	titleColor: string;
	videoFrames: number;
}> = ({titleText, titleColor, videoFrames}) => {
	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
			<div>
				<Sequence from={0}>
					<AudioText titleText={titleText} />
				</Sequence>
				<Sequence from={0}>
					<AudioTrack titleText={titleText} titleColor={titleColor} />
				</Sequence>
				<Sequence from={0}>
					<VideoTrack videoFrames={videoFrames} />
				</Sequence>
			</div>
		</div>
	);
};
