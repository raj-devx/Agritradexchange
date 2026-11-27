"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  requirementSchema,
  type RequirementInput,
  type RequirementValues,
  UNITS,
  PACKAGING,
} from "@/lib/validation";
import { CATEGORIES } from "@/lib/commodities";
import {
  Field,
  Input,
  Select,
  Textarea,
  SubmitButton,
  SuccessPanel,
  FormError,
} from "./fields";

export function BuyerRequirementForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequirementInput, unknown, RequirementValues>({
    resolver: zodResolver(requirementSchema),
    defaultValues: { unit: "tonne", packaging: "Bags", sampleRequired: false },
  });
  const [result, setResult] = useState<{ requirementNo: string } | null>(null);
  const [serverError, setServerError] = useState<string>();

  async function onSubmit(values: RequirementValues) {
    setServerError(undefined);
    try {
      const res = await fetch("/api/buyer-requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setResult({ requirementNo: data.requirementNo });
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError("Network error. Please check your connection and retry.");
    }
  }

  if (result) {
    return (
      <SuccessPanel
        title="Requirement submitted"
        reference={result.requirementNo}
        shareText="Looking for quality agricultural commodities? AgriTradeXchange connects buyers with verified farmer supply — post your requirement for free: https://agritradexchange.com/buyers/post-requirement"
      >
        <p>
          Our procurement team will validate your requirement and begin matching
          verified farmer supply. You will receive quotations and sample options
          before any order is confirmed.
        </p>
        <button
          onClick={() => setResult(null)}
          className="mt-5 text-sm font-semibold text-leaf hover:underline"
        >
          Post another requirement
        </button>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormError message={serverError} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company name" required error={errors.companyName?.message}>
          <Input {...register("companyName")} placeholder="Business name" />
        </Field>
        <Field label="Contact person" required error={errors.contactPerson?.message}>
          <Input {...register("contactPerson")} placeholder="Full name" />
        </Field>
        <Field label="Mobile number" required error={errors.mobile?.message}>
          <Input {...register("mobile")} inputMode="numeric" placeholder="10-digit number" />
        </Field>
        <Field label="Email" required error={errors.email?.message}>
          <Input type="email" {...register("email")} placeholder="name@company.com" />
        </Field>

        <Field label="Commodity" required error={errors.commodity?.message}>
          <Select {...register("commodity")} defaultValue="">
            <option value="" disabled>
              Select a commodity
            </option>
            {CATEGORIES.map((c) => (
              <optgroup key={c.key} label={c.label}>
                {c.crops.map((crop) => (
                  <option key={crop.en} value={crop.en}>
                    {crop.en}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Required quantity" required error={errors.requiredQuantity?.message}>
            <Input type="number" step="any" {...register("requiredQuantity")} placeholder="0" />
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

        <Field label="Quality / grade" required error={errors.grade?.message}>
          <Input {...register("grade")} placeholder="e.g. Bold 40/50, Grade A" />
        </Field>
        <Field label="Moisture specification" error={errors.moistureSpec?.message} hint="Optional.">
          <Input {...register("moistureSpec")} placeholder="e.g. max 8%" />
        </Field>

        <Field label="Delivery location" required error={errors.deliveryLocation?.message}>
          <Input {...register("deliveryLocation")} placeholder="City / plant location" />
        </Field>
        <Field label="Delivery deadline" error={errors.deliveryDeadline?.message} hint="Optional.">
          <Input type="date" {...register("deliveryDeadline")} />
        </Field>

        <Field label="Packaging" required error={errors.packaging?.message}>
          <Select {...register("packaging")}>
            {PACKAGING.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Target price" error={errors.targetPrice?.message} hint="Optional, per unit.">
          <Input {...register("targetPrice")} placeholder="e.g. ₹6,200 / quintal" />
        </Field>
      </div>

      <label className="flex items-center gap-3 rounded-lg bg-cream p-4 text-sm text-ink/80">
        <input type="checkbox" {...register("sampleRequired")} className="size-4 accent-brand" />
        I would like a sample before confirming an order.
      </label>

      <Field label="Additional specifications" error={errors.additionalSpecs?.message}>
        <Textarea
          {...register("additionalSpecs")}
          placeholder="Any other quality parameters, certifications, or delivery notes."
        />
      </Field>

      <SubmitButton pending={isSubmitting}>Submit requirement</SubmitButton>
    </form>
  );
}
