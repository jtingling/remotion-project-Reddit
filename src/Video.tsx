import {useState, useEffect, useCallback} from 'react';
import {getAudioDuration, getVideoMetadata} from '@remotion/media-utils';
import {
	Composition,
	continueRender,
	delayRender,
	getInputProps,
} from 'remotion';
import {textToSpeech} from './TextToSpeech';
import {Main} from './Main';
import sampleVideo from '../raw-videos/production ID_4010184.mp4';

const inputProps = getInputProps();

export const RemotionVideo: React.FC = () => {
	const [handle] = useState(() => delayRender());
	const [frameDuration, setFrameDuration] = useState<number>(300);
	const [videoFrames, setVideoFrames] = useState<number>(300);

	const getDuration = useCallback(async () => {
		const url = await textToSpeech(
			inputProps.title + ' ' + inputProps.titleText,
			'enUSWoman2'
		);
		const imported = await getAudioDuration(url);
		const {durationInSeconds} = await getVideoMetadata(sampleVideo);
		const duration = Math.round(imported) * 30;
		const videoDuration = Math.round(durationInSeconds) * 30;
		setFrameDuration(duration);
		setVideoFrames(videoDuration);
		continueRender(handle);
	}, [handle]);

	useEffect(() => {
		getDuration();
	}, [getDuration]);

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
				durationInFrames={frameDuration}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: '',
					titleColor: 'black',
					videoFrames,
				}}
			/>
		</>
	);
};
