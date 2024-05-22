import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ACCESS_ID, SECRET_KEY } from '$env/static/private';

const client = new S3Client({
	// apiVersion: "2006-03-01",
	credentials: { accessKeyId: ACCESS_ID, secretAccessKey: SECRET_KEY },
	region: 'ap-south-1'
});

export const POST: RequestHandler = async ({ request }) => {
	const res = await request.formData();
	const filename = res.get('filename') as File;
	const type = res.get('type');
	const sessionId = res.get('sessionId');

	//inserts into the s3 bucket
	const command = new PutObjectCommand({
		Bucket: 'stream-bin',
		Key: `${sessionId}/${filename}`,
		ContentType: type as string
	});
	const uploadUrl = await getSignedUrl(client, command, { expiresIn: 540 });
	return json({ uploadUrl });
};
