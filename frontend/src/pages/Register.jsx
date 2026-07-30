import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleExclamation, FaSpider, FaBitcoin, FaEthereum } from "react-icons/fa6";
import { SiSolana } from "react-icons/si";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const result = await register(form);
    setSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div className="relative min-h-screen w-full bg-[#07090e] flex items-center justify-center px-4 py-12 overflow-hidden select-none">
      
      {/* Background Crypto Glows & Floating Icons */}
      <div className="absolute w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -bottom-20 -right-20" />

      <div className="absolute top-1/4 left-8 md:left-20 text-slate-800/40 text-7xl animate-pulse pointer-events-none">
        <FaBitcoin />
      </div>
      <div className="absolute bottom-1/4 right-8 md:right-20 text-slate-800/40 text-7xl animate-pulse pointer-events-none">
        <FaEthereum />
      </div>
      <div className="absolute top-1/3 right-1/4 text-slate-800/20 text-5xl pointer-events-none">
        <SiSolana />
      </div>

      {/* Main Form Container - Explicit min-height forces tall card */}
      <div className="relative w-full max-w-md min-h-[680px] my-auto rounded-3xl border border-slate-800/80 bg-[#0d121f]/95 px-8 py-12 shadow-2xl backdrop-blur-xl z-10 flex flex-col justify-between">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="group mb-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700/60 flex items-center justify-center text-amber-400 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <FaSpider className="text-2xl" />
            </div>
          </Link>

          <h1 className="text-white text-2xl sm:text-3xl font-bold font-mono tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-mono mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          
          {/* Full Name */}
          <div className="w-full max-w-xs flex flex-col gap-1.5 mb-4">
            <label className="text-[11px] font-mono font-medium text-slate-300 tracking-wide uppercase">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full h-10 bg-[#131a2b] border border-slate-800 rounded-xl px-4 text-slate-100 text-sm font-mono outline-none transition-all duration-300 hover:border-slate-700 focus:border-amber-400 focus:shadow-[0_0_15px_rgba(251,191,36,0.25)]"
            />
          </div>

          {/* Email Address */}
          <div className="w-full max-w-xs flex flex-col gap-1.5 mb-4">
            <label className="text-[11px] font-mono font-medium text-slate-300 tracking-wide uppercase">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full h-10 bg-[#131a2b] border border-slate-800 rounded-xl px-4 text-slate-100 text-sm font-mono outline-none transition-all duration-300 hover:border-slate-700 focus:border-amber-400 focus:shadow-[0_0_15px_rgba(251,191,36,0.25)]"
            />
          </div>

          {/* Password */}
          <div className="w-full max-w-xs flex flex-col gap-1.5 mb-4">
            <label className="text-[11px] font-mono font-medium text-slate-300 tracking-wide uppercase">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full h-10 bg-[#131a2b] border border-slate-800 rounded-xl px-4 text-slate-100 text-sm font-mono outline-none transition-all duration-300 hover:border-slate-700 focus:border-amber-400 focus:shadow-[0_0_15px_rgba(251,191,36,0.25)]"
            />
          </div>

          {/* Confirm Password */}
          <div className="w-full max-w-xs flex flex-col gap-1.5 mb-2">
            <label className="text-[11px] font-mono font-medium text-slate-300 tracking-wide uppercase">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm"
              required
              value={form.confirm}
              onChange={handleChange}
              className="w-full h-10 bg-[#131a2b] border border-slate-800 rounded-xl px-4 text-slate-100 text-sm font-mono outline-none transition-all duration-300 hover:border-slate-700 focus:border-amber-400 focus:shadow-[0_0_15px_rgba(251,191,36,0.25)]"
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="w-full max-w-xs mt-3 flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <FaCircleExclamation className="shrink-0 text-sm" />
              <span>{error}</span>
            </div>
          )}

          {/* Separate Button Wrapper with Large Top Margin (mt-10) and Half Width (w-1/2) */}
          <div className="w-full max-w-xs flex justify-center mt-10">
            <button
              type="submit"
              disabled={submitting}
              className="w-1/2 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-sm font-bold tracking-wider rounded-xl shadow-lg active:scale-[0.98] transition-all"
            >
              {submitting ? "Creating..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}