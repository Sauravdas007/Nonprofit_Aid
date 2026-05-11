import { useState } from "react";
import { Heart } from "lucide-react";
import gsap from "gsap";

const amounts = ["$25", "$50", "$100", "$250", "$500"];

const impactMessages: Record<string, string> = {
  "$25": "Provides clean water for a family for one month.",
  "$50": "Supplies school materials for 10 girls for a semester.",
  "$100": "Trains one community health worker in essential care.",
  "$250": "Builds a water point serving an entire village.",
  "$500": "Funds a girl's complete scholarship for one year.",
  Custom: "Every dollar makes a difference.",
};

interface DonationAmountPickerProps {
  selectedAmount: string;
  customAmount: string;
  onAmountChange: (amount: string) => void;
  onCustomAmountChange: (amount: string) => void;
}

export default function DonationAmountPicker({
  selectedAmount,
  customAmount,
  onAmountChange,
  onCustomAmountChange,
}: DonationAmountPickerProps) {
  const [hoveredAmount, setHoveredAmount] = useState<string | null>(null);

  const handleAmountClick = (amount: string) => {
    onAmountChange(amount);
    
    // Animate the selection
    const element = document.querySelector(
      `[data-amount="${amount}"]`
    ) as HTMLElement;
    if (element) {
      gsap.fromTo(
        element,
        { scale: 0.95 },
        {
          scale: 1,
          duration: 0.3,
          ease: "back.out",
        }
      );
    }
  };

  const displayAmount =
    selectedAmount === "Custom" ? customAmount : selectedAmount;
  const impactMessage = impactMessages[selectedAmount] || "Every dollar matters.";

  return (
    <div className="space-y-8">
      {/* Impact Preview */}
      <div className="bg-gradient-to-br from-emerald/10 to-emerald/5 rounded-lg p-6 border border-emerald/20">
        <div className="flex items-start gap-3">
          <Heart size={20} className="text-emerald flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-serif-display text-2xl text-deep-indigo mb-1">
              {displayAmount || "$0"}
            </p>
            <p className="font-sans-body text-sm text-muted-dark leading-relaxed">
              {impactMessage}
            </p>
          </div>
        </div>
      </div>

      {/* Amount Buttons */}
      <div>
        <label className="font-sans-body text-xs font-semibold uppercase tracking-[0.08em] text-charcoal/60 block mb-4">
          Select Amount
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {amounts.map((amount) => (
            <button
              key={amount}
              data-amount={amount}
              onClick={() => handleAmountClick(amount)}
              onMouseEnter={() => setHoveredAmount(amount)}
              onMouseLeave={() => setHoveredAmount(null)}
              className={`relative px-4 py-3 rounded-lg font-sans-body font-semibold text-sm uppercase tracking-wider transition-all duration-200 group ${
                selectedAmount === amount
                  ? "bg-emerald text-charcoal shadow-lg shadow-emerald/30 scale-105"
                  : "bg-charcoal/5 text-charcoal border border-charcoal/10 hover:bg-charcoal/10 hover:border-charcoal/20"
              }`}
            >
              {amount}
              {hoveredAmount === amount && (
                <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Amount */}
      <div>
        <label className="font-sans-body text-xs font-semibold uppercase tracking-[0.08em] text-charcoal/60 block mb-3">
          Or Enter Custom Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 font-semibold">
            $
          </span>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => {
              onCustomAmountChange(e.target.value);
              if (selectedAmount !== "Custom") {
                onAmountChange("Custom");
              }
            }}
            placeholder="Enter amount"
            className="w-full pl-7 pr-4 py-3 rounded-lg border border-charcoal/10 bg-white focus:bg-white focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all outline-none font-sans-body text-charcoal"
          />
        </div>
      </div>

      {/* Frequency Toggle */}
      <div>
        <label className="font-sans-body text-xs font-semibold uppercase tracking-[0.08em] text-charcoal/60 block mb-3">
          Frequency
        </label>
        <div className="flex gap-3">
          {["one-time", "monthly"].map((freq) => (
            <button
              key={freq}
              className={`flex-1 px-4 py-3 rounded-lg font-sans-body font-semibold text-sm uppercase tracking-wider transition-all ${
                false // This would be connected to parent state
                  ? "bg-emerald text-charcoal"
                  : "bg-charcoal/5 text-charcoal border border-charcoal/10 hover:bg-charcoal/10"
              }`}
            >
              {freq === "one-time" ? "One-Time" : "Monthly Giving"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
