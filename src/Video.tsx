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
	calculateDuration,
	calculateSegmentDuration,
} from './utilities';
import {ContentSegments} from './types';

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
		data.intro = await createIntro(inputProps.post.title);
		data.body = await createBody(inputProps.post.selftext);
		const duration = await getVideoMetadata(inputProps.video);
		const videoFrames = Math.round(duration.durationInSeconds) * 30;
		setVideoFrames(videoFrames);
		setTotalFrames(calculateDuration(data as ContentSegments));
		setContent(calculateSegmentDuration(data as ContentSegments));
		continueRender(handle);
	}, [handle]);

	useEffect(() => {
		initVideoData();
	}, [initVideoData]);

	if (!process.env.AZURE_TTS_KEY) {
		throw new Error(
			'AZURE_TTS_KEY environment variable is missing. Read the docs first and complete the setup.'
		);
	}
	if (!process.env.AZURE_TTS_REGION) {
		throw new Error(
			'AZURE_TTS_REGION environment variable is missing. Read the docs first and complete the setup.'
		);
	}
	if (!process.env.AWS_S3_BUCKET_NAME) {
		throw new Error(
			'AWS_S3_BUCKET_NAME environment variable is missing. Read the docs first and complete the setup.'
		);
	}
	if (!process.env.AWS_S3_REGION) {
		throw new Error(
			'AWS_S3_REGION environment variable is missing. Read the docs first and complete the setup.'
		);
	}
	if (!process.env.AWS_ACCESS_KEY_ID) {
		throw new Error(
			'AWS_ACCESS_KEY_ID environment variable is missing. Read the docs first and complete the setup.'
		);
	}
	if (!process.env.AWS_SECRET_ACCESS_KEY) {
		throw new Error(
			'AWS_SECRET_ACCESS_KEY environment variable is missing. Read the docs first and complete the setup.'
		);
	}
	return (
		<>
			<Composition
				id="Main"
				component={Main}
				durationInFrames={totalFrames}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					videoFrames,
					content,
				}}
			/>
		</>
	);
};
