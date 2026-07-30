import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleExclamation, FaSpider } from "react-icons/fa6";
import Button from "../components/Button";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await login(form);

    setSubmitting(false);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen w-full bg-[#07090e] flex items-center justify-center px-4 select-none">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Centered Card Container (Tall, Spacious Height) */}
      <div className="relative w-full max-w-md my-20 bg-[#0d121f] rounded-3xl border border-slate-800 px-8 py-16 sm:py-20 shadow-2xl backdrop-blur-xl z-10 flex flex-col justify-center">
        
        {/* Header Icon & Title */}
        <div className="flex flex-col items-center text-center mb-10">
          <Link to="/" className="group mb-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700/60 flex items-center justify-center text-amber-400 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <FaSpider className="text-3xl" />
            </div>
          </Link>

          <h1 className="text-white text-2xl sm:text-3xl font-bold font-mono tracking-tight">
            Welcome Back
          </h1>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          
          {/* Email Input */}
          <div className="w-full max-w-xs mb-6 flex flex-col gap-2">
            <label className="text-xs font-mono font-medium text-slate-300 tracking-wide uppercase">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div className="w-full max-w-xs mb-6 flex flex-col gap-2">
            <label className="text-xs font-mono font-medium text-slate-300 tracking-wide uppercase">
              Password
            </label>
            <Input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="w-full max-w-xs mb-6 flex items-center gap-2 rounded-xl p-3 text-xs font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <FaCircleExclamation className="shrink-0 text-sm" />
              <span>{error}</span>
            </div>
          )}

          {/* Half-width Centered Button with Distinct Gap */}
          <div className="w-full max-w-xs flex justify-center pt-6 mt-2 mb-8">
            <Button
              type="submit"
              disabled={submitting}
              className="w-1/2 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md"
            >
              {submitting ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        {/* Action Links Footer */}
        <div className="w-full max-w-xs mx-auto pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <Link
            to="/forgot-password"
            className="text-xs font-mono text-slate-400 hover:text-amber-400 transition-colors"
          >
            Forgot Password?
          </Link>
          <Link
            to="/register"
            className="text-xs font-mono text-amber-400 hover:text-amber-300 font-bold transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}