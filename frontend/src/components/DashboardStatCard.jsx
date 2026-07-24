import { motion } from "framer-motion";

export default function DashboardStatCard({
  title,
  value,
  change,
  icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-[#111111] border border-[#232323] rounded-3xl p-7 shadow-lg"
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <h2 className="text-white text-3xl font-bold mt-3">
            {value}
          </h2>

          <p
            className={`mt-4 text-sm font-semibold ${
              change.startsWith("+")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {change}
          </p>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${color}`}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
}