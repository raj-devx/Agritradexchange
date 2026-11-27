"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

type Role = "farmer" | "buyer";

export function OtpLoginForm({ role }: { role: Role }) {
  const router = useRouter();
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function handleSendOtp() {
    setError("");
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, role }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Could not send OTP.");
        return;
      }
      setStep("otp");
      setCooldown(60);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch {
      setError("Network error. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    setError("");
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Enter the full 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, role, code }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Verification failed.");
        return;
      }
      router.push(data.redirect);
    } catch {
      setError("Network error. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    for (let i = 0; i < 6; i++) next[i] = text[i] || "";
    setOtp(next);
    const focusIdx = Math.min(text.length, 5);
    inputRefs.current[focusIdx]?.focus();
  }

  const isFarmer = role === "farmer";
  const accent = isFarmer ? "leaf" : "brand";

  return (
    <div className="space-y-5">
      {step === "mobile" && (
        <>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-ink">
              Mobile number
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-black/15 bg-white px-3 shadow-sm focus-within:border-leaf focus-within:ring-2 focus-within:ring-leaf/25">
              <Phone className="size-4 text-ink/40" />
              <span className="text-sm text-ink/50">+91</span>
              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                className="w-full bg-transparent py-2.5 text-sm text-ink outline-none"
                placeholder="9876543210"
                autoFocus
              />
            </div>
          </div>
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className={`flex w-full items-center justify-center gap-2 rounded-lg bg-${accent} px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-60`}
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
            Send OTP
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <p className="text-center text-sm text-ink/70">
            OTP sent to <span className="font-semibold text-ink">+91 {mobile}</span>
          </p>
          <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                className="size-11 rounded-lg border border-black/15 bg-white text-center text-lg font-bold text-ink shadow-sm outline-none transition-all focus:border-leaf focus:ring-2 focus:ring-leaf/25"
              />
            ))}
          </div>
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className={`flex w-full items-center justify-center gap-2 rounded-lg bg-${accent} px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-60`}
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}
            Verify &amp; Login
          </button>
          <div className="flex items-center justify-between text-xs text-ink/50">
            <button
              onClick={() => { setStep("mobile"); setOtp(["","","","","",""]); setError(""); }}
              className="underline hover:text-ink"
            >
              Change number
            </button>
            <button
              onClick={handleSendOtp}
              disabled={cooldown > 0 || loading}
              className="underline hover:text-ink disabled:no-underline disabled:opacity-50"
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
            </button>
          </div>
        </>
      )}

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
