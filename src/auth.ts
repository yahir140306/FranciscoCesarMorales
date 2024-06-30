// src/auth.ts
import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db, Session, User } from "astro:db";
const adapter = new DrizzleSQLiteAdapter(db as any , Session, User); // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD
		}
	},
	getUserAttributes: (attributes) => {
		return {
		  // attributes has the type of DatabaseUserAttributes
		  username: attributes.username,
		  segundoNombre: attributes.segundoNombre,
		  ApellidoPaterno: attributes.ApellidoPaterno,
		  ApellidoMaterno: attributes.ApellidoMaterno,
		  nameTutor: attributes.nameTutor,
		  apellidoTutorP: attributes.apellidoTutorP,
		  apellidoTutorM: attributes.apellidoTutorM,
		  curp: attributes.curp,
		  email: attributes.email
		};
	  },
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
	segundoNombre: string;
	ApellidoPaterno: string;
	ApellidoMaterno: string;
	nameTutor: string;
	apellidoTutorP: string;
	apellidoTutorM: string;
	curp: string;
	email: string;
  }
  