import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBitcoin, FaUser, FaEnvelope, FaLock, FaExclamationCircle } from "react-icons/fa";
import Input from "../components/UI/Input";
import PrimaryButton from "../components/UI/PrimaryButton";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <Link to="/" className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_35px_rgba(239,68,68,.45)]">
              <FaBitcoin className="text-white text-2xl" />
            </div>
            <h1 className="text-white text-3xl font-black">Crypto Web</h1>
          </Link>
          <p className="text-gray-400 text-center">
            Create a free account and start trading with $10,000 in virtual funds.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] border border-[#232323] rounded-3xl p-8 space-y-6 shadow-xl"
        >
          <Input
            label="Full Name"
            name="name"
            required
            placeholder="Jane Doe"
            value={form.name}
            onChange={handleChange}
            icon={<FaUser />}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            icon={<FaEnvelope />}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            required
            placeholder="At least 6 characters"
            value={form.password}
            onChange={handleChange}
            icon={<FaLock />}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirm"
            required
            placeholder="Repeat password"
            value={form.confirm}
            onChange={handleChange}
            icon={<FaLock />}
          />

          {error && (
            <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium bg-red-600/10 text-red-400 border border-red-600/30">
              <FaExclamationCircle />
              {error}
            </div>
          )}

          <PrimaryButton type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Creating account..." : "Create Account"}
          </PrimaryButton>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:text-red-400 font-semibold">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
