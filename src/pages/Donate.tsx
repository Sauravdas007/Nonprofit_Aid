import { useState, useMemo } from "react";
import { Shield, FileCheck, Heart, Check } from "lucide-react";
import PageHeader from "../components/PageHeader";

const amounts = ["$25", "$50", "$100", "$250", "$500", "Custom"];

const impactMessages: Record<string, string> = {
  "$25": "Provides clean water for a family for one month.",
  "$50": "Supplies school materials for 10 girls for a semester.",
  "$100": "Trains one community health worker in essential care.",
  "$250": "Builds a water point serving an entire village.",
  "$500": "Funds a girl's complete scholarship for one year.",
  Custom: "Every dollar makes a difference.",
};

const allocations = [
  "Where It's Needed Most",
  "Clean Water Initiative",
  "Girls' Education Fund",
  "Community Health Workers",
  "Emergency Relief Fund",
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "Kenya",
  "Brazil",
  "Other",
];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState("$100");
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">(
    "one-time"
  );
  const [allocation, setAllocation] = useState("Where It's Needed Most");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "United States",
  });
  const [dedicate, setDedicate] = useState(false);
  const [dedicationName, setDedicationName] = useState("");
  const [dedicationType, setDedicationType] = useState<"honor" | "memory">(
    "honor"
  );
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activeAmount = selectedAmount === "Custom" ? customAmount : selectedAmount;

  const impactMessage = useMemo(() => {
    return impactMessages[selectedAmount] || impactMessages["Custom"];
  }, [selectedAmount]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!activeAmount || (selectedAmount === "Custom" && !customAmount)) {
      newErrors.amount = "Please select or enter an amount";
    }
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <PageHeader
          title="Thank You!"
          subtitle="Your generosity is creating real change in communities worldwide."
        />
        <section className="bg-off-white py-24 md:py-[120px]">
          <div className="section-container max-w-[600px] mx-auto text-center">
            <div className="w-20 h-20 mx-auto bg-emerald/15 rounded-full flex items-center justify-center mb-8">
              <Check size={40} className="text-emerald" />
            </div>
            <h2
              className="font-serif-display text-deep-indigo"
              style={{ fontSize: "clamp(28px, 3vw, 48px)" }}
            >
              Donation Confirmed
            </h2>
            <p className="mt-4 text-lg text-muted-dark leading-relaxed">
              Thank you for your {activeAmount} {frequency} donation
              {allocation !== "Where It's Needed Most"
                ? ` to the ${allocation}`
                : ""}
              . A receipt has been sent to {formData.email}.
            </p>
            <p className="mt-6 text-base text-muted-dark">
              Your support helps us continue our mission across 47 countries.
              Together, we're building a more equitable world.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Make a Donation"
        subtitle="Your generosity creates immediate, measurable impact in communities worldwide."
      />

      <section className="bg-off-white py-24 md:py-[120px]">
        <div className="section-container max-w-[1080px]">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left - Form */}
            <div className="lg:w-[55%]">
              <div className="bg-white rounded-lg p-8 md:p-12 border border-charcoal/[0.06]">
                {/* Step 1: Amount */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-4">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {amounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => {
                          setSelectedAmount(amt);
                          if (errors.amount) {
                            setErrors((p) => {
                              const n = { ...p };
                              delete n.amount;
                              return n;
                            });
                          }
                        }}
                        className={`py-4 px-4 rounded-lg border text-center font-sans-body text-base font-medium transition-all duration-200 ${
                          selectedAmount === amt
                            ? "bg-emerald text-charcoal border-transparent"
                            : "bg-transparent text-charcoal border-charcoal/12 hover:border-emerald"
                        }`}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                  {selectedAmount === "Custom" && (
                    <div className="mt-3">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50">
                          $
                        </span>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-4 py-4 border border-charcoal/20 rounded-lg font-sans-body text-base focus:border-emerald focus:outline-none focus:shadow-[0_0_0_3px_rgba(46,204,113,0.1)] transition-all"
                        />
                      </div>
                    </div>
                  )}
                  {errors.amount && (
                    <p className="mt-2 text-sm text-red-500">{errors.amount}</p>
                  )}

                  {/* Frequency Toggle */}
                  <div className="mt-6 flex items-center bg-charcoal/[0.06] rounded-full p-1 w-fit">
                    <button
                      onClick={() => setFrequency("one-time")}
                      className={`px-6 py-2.5 rounded-full font-sans-body text-[13px] font-semibold uppercase tracking-[0.04em] transition-all ${
                        frequency === "one-time"
                          ? "bg-white text-charcoal shadow-sm"
                          : "bg-transparent text-muted-dark"
                      }`}
                    >
                      One-time
                    </button>
                    <button
                      onClick={() => setFrequency("monthly")}
                      className={`px-6 py-2.5 rounded-full font-sans-body text-[13px] font-semibold uppercase tracking-[0.04em] transition-all ${
                        frequency === "monthly"
                          ? "bg-white text-charcoal shadow-sm"
                          : "bg-transparent text-muted-dark"
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Step 2: Allocation */}
                <div className="mt-10">
                  <label className="block text-sm font-semibold text-charcoal mb-4">
                    Where It's Needed Most
                  </label>
                  <div className="space-y-3">
                    {allocations.map((alloc) => (
                      <button
                        key={alloc}
                        onClick={() => setAllocation(alloc)}
                        className={`w-full flex items-center gap-4 p-4 border rounded-lg transition-all ${
                          allocation === alloc
                            ? "border-emerald bg-emerald/[0.03]"
                            : "border-charcoal/12 hover:border-charcoal/25"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                            allocation === alloc
                              ? "border-emerald"
                              : "border-charcoal/20"
                          }`}
                        >
                          {allocation === alloc && (
                            <div className="w-2 h-2 rounded-full bg-emerald" />
                          )}
                        </div>
                        <span className="text-sm text-charcoal">{alloc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Information */}
                <div className="mt-10">
                  <label className="block text-sm font-semibold text-charcoal mb-4">
                    Your Information
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className={`w-full px-4 py-3.5 border rounded-lg font-sans-body text-base focus:border-emerald focus:outline-none focus:shadow-[0_0_0_3px_rgba(46,204,113,0.1)] transition-all ${
                          errors.firstName
                            ? "border-red-400"
                            : "border-charcoal/20"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className={`w-full px-4 py-3.5 border rounded-lg font-sans-body text-base focus:border-emerald focus:outline-none focus:shadow-[0_0_0_3px_rgba(46,204,113,0.1)] transition-all ${
                          errors.lastName
                            ? "border-red-400"
                            : "border-charcoal/20"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full px-4 py-3.5 border rounded-lg font-sans-body text-base focus:border-emerald focus:outline-none focus:shadow-[0_0_0_3px_rgba(46,204,113,0.1)] transition-all ${
                        errors.email ? "border-red-400" : "border-charcoal/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-4 py-3.5 border border-charcoal/20 rounded-lg font-sans-body text-base focus:border-emerald focus:outline-none focus:shadow-[0_0_0_3px_rgba(46,204,113,0.1)] transition-all"
                    />
                    <select
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className="w-full px-4 py-3.5 border border-charcoal/20 rounded-lg font-sans-body text-base focus:border-emerald focus:outline-none focus:shadow-[0_0_0_3px_rgba(46,204,113,0.1)] transition-all bg-white"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dedication */}
                <div className="mt-6">
                  <button
                    onClick={() => setDedicate(!dedicate)}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        dedicate
                          ? "bg-emerald border-emerald"
                          : "border-charcoal/20"
                      }`}
                    >
                      {dedicate && <Check size={14} className="text-white" />}
                    </div>
                    <span className="text-sm text-charcoal">
                      Dedicate this donation
                    </span>
                  </button>
                  {dedicate && (
                    <div className="mt-4 pl-8 space-y-4">
                      <input
                        type="text"
                        placeholder="Dedication Name"
                        value={dedicationName}
                        onChange={(e) => setDedicationName(e.target.value)}
                        className="w-full px-4 py-3.5 border border-charcoal/20 rounded-lg font-sans-body text-base focus:border-emerald focus:outline-none focus:shadow-[0_0_0_3px_rgba(46,204,113,0.1)] transition-all"
                      />
                      <div className="flex gap-4">
                        <button
                          onClick={() => setDedicationType("honor")}
                          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            dedicationType === "honor"
                              ? "bg-emerald text-charcoal"
                              : "bg-charcoal/[0.06] text-muted-dark"
                          }`}
                        >
                          In Honor Of
                        </button>
                        <button
                          onClick={() => setDedicationType("memory")}
                          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            dedicationType === "memory"
                              ? "bg-emerald text-charcoal"
                              : "bg-charcoal/[0.06] text-muted-dark"
                          }`}
                        >
                          In Memory Of
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="mt-10 w-full bg-emerald text-charcoal font-sans-body text-base font-semibold uppercase tracking-[0.04em] py-4.5 rounded-lg hover:bg-emerald-dark hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(46,204,113,0.3)] transition-all duration-250"
                >
                  Complete Donation
                </button>
              </div>
            </div>

            {/* Right - Impact Context */}
            <div className="lg:w-[45%]">
              <div className="lg:sticky lg:top-[120px]">
                <div className="bg-white rounded-lg p-10 border border-charcoal/[0.06]">
                  <h3 className="font-serif-display text-2xl text-deep-indigo">
                    Your Impact
                  </h3>
                  <div className="mt-6 border-l-[3px] border-emerald pl-4">
                    <p className="text-base text-muted-dark leading-relaxed">
                      {impactMessage}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-sm font-semibold text-charcoal">
                      Security & Transparency
                    </h4>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <Shield size={20} className="text-emerald flex-shrink-0" />
                        <span className="text-[13px] text-muted-dark">
                          256-bit SSL Encrypted
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileCheck
                          size={20}
                          className="text-emerald flex-shrink-0"
                        />
                        <span className="text-[13px] text-muted-dark">
                          Tax-deductible donation receipt
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Heart size={20} className="text-emerald flex-shrink-0" />
                        <span className="text-[13px] text-muted-dark">
                          100% of your gift funds programs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
