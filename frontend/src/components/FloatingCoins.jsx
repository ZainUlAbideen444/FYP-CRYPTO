import { motion } from "framer-motion";
import { FaBitcoin, FaEthereum } from "react-icons/fa6";
import { SiBinance, SiSolana } from "react-icons/si";

const coins = [
  {
    icon: <FaBitcoin />,
    color: "text-yellow-400",
    top: "15%",
    left: "8%",
    delay: 0,
  },
  {
    icon: <FaEthereum />,
    color: "text-blue-400",
    top: "70%",
    left: "12%",
    delay: 1,
  },
  {
    icon: <SiBinance />,
    color: "text-yellow-500",
    top: "25%",
    right: "10%",
    delay: 2,
  },
  {
    icon: <SiSolana />,
    color: "text-purple-400",
    top: "75%",
    right: "8%",
    delay: 3,
  },
];

export default function FloatingCoins() {
  return (
    <>
      {coins.map((coin, index) => (
        <motion.div
          key={index}
          animate={{
            y: [-15, 15, -15],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            delay: coin.delay,
          }}
          style={{
            position: "absolute",
            top: coin.top,
            left: coin.left,
            right: coin.right,
          }}
          className={`text-6xl opacity-20 ${coin.color}`}
        >
          {coin.icon}
        </motion.div>
      ))}
    </>
  );
}