import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ACCESS_ID, SECRET_KEY } from '$env/static/private';

const client = new S3Client({
	credentials: { accessKeyId: ACCESS_ID, secretAccessKey: SECRET_KEY },
	region: 'us-east-2'
});

export const POST: RequestHandler = async ({ request, locals }) => {
	const res = await request.formData();
	const filename = res.get('filename') as File;
	const type = res.get('type');

	if (!locals.user) {
		return error(404, { message: 'Not found' });
	}

	const userEmail = locals.user.email.split('@')[0];
	//inserts into the s3 bucket
	try {
		const command = new PutObjectCommand({
			Bucket: 'nikhil-pipeline-storage',
			Key: `${userEmail}/${filename}`,
			ContentType: type as string
		});
		const uploadUrl = await getSignedUrl(client, command, { expiresIn: 540 });
		return json({ uploadUrl });
	} catch (err) {
		console.log('error', err);
		error(404, { message: 'Not found' });
	}
};
