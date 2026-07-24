import { motion } from "framer-motion";

export default function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-[#111111] border border-gray-800 rounded-3xl p-8 hover:border-red-600 transition-all shadow-xl"
    >
      <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center text-white text-3xl mb-6">
        {icon}
      </div>

      <h2 className="text-white text-2xl font-bold mb-4">
        {title}
      </h2>

      <p className="text-gray-400 leading-7">
        {description}
      </p>
    </motion.div>
  );
}