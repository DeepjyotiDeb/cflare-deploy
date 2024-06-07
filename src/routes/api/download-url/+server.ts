import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ACCESS_ID, SECRET_KEY } from '$env/static/private';
import { db } from '$lib/server/drizzle/turso-db';
import { userResumeTable } from '$lib/server/drizzle/turso-schema';
import { generateIdFromEntropySize } from 'lucia';

const client = new S3Client({
	region: 'us-east-2',
	credentials: { accessKeyId: ACCESS_ID, secretAccessKey: SECRET_KEY }
});

const lambdaUrl = 'https://6dekrm05x2.execute-api.us-east-2.amazonaws.com/user_request';

interface RequestFileProp {
	s3Url: string;
	sessionId: string;
	filename: string;
	expiresIn: number;
	inputText: string;
}

interface IResponse {
	statusCode: number;
	body: string;
}

export const POST: RequestHandler = async ({ request, locals }) => {
	const { expiresIn, filename, inputText } = (await request.json()) as RequestFileProp;

	if (!locals.user) {
		return error(404, { message: 'Not found' });
	}

	const userEmail = locals.user.email.split('@')[0];
	const userid = locals.user.id;
	const command = new GetObjectCommand({
		Bucket: 'nikhil-pipeline-storage',
		Key: `${userEmail}/${filename}`,
		ResponseContentDisposition: `attachment; filename="${filename}"`
	});
	const downloadUrl = await getSignedUrl(client, command, {
		expiresIn: Number(expiresIn) * 60
	});

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

			console.log('res', inputText, 'key', `${userEmail}/${filename}`);

			const res = await fetch(lambdaUrl, {
				method: 'POST',
				body: JSON.stringify({
					additional_text: inputText,
					pdf_file_location: `s3://nikhil-pipeline-storage/${userEmail}/${filename}`
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			// console.log('response', await res.json());
			const fullResponse = (await res.json()) as IResponse;
			if ('body' in fullResponse) {
				const body = JSON.parse(fullResponse.body);
				return json(body);
			} else return json({ error: 'error reading pdf' });
		} catch (error) {
			return json(error);
		}
	}
	error(404, { message: 'Not found' });
};
