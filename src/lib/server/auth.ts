import { Lucia } from 'lucia';
import { adapter } from './drizzle/turso-db';
import { dev } from '$app/environment';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			google_id: attributes.google_id,
			email: attributes.email,
			name: attributes.name,
			picture: attributes?.picture || ''
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	google_id: number;
	email: string;
	name: string;
	picture?: string;
}
