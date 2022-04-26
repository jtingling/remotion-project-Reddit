import {useCallback, useEffect, useState} from 'react';
import {Audio, continueRender, delayRender} from 'remotion';
import {textToSpeech} from '../TextToSpeech/index';

export const AudioTrack: React.FC<{
	audio: string;
}> = ({audio}) => {
	return <>{audio ? <Audio src={audio} /> : <></>}</>;
};
