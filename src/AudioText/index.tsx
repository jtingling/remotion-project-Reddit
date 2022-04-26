import {useEffect, useCallback, useState, useMemo} from 'react';
import {useDebounce, useDebouncedCallback} from 'use-debounce';
import {
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	getInputProps,
} from 'remotion';
import {useAudioData, visualizeAudio, AudioData} from '@remotion/media-utils';
import {Container, Paper, Typography} from '@mui/material';
import {wordPacing} from './helpers';
import {Comments} from './Comments';

const title = getInputProps();

export const AudioText: React.FC<{
	titleText: string;
}> = ({titleText}) => {
	return (
		<>
			<Comments titleText={word} />
		</>
	);
};
