import { useState } from "react";
import { FaRotateLeft, FaShieldHalved, FaTriangleExclamation, FaVault } from "react-icons/fa6";
import PageHeader from "../components/UI/PageHeader";
import PrimaryButton from "../components/UI/PrimaryButton";
import { useTradeContext } from "../context/TradeContext";

export default function Settings() {
  const { resetAccount, wallet } = useTradeContext();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function reset() {
    if (
      !window.confirm(
        "Reset your $10,000 wallet, holdings, and all trade history? This cannot be undone."
      )
    )
      return;
    setBusy(true);
    const result = await resetAccount();
    setMessage(result.message);
    setBusy(false);
  }

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-16">
      {/* Page Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/80 pb-4 gap-4">
        <PageHeader
          title="Account Settings"
          subtitle="Configure system parameters and manage your virtual portfolio data."
        />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          TERMINAL CONFIGURATION
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Settings Panel */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Account Overview Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0E17]/95 p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <FaVault className="text-lg" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-base tracking-wide">
                    Virtual Margin Status
                  </h2>
                  <p className="text-slate-400 text-xs font-mono">
                    Simulation Account Identity
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md uppercase">
                ACTIVE TRADER
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#121827] rounded-xl border border-slate-800/80 p-4">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Current Liquidity
                </span>
                <span className="text-2xl font-mono font-bold text-slate-100">
                  ${Number(wallet).toLocaleString()}
                </span>
              </div>
              <div className="bg-[#121827] rounded-xl border border-slate-800/80 p-4">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Base Allocation
                </span>
                <span className="text-2xl font-mono font-bold text-slate-100">
                  $10,000.00
                </span>
              </div>
            </div>
          </div>

          {/* Danger Zone: Reset Simulation */}
          <section className="rounded-2xl border border-rose-500/30 bg-[#0B0E17]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Danger Zone Header Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-rose-500/20 mb-6">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                <FaTriangleExclamation className="text-sm" /> Danger Zone
              </div>
              <span className="text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded">
                IRREVERSIBLE
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="rounded-xl bg-rose-500/15 border border-rose-500/30 p-4 text-rose-400 shrink-0">
                <FaRotateLeft className="text-xl" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Reset Simulation Terminal
                </h2>
                <p className="text-sm leading-relaxed text-slate-400">
                  Wipe all executed trades, order logs, and portfolio positions. Your cash balance will be restored to{" "}
                  <strong className="text-slate-200 font-mono">$10,000.00 USD</strong> virtual liquidity.
                </p>

                <div className="pt-4">
                  <PrimaryButton
                    onClick={reset}
                    disabled={busy}
                    className="bg-rose-600 hover:bg-rose-500 active:scale-[0.98] transition-all font-mono text-sm tracking-wide py-3 px-6 shadow-lg shadow-rose-600/20 border border-rose-500/50"
                  >
                    {busy ? "Resetting Account..." : "Reset Portfolio & History"}
                  </PrimaryButton>
                </div>

                {message && (
                  <div className="mt-4 rounded-xl p-3 text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-in fade-in">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar Info Banner */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-800/80 bg-[#0B0E17]/95 p-6 shadow-2xl backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold border-b border-slate-800/80 pb-3">
              <FaShieldHalved className="text-sky-400" /> System Safety & Rules
            </div>
            
            <ul className="space-y-3 font-mono text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span>Resetting does not affect live crypto markets or real bank balances.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span>All paper trading stats are stored locally in your current session context.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span>Use resetting to test new trading strategies from a clean $10k start.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}