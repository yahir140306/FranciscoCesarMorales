import type { APIContext } from "astro";
import { generateId } from "lucia";
// import { Argon2id } from "argon2";
import { db, User } from "astro:db";
import { lucia } from "@/auth";

export async function POST(context: APIContext): Promise<Response> {
  // Parse the form data
  const formData = await context.request.formData(); // ?
  const username = formData.get("name");
  const usernametwo = formData.get("nameTwo");
  const apellidoP = formData.get("apellidoPA");
  const apellidoM = formData.get("apellidoMA");
  const nombreTutor = formData.get("nameTutor");
  const apellidoTutorP = formData.get("apellidoTutorMT");
  const apellidoTutorM = formData.get("apellidoTutorPT");
  const curp = formData.get("curp");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("ConfirmPassword");

  // validate the form data
  if (!username || !password) {
    return new Response("Username and Password are required", { status: 400 });
  }

  // if (!username || !email || !password || !passwordConfirm || !curp) {
  //   return new Response("Missing form data", { status: 400 });
  // }

  if (typeof username !== "string" || username.length < 4) {
    return new Response("Username must be at least 4 characters long", {
      status: 400,
    });
  }

  if (typeof password !== "string" || password.length < 6) {
    return new Response("Password must be at least 6 characters long", {
      status: 400,
    });
  }

  // insert user into the database
  const userId = generateId(15);
  // const hashedPassword = await new Argon2id().hash(password);

  await db.insert(User).values([
    {
      id: userId,
      username,
      segundoNombre: String(usernametwo),
      ApellidoPaterno: String(apellidoP),
      ApellidoMaterno: String(apellidoM),
      nameTutor: String(nombreTutor),
      apellidoTutorP: String(apellidoTutorP),
      apellidoTutorM: String(apellidoTutorM),
      curp: String(curp),
      email: String(email),
      password: String(password),
      passwordConfirm: String(passwordConfirm),
    },
  ]);

  // Generate session
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return context.redirect("/user");
}
