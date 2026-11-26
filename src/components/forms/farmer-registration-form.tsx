"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  farmerSchema,
  type FarmerInput,
  type FarmerValues,
  UNITS,
  LANGUAGES,
} from "@/lib/validation";
import { CATEGORIES } from "@/lib/commodities";
import { INDIAN_STATES } from "@/lib/geo";
import { FARMER_STATUS_PIPELINE } from "@/lib/status";
import {
  Field,
  Input,
  Select,
  SubmitButton,
  SuccessPanel,
  FormError,
} from "./fields";

export function FarmerRegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FarmerInput, unknown, FarmerValues>({
    resolver: zodResolver(farmerSchema),
    defaultValues: {
      unit: "quintal",
      preferredLanguage: "Gujarati",
      consent: false,
    },
  });
  const [result, setResult] = useState<{ registrationNo: string } | null>(null);
  const [serverError, setServerError] = useState<string>();

  async function onSubmit(values: FarmerValues) {
    setServerError(undefined);
    try {
      const res = await fetch("/api/farmer-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setResult({ registrationNo: data.registrationNo });
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError("Network error. Please check your connection and retry.");
    }
  }

  if (result) {
    return (
      <SuccessPanel title="Produce registered successfully" reference={result.registrationNo}>
        <p>
          Our field agent will contact you to schedule an inspection. Registration
          does not guarantee a purchase — you will see a clear, quality-based offer
          and can accept or reject it before any sale.
        </p>
        <p className="mt-3 text-xs text-ink/50">
          Status: <strong>{FARMER_STATUS_PIPELINE[0]}</strong>
        </p>
        <button
          onClick={() => setResult(null)}
          className="mt-5 text-sm font-semibold text-leaf hover:underline"
        >
          Register another crop
        </button>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormError message={serverError} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Farmer full name" required error={errors.fullName?.message}>
          <Input {...register("fullName")} placeholder="e.g. Ramesh Patel" />
        </Field>
        <Field
          label="Mobile number"
          required
          error={errors.mobile?.message}
          hint="OTP verification will be added in a later version."
        >
          <Input {...register("mobile")} inputMode="numeric" placeholder="10-digit number" />
        </Field>
        <Field label="State" required error={errors.state?.message}>
          <Select {...register("state")} defaultValue="">
            <option value="" disabled>
              Select state
            </option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="District" required error={errors.district?.message}>
          <Input {...register("district")} placeholder="e.g. Rajkot" />
        </Field>
        <Field label="Village" required error={errors.village?.message}>
          <Input {...register("village")} placeholder="Village name" />
        </Field>
        <Field label="Crop category" required error={errors.cropCategory?.message}>
          <Select {...register("cropCategory")} defaultValue="">
            <option value="" disabled>
              Select a category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Crop name" required error={errors.cropName?.message}>
          <Input {...register("cropName")} placeholder="e.g. Groundnut" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Expected quantity" required error={errors.expectedQuantity?.message}>
            <Input
              type="number"
              step="any"
              {...register("expectedQuantity")}
              placeholder="0"
            />
          </Field>
          <Field label="Unit" required error={errors.unit?.message}>
            <Select {...register("unit")}>
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field
          label="Expected harvest date"
          error={errors.harvestDate?.message}
          hint="Optional — where applicable."
        >
          <Input type="date" {...register("harvestDate")} />
        </Field>
        <Field
          label="Approximate crop location"
          required
          error={errors.approxLocation?.message}
        >
          <Input {...register("approxLocation")} placeholder="Nearest landmark / taluka" />
        </Field>
        <Field label="Preferred language" required error={errors.preferredLanguage?.message}>
          <Select {...register("preferredLanguage")}>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <label className="flex items-start gap-3 rounded-lg bg-cream p-4 text-sm text-ink/80">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-0.5 size-4 accent-brand"
        />
        <span>
          I consent to AgriTradeXchange collecting and using my personal and
          agricultural information to provide this service. My contact and farm
          details will not be made publicly searchable.
        </span>
      </label>
      {errors.consent && (
        <p className="-mt-3 text-xs text-red-600">{errors.consent.message}</p>
      )}

      <SubmitButton pending={isSubmitting}>Register my produce</SubmitButton>
    </form>
  );
}
