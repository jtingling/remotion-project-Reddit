import {Sequence} from 'remotion';
import {ContentSegments} from './types';
import {AudioTrack} from './Audio';
import {VideoTrack} from './Video/';
import {Comments} from './AudioText/Comments';

export const Main: React.FC<{
	titleText: string;
	title: string;
	videoFrames: number;
	content: ContentSegments;
}> = ({videoFrames, content}) => {
	console.log(content);
	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
			<div>
				<Sequence from={0} durationInFrames={content.intro?.duration}>
					<AudioTrack audio={content.intro?.url as string} />
					<Comments titleText={content.intro?.text as string} />
				</Sequence>
				{content.body &&
					content.body.map((c) => {
						return (
							<Sequence
								from={(c.from as number) - 2}
								durationInFrames={(c.duration as number) + 1}
							>
								<AudioTrack audio={c.url} />
								<Comments titleText={c.text as string} />
							</Sequence>
						);
					})}
				<Sequence from={0}>
					<VideoTrack videoFrames={videoFrames} />
				</Sequence>
			</div>
		</div>
	);
};
