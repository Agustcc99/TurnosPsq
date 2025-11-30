import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

/**
 * POST /api/auth/login
 * Body: { username, password }
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Usuario y contraseña son obligatorios" });
    }

    const user = await Usuario.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 8 * 60 * 60 * 1000
    });

    return res.json({
      message: "Login correcto",
      user: { username: user.username, role: user.role }
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error interno en login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logout correcto" });
};

export const getMe = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }
  return res.json({ user: req.user });
};
