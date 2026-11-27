"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  buyerSchema,
  type BuyerInput,
  COMPANY_TYPES,
} from "@/lib/validation";
import { CATEGORIES } from "@/lib/commodities";
import {
  Field,
  Input,
  Select,
  SubmitButton,
  SuccessPanel,
  FormError,
} from "./fields";

export function BuyerRegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BuyerInput>({
    resolver: zodResolver(buyerSchema),
    defaultValues: { procurementCategories: [] },
  });
  const [result, setResult] = useState<{ buyerNo: string } | null>(null);
  const [serverError, setServerError] = useState<string>();

  async function onSubmit(values: BuyerInput) {
    setServerError(undefined);
    try {
      const res = await fetch("/api/buyer-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setResult({ buyerNo: data.buyerNo });
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError("Network error. Please check your connection and retry.");
    }
  }

  if (result) {
    return (
      <SuccessPanel
        title="Buyer account submitted"
        reference={result.buyerNo}
        referenceLabel="Buyer ID"
        shareText="I just registered as a buyer on AgriTradeXchange — direct access to quality-inspected agricultural produce from verified farmers. Check it out: https://agritradexchange.com/register/buyer"
      >
        <p>
          Our procurement team will review and verify your account. Once verified,
          you can post buying requirements and receive matched, quality-checked
          supply.
        </p>
        <button
          onClick={() => setResult(null)}
          className="mt-5 text-sm font-semibold text-leaf hover:underline"
        >
          Register another company
        </button>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormError message={serverError} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company name" required error={errors.companyName?.message}>
          <Input {...register("companyName")} placeholder="Registered business name" />
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
        <Field label="Company type" required error={errors.companyType?.message}>
          <Select {...register("companyType")} defaultValue="">
            <option value="" disabled>
              Select type
            </option>
            {COMPANY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label="GSTIN"
          error={errors.gstin?.message}
          hint="Where applicable."
        >
          <Input {...register("gstin")} placeholder="Business identification" />
        </Field>
        <Field
          label="Website"
          error={errors.website?.message}
          hint="Optional."
        >
          <Input {...register("website")} placeholder="https://" />
        </Field>
        <Field
          label="Registered address"
          required
          error={errors.address?.message}
          className="sm:col-span-2"
        >
          <Input {...register("address")} placeholder="Street, city, state, PIN" />
        </Field>
      </div>

      <Field
        label="Main procurement categories"
        required
        error={errors.procurementCategories?.message as string | undefined}
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <label
              key={c.key}
              className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                value={c.key}
                {...register("procurementCategories")}
                className="size-4 accent-brand"
              />
              {c.label}
            </label>
          ))}
        </div>
      </Field>

      <SubmitButton pending={isSubmitting}>Create buyer account</SubmitButton>
    </form>
  );
}
