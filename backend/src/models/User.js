import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8, select: false },
  walletBalance: { type: Number, default: 10000, min: 0 },
}, { timestamps: true });
userSchema.pre("save", async function hashPassword() { if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 12); });
userSchema.methods.matchesPassword = function matchesPassword(candidate) { return bcrypt.compare(candidate, this.password); };
export default mongoose.model("User", userSchema);
