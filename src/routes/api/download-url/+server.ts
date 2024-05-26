import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ACCESS_ID, SECRET_KEY } from '$env/static/private';
import { db } from '$lib/server/drizzle/turso-db';
import { userResumeTable } from '$lib/server/drizzle/turso-schema';
import { generateIdFromEntropySize } from 'lucia';

const client = new S3Client({
	region: 'ap-south-1',
	// region: 'us-east-2',
	credentials: { accessKeyId: ACCESS_ID, secretAccessKey: SECRET_KEY }
});

interface RequestFileProp {
	s3Url: string;
	sessionId: string;
	filename: string;
	expiresIn: number;
}

export const POST: RequestHandler = async ({ request, locals }) => {
	const { expiresIn, filename } = (await request.json()) as RequestFileProp;
	console.log('body', expiresIn, filename);

	if (!locals.user) {
		return error(404, { message: 'Not found' });
	}

	const userEmail = locals.user.email.split('@')[0];
	const userid = locals.user.id;
	const command = new GetObjectCommand({
		// Bucket: 'nikhil-pipeline-storage',
		Bucket: 'stream-bin',
		Key: `${userEmail}/${filename}`,
		ResponseContentDisposition: `attachment; filename="${filename}"`
	});
	const downloadUrl = await getSignedUrl(client, command, {
		expiresIn: Number(expiresIn) * 60
	});
	// console.log('res', downloadUrl);

	if (downloadUrl) {
		const id = generateIdFromEntropySize(6);
		try {
			await db.insert(userResumeTable).values({
				id,
				email: locals.user.email,
				fileLocation: `${userEmail}/${filename}`,
				pdfUrl: downloadUrl,
				userId: userid
			});

			//TODO will make calls to ai service from here? send url to ai service?
			return json('success');
		} catch (error) {
			return json(error);
		}
	}
	error(404, { message: 'Not found' });
	// console.log('down load url', DownloadUrl);
	// return json(downloadUrl);
};
