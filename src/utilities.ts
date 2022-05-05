import {textToSpeech} from './TextToSpeech';
import {ContentSegments, ContentSlice} from './types';
import {getAudioDuration} from '@remotion/media-utils';
import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import md5 from 'md5';

export const createSegment = async (
	segment: string,
	fps = 30
): Promise<ContentSlice> => {
	const cleanedText = scrubText(segment);
	const audioUrl = await textToSpeech(cleanedText, 'enUSWoman1');
	const audioDuration = Math.round((await getAudioDuration(audioUrl)) * fps);

	return {
		url: audioUrl,
		text: cleanedText,
		duration: audioDuration,
		snooURL: '',
		name: '',
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

export const createBodyFromComments = async (
	comments: any,
	users: any
): Promise<ContentSlice[]> => {
	const segments: ContentSlice[] = [];
	for (let i = 0; i < comments.length; i++) {
		if (comments[i].data.body) {
			segments.push(await createSegment(comments[i].data.body));
			segments[i].snooURL = users[i].data.snoovatar_img;
			segments[i].name = users[i].data.name;
		}
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

export const scrubText = (text: string): string => {
	return text.replaceAll('\n', '').trim();
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
