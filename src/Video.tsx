import {useState, useEffect, useCallback} from 'react';
import {getVideoMetadata} from '@remotion/media-utils';
import {
	Composition,
	continueRender,
	delayRender,
	getInputProps,
} from 'remotion';
import {Main} from './Main';
import {
	createSegmentFromTitle,
	createSegmentsFromSelfText,
	createSegmentsFromComments,
	calculateDuration,
	calculateSegmentTimeLine,
} from './utilities';
import {iSegmentList} from './types';
import {checkForEnvVars} from './checkForEnvVars';

const {
	user: {data},
	post,
	comments: {postComments, users},
	metaData: {duration},
	video,
} = getInputProps();

const defaultContentValue = {segmentsList: [], numberOfSegments: 0};

export const RemotionVideo: React.FC = () => {
	const [handle] = useState(() => delayRender());
	const [videoFrames, setVideoFrames] = useState<number>(1);
	const [totalFrames, setTotalFrames] = useState<number>(1);
	const [content, setContent] = useState<iSegmentList>(
		defaultContentValue as iSegmentList
	);

	const initVideoData = useCallback(async () => {
		const clips: iSegmentList = {segmentsList: [], numberOfSegments: 0};
		const output = [await createSegmentFromTitle(post, data)];
		output.push(...(await createSegmentsFromSelfText(post, data)));
		output.push(...(await createSegmentsFromComments(postComments, users)));
		clips.segmentsList.push(...output);
		const videoMetaData = await getVideoMetadata(video);
		const videoFrames = Math.round(videoMetaData.durationInSeconds) * 30;
		setVideoFrames(videoFrames);
		setTotalFrames(calculateDuration(clips, duration, 30));
		setContent(calculateSegmentTimeLine(clips));
		continueRender(handle);
	}, [handle]);

	useEffect(() => {
		initVideoData();
	}, [initVideoData]);

	checkForEnvVars(process.env);

	return (
		<>
			<Composition
				id="Main"
				component={Main}
				durationInFrames={totalFrames}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					videoFrames,
					content,
				}}
			/>
		</>
	);
};
