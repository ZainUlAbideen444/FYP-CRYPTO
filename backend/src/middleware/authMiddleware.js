import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, _res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) throw Object.assign(new Error("Authentication required."), { statusCode: 401 });
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId).select("-password");
    if (!user) throw Object.assign(new Error("Session is no longer valid."), { statusCode: 401 });
    req.user = user;
    next();
  } catch (error) {
    error.statusCode ||= 401;
    next(error);
  }
}
