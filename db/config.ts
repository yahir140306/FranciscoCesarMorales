import { defineDb, defineTable, column } from "astro:db";

// https://astro.build/db/config

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ unique: true, optional: false }),
    segundoNombre: column.text({ unique: true, optional: false }),
    ApellidoPaterno: column.text({ unique: true, optional: false }),
    ApellidoMaterno: column.text({ unique: true, optional: false }),
    nameTutor: column.text({ optional: true }),
    apellidoTutorP: column.text({ optional: true }),
    apellidoTutorM: column.text({ optional: true }),
    curp: column.text({ unique: true, optional: false }),
    email: column.text({ unique: true, optional: false }),
    password: column.text({ optional: true }),
    passwordConfirm: column.text({ optional: true }),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    expiresAt: column.number({ optional: false }),
    createdAt: column.date({ optional: false }),
    
  },
});


export default defineDb({
  tables: {
    User,
    Session,
  },
});
