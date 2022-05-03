import {
	continueRender,
	delayRender,
	Video,
	Loop,
	getInputProps,
} from 'remotion';
import {useCallback, useState, useEffect} from 'react';
import {getVideoMetadata} from '@remotion/media-utils';

const inputProps = getInputProps();

export const VideoTrack: React.FC<{
	videoFrames: number;
}> = ({videoFrames}) => {
	const [videoData, setVideoData] = useState({height: 0, width: 0});
	const [handle] = useState(() => delayRender());

	const videoMetaData = useCallback(async () => {
		const data = await getVideoMetadata(inputProps.video);
		setVideoData(data);
		continueRender(handle);
	}, [handle]);

	useEffect(() => {
		videoMetaData();
	}, [videoMetaData]);
	return (
		<Loop durationInFrames={videoFrames}>
			<Video muted src={`${inputProps.video}`} />
		</Loop>
	);
};
