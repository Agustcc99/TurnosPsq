import "dotenv/config";
import bcrypt from "bcrypt";
import { connectDB } from "../config/db.js";
import { Usuario } from "../models/Usuario.js";

const run = async () => {
  await connectDB();

  const username = process.env.ADMIN_USER || "admin";
  const passwordPlano = process.env.ADMIN_PASS;
  const role = "admin";

  if (!passwordPlano) {
    console.error(
      "Falta la variable ADMIN_PASS en el .env. No se puede crear el admin."
    );
    process.exit(1);
  }

  let user = await Usuario.findOne({ username });

  if (user) {
    console.log(`Ya existe un usuario admin con username: ${username}`);
    process.exit(0);
  }

  const hash = await bcrypt.hash(passwordPlano, 10);

  user = await Usuario.create({
    username,
    password: hash,
    role
  });

  console.log("Usuario admin creado:");
  console.log(`  username: ${username}`);
  console.log("  (la contraseña viene de ADMIN_PASS en el .env)");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
