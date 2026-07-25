import mongoose from "mongoose";
const tradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, coinId: { type: String, required: true },
  symbol: { type: String, required: true }, name: { type: String, required: true }, type: { type: String, enum: ["buy", "sell"], required: true },
  quantity: { type: Number, required: true, min: 0 }, price: { type: Number, required: true, min: 0 }, totalValue: { type: Number, required: true, min: 0 },
  realizedProfit: { type: Number, default: 0 }, status: { type: String, enum: ["completed"], default: "completed" },
}, { timestamps: true });
export default mongoose.model("Trade", tradeSchema);
