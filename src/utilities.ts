import {textToSpeech} from './TextToSpeech';
import {ContentSegments, ContentSlice} from './types';
import {getAudioDuration} from '@remotion/media-utils';
import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import md5 from 'md5';

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
		snooURL,
		name,
	};
};

export const createIntro = async (
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

export const createBody = async (
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

export const createBodyFromComments = async (
	comments: any,
	users: any
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
	content: ContentSegments,
	desiredLengthInSeconds: number,
	fps: number
): number => {
	let sum = 0;
	const totalFrames = desiredLengthInSeconds * fps;
	if (content.body && content.intro) {
		try {
			if (content.intro.duration > totalFrames) {
				throw new Error(
					'Intro duration is longer than video duration, aborting...'
				);
			}
			sum += content.intro.duration;
			content.body.forEach((c) => {
				const checkDuration = c.duration + sum;
				if (checkDuration < totalFrames) {
					sum += c.duration;
				} else {
					return sum;
				}
			});
		} catch (e) {
			console.error(e);
		}
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

export const scrubText = (text: string): string => {
	return text && text.replaceAll('\n', '').trim();
};

export const uploadVideo = async (
	video: ArrayBuffer,
	name: string
): Promise<string> => {
	const fileName = `${md5(name)}.mp4`;

	await uploadToS3(video, fileName);
	return createS3Url(fileName);
};

const uploadToS3 = async (data: ArrayBuffer, fileName: string) => {
	const bucketName = process.env.AWS_S3_BUCKET_NAME;
	const awsRegion = process.env.AWS_S3_REGION;
	const s3 = new S3Client({
		region: awsRegion,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
		},
	});

	return s3.send(
		new PutObjectCommand({
			Bucket: bucketName,
			Key: fileName,
			Body: new Uint8Array(data),
		})
	);
};

const createS3Url = async (filename: string) => {
	const bucketName = process.env.AWS_S3_BUCKET_NAME;
	const awsRegion = process.env.AWS_S3_REGION;
	const client = new S3Client({
		region: awsRegion,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
		},
	});
	const command = new GetObjectCommand({Bucket: bucketName, Key: filename});
	const url = await getSignedUrl(client, command, {expiresIn: 3600});
	return url;
};
