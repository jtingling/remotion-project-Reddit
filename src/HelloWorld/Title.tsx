import {useCallback, useEffect, useState} from 'react';

import {Audio, continueRender, delayRender} from 'remotion';
import {textToSpeech} from '../TextToSpeech/index';

export const Title: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const [handle] = useState(() => delayRender());
	const [audioUrl, setAudioUrl] = useState('');

	const fetchTts = useCallback(async () => {
		const fileName = await textToSpeech(titleText, 'enUSWoman1');

		setAudioUrl(fileName);
		continueRender(handle);
	}, [handle, titleText]);

	useEffect(() => {
		fetchTts();
	}, [fetchTts]);

	return <>{audioUrl ? <Audio src={audioUrl} /> : <></>}</>;
};
