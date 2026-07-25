import mongoose from "mongoose";
const holdingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  coinId: { type: String, required: true }, symbol: { type: String, required: true, uppercase: true }, name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 }, averageBuyPrice: { type: Number, required: true, min: 0 }, investedAmount: { type: Number, required: true, min: 0 },
}, { timestamps: true });
holdingSchema.index({ userId: 1, coinId: 1 }, { unique: true });
export default mongoose.model("Holding", holdingSchema);
