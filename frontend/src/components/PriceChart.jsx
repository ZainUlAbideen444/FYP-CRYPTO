/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { formatCurrency } from "../utils/formatCurrency";

export default function PriceChart({ coinId, title = "Price chart" }) {
  const [points, setPoints] = useState([]); const [error, setError] = useState("");
  useEffect(() => { if (!coinId) return; setPoints([]); api.get(`/market/chart/${coinId}?days=1`).then(({ data }) => setPoints(data.prices)).catch(() => setError("Chart data is temporarily unavailable.")); }, [coinId]);
  const path = useMemo(() => { if (points.length < 2) return ""; const values = points.map((p) => p.price); const min = Math.min(...values); const max = Math.max(...values); const range = max - min || 1; return points.map((p, index) => `${index ? "L" : "M"}${(index / (points.length - 1)) * 600},${150 - ((p.price - min) / range) * 130}`).join(" "); }, [points]);
  const latest = points.at(-1)?.price;
  return <section className="rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="font-bold text-white">{title}</h2><p className="mt-1 text-sm text-gray-500">24-hour price movement</p></div>{latest && <span className="text-lg font-bold text-white">{formatCurrency(latest)}</span>}</div>{error ? <p className="py-12 text-center text-sm text-gray-500">{error}</p> : !path ? <div className="h-40 animate-pulse rounded-2xl bg-white/5" /> : <svg viewBox="0 0 600 160" className="h-44 w-full" preserveAspectRatio="none" aria-label="24 hour price chart"><defs><linearGradient id="priceGradient" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#ef4444" stopOpacity=".35"/><stop offset="1" stopColor="#ef4444" stopOpacity="0"/></linearGradient></defs><path d={`${path} L600,160 L0,160 Z`} fill="url(#priceGradient)"/><path d={path} fill="none" stroke="#f05252" strokeWidth="3" vectorEffect="non-scaling-stroke"/></svg>}</section>;
}
