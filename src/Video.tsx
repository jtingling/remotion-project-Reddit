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
	createIntro,
	createBody,
	createBodyFromComments,
	calculateDuration,
	calculateSegmentDuration,
} from './utilities';
import {ContentSegments} from './types';
import {checkForEnvVars} from './checkForEnvVars';

const inputProps = getInputProps();
const defaultContentValue = {
	intro: undefined,
	body: undefined,
};
export const RemotionVideo: React.FC = () => {
	const [handle] = useState(() => delayRender());
	const [videoFrames, setVideoFrames] = useState<number>(1);
	const [totalFrames, setTotalFrames] = useState<number>(1);
	const [content, setContent] =
		useState<ContentSegments>(defaultContentValue);

	const initVideoData = useCallback(async () => {
		const data = {intro: {}, body: [{}]};
		data.intro = await createIntro(inputProps.post, inputProps.user.data);
		const body = await createBody(inputProps.post, inputProps.user.data);
		data.body = body.concat(
			await createBodyFromComments(
				inputProps.comments.postComments,
				inputProps.comments.users
			)
		);
		const duration = await getVideoMetadata(inputProps.video);
		const videoFrames = Math.round(duration.durationInSeconds) * 30;
		setVideoFrames(videoFrames);
		setTotalFrames(
			calculateDuration(
				data as ContentSegments,
				inputProps.metaData.duration,
				30
			)
		);
		setContent(calculateSegmentDuration(data as ContentSegments));
		console.log(content);
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
