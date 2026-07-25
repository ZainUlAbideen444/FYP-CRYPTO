import { Link } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa";
import PrimaryButton from "../components/UI/PrimaryButton";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_45px_rgba(239,68,68,.45)] mb-8">
        <FaBitcoin className="text-white text-4xl" />
      </div>

      <h1 className="text-white text-7xl font-black">404</h1>
      <p className="text-gray-400 mt-4 text-lg max-w-md">
        This page doesn't exist — looks like it drifted off-chain.
      </p>

      <Link to="/">
        <PrimaryButton className="mt-8">Back to Home</PrimaryButton>
      </Link>
    </div>
  );
}
