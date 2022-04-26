import {textToSpeech} from './TextToSpeech';
import {ContentSegments, ContentSlice} from './types';
import {getAudioDuration, getVideoMetadata} from '@remotion/media-utils';

export const createSegment = async (
	segment: string,
	fps = 30
): Promise<ContentSlice> => {
	const audioUrl = await textToSpeech(segment, 'enUSWoman1');
	console.log(audioUrl);
	const audioDuration = Math.round((await getAudioDuration(audioUrl)) * fps);

	return {
		url: audioUrl,
		text: segment,
		duration: audioDuration,
	};
};

export const createIntro = async (segment: string): Promise<ContentSlice> => {
	return await createSegment(segment);
};

export const createBody = async (segment: string): Promise<ContentSlice[]> => {
	const content = segment.split(/[!.]/);
	const segments: ContentSlice[] = [];
	for (const i of content) {
		segments.push(await createSegment(i));
	}
	return segments;
};

export const calculateDuration = (content: ContentSegments): number => {
	let sum = 0;
	if (content.body !== undefined && content.intro !== undefined) {
		content.body.forEach((c) => (sum += c.duration));
		sum += content.intro.duration;
	}
	return sum;
};

export const calculateSegmentDuration = (
	content: ContentSegments
): ContentSegments => {
	if (content.body !== undefined && content.intro !== undefined) {
		let sum = content.intro.duration;
		content.body.forEach((c) => {
			c.from = sum;
			sum += c.duration;
			c.to = sum;
		});
	}
	return content;
};
