import {textToSpeech} from './TextToSpeech';
import {ContentSlice, iComments, iSegmentList, iUsers} from './types';
import {getAudioDuration} from '@remotion/media-utils';

export const createSegment = async (
	segment: string,
	snooURL: string,
	name: string,
	fps = 30
): Promise<ContentSlice> => {
	const cleanedText = scrubText(segment);
	const audioUrl = await textToSpeech(cleanedText, 'enUSWoman1');
	const audioDuration = Math.round((await getAudioDuration(audioUrl)) * fps);

	return {
		url: audioUrl,
		text: cleanedText,
		duration: audioDuration,
		snooURL:
			snooURL ||
			'https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png',
		name,
	};
};

export const createSegmentFromTitle = async (
	segment: {title: string; author: string},
	// eslint-disable-next-line camelcase
	snoovatar: {snoovatar_img: string}
): Promise<ContentSlice> => {
	return createSegment(
		segment.title,
		snoovatar.snoovatar_img,
		segment.author
	);
};

export const createSegmentsFromSelfText = async (
	segment: {selftext: string; author: string},
	// eslint-disable-next-line camelcase
	snoovatar: {snoovatar_img: string}
): Promise<ContentSlice[]> => {
	const segments = [];
	const content = segment.selftext.split(/[!.]/);
	const result: Promise<ContentSlice>[] = content.map((sentence: string) => {
		return createSegment(sentence, snoovatar.snoovatar_img, segment.author);
	});
	segments.push(...result);
	const segmentLists = await Promise.all(segments);
	return segmentLists;
};

export const createSegmentsFromComments = async (
	comments: iComments,
	users: iUsers
): Promise<ContentSlice[]> => {
	const segments = [];
	for (let i = 0; i < comments.length; i++) {
		if (comments[i].kind === 't1' && comments[i].data.body.length > 440) {
			const filteredWords = comments[i].data.body
				.split(/[!.]/)
				.filter((word: string) => word.length > 0);
			const result: Promise<ContentSlice>[] = filteredWords.map(
				(word: string) => {
					return createSegment(
						word,
						users[i].data.snoovatar_img,
						users[i].data.name
					);
				}
			);
			segments.push(...result);
		} else if (comments[i].kind === 't1') {
			const result: Promise<ContentSlice> = createSegment(
				comments[i].data.body,
				users[i].data.snoovatar_img,
				users[i].data.name
			);
			segments.push(result);
		}
	}
	const segmentLists = await Promise.all(segments);
	return segmentLists;
};

export const calculateDuration = (
	content: iSegmentList,
	desiredLengthInSeconds: number,
	fps: number
): number => {
	let sum = 0;
	const totalFrames = desiredLengthInSeconds * fps;
	if (content) {
		content.segmentsList.forEach((segment) => {
			const checkDuration = segment.duration + sum;
			if (checkDuration < totalFrames) {
				sum += segment.duration;
				content.numberOfSegments++;
			} else {
				return sum;
			}
		});
	}
	return sum;
};

export const calculateSegmentTimeLine = (
	content: iSegmentList
): iSegmentList => {
	if (content.segmentsList) {
		let sum = 0;
		content.segmentsList.forEach((segment) => {
			segment.from = sum;
			sum += segment.duration;
			segment.to = sum;
		});
	}
	return content;
};

export const scrubText = (text: string): string => {
	return text && text.replaceAll('\n', '').trim();
};
