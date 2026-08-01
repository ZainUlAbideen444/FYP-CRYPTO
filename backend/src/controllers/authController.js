import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { httpError } from "../utils/httpError.js";

function sessionCookie(res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
  const isProduction = process.env.NODE_ENV === "production";
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction || process.env.COOKIE_SECURE === "true",
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    walletBalance: user.walletBalance,
    createdAt: user.createdAt,
  };
}

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || "") || typeof password !== "string" || password.length < 8)
    throw httpError(400, "Provide a name, valid email, and password of at least 8 characters.");
  if (await User.exists({ email: email.toLowerCase() }))
    throw httpError(409, "An account already exists with this email.");
  const user = await User.create({ name, email, password });
  sessionCookie(res, user._id);
  res.status(201).json({ success: true, user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email).toLowerCase() }).select("+password");
  if (!user || !(await user.matchesPassword(password || "")))
    throw httpError(401, "Invalid email or password.");
  sessionCookie(res, user._id);
  res.json({ success: true, user: publicUser(user) });
}

export function logout(_req, res) {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction || process.env.COOKIE_SECURE === "true",
    sameSite: isProduction ? "none" : "lax",
  });
  res.status(204).end();
}

export function me(req, res) {
  res.json({ success: true, user: publicUser(req.user) });
}