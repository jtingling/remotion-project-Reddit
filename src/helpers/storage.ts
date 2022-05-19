import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import md5 from 'md5';

export const uploadVideo = async (
	video: ArrayBuffer,
	name: string
): Promise<string> => {
	const fileName = `${md5(name)}.mp4`;

	await uploadToS3(video, fileName);
	return createS3Url(fileName);
};

const uploadToS3 = async (data: ArrayBuffer, fileName: string) => {
	const bucketName = process.env.REMOTION_AWS_S3_BUCKET_NAME;
	const awsRegion = process.env.REMOTION_AWS_S3_REGION;
	const s3 = new S3Client({
		region: awsRegion,
		credentials: {
			accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY || '',
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
	const bucketName = process.env.REMOTION_AWS_S3_BUCKET_NAME;
	const awsRegion = process.env.REMOTION_AWS_S3_REGION;
	const client = new S3Client({
		region: awsRegion,
		credentials: {
			accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY || '',
		},
	});
	const command = new GetObjectCommand({Bucket: bucketName, Key: filename});
	const url = await getSignedUrl(client, command, {expiresIn: 3600});
	return url;
};
