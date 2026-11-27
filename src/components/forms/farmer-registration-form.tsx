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
import { useLang } from "@/components/language-provider";
import { FARMER_T } from "@/lib/i18n";
import {
  Field,
  Input,
  Select,
  SubmitButton,
  SuccessPanel,
  FormError,
} from "./fields";

export function FarmerRegistrationForm() {
  const { lang } = useLang();
  const t = FARMER_T[lang];

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
  const [result, setResult] = useState<{ registrationNo: string } | null>(
    null,
  );
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
        setServerError(data.error ?? t.f_errGeneric);
        return;
      }
      setResult({ registrationNo: data.registrationNo });
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError(t.f_errNetwork);
    }
  }

  if (result) {
    const shareMsg = `I just registered my produce on AgriTradeXchange — free registration, quality inspection, and direct buyer access! No mandi fees. Register yours too: https://agritradexchange.com/register/farmer`;
    return (
      <SuccessPanel
        title={t.f_successTitle}
        reference={result.registrationNo}
        shareText={shareMsg}
      >
        <p>{t.f_successBody}</p>
        <p className="mt-3 text-xs text-ink/50">
          {t.f_statusLabel}: <strong>{t.pipeline[0]}</strong>
        </p>
        <button
          onClick={() => setResult(null)}
          className="mt-5 text-sm font-semibold text-leaf hover:underline"
        >
          {t.f_registerAnother}
        </button>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormError message={serverError} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.f_fullName} required error={errors.fullName?.message}>
          <Input {...register("fullName")} placeholder={t.f_fullNamePh} />
        </Field>
        <Field
          label={t.f_mobile}
          required
          error={errors.mobile?.message}
          hint={t.f_mobileHint}
        >
          <Input
            {...register("mobile")}
            inputMode="numeric"
            placeholder={t.f_mobilePh}
          />
        </Field>
        <Field label={t.f_state} required error={errors.state?.message}>
          <Select {...register("state")} defaultValue="">
            <option value="" disabled>
              {t.f_stateSelect}
            </option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={t.f_district} required error={errors.district?.message}>
          <Input {...register("district")} placeholder={t.f_districtPh} />
        </Field>
        <Field label={t.f_village} required error={errors.village?.message}>
          <Input {...register("village")} placeholder={t.f_villagePh} />
        </Field>
        <Field
          label={t.f_category}
          required
          error={errors.cropCategory?.message}
        >
          <Select {...register("cropCategory")} defaultValue="">
            <option value="" disabled>
              {t.f_categorySelect}
            </option>
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={t.f_crop} required error={errors.cropName?.message}>
          <Input {...register("cropName")} placeholder={t.f_cropPh} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label={t.f_qty}
            required
            error={errors.expectedQuantity?.message}
          >
            <Input
              type="number"
              step="any"
              {...register("expectedQuantity")}
              placeholder="0"
            />
          </Field>
          <Field label={t.f_unit} required error={errors.unit?.message}>
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
          label={t.f_harvest}
          error={errors.harvestDate?.message}
          hint={t.f_harvestHint}
        >
          <Input type="date" {...register("harvestDate")} />
        </Field>
        <Field
          label={t.f_location}
          required
          error={errors.approxLocation?.message}
        >
          <Input
            {...register("approxLocation")}
            placeholder={t.f_locationPh}
          />
        </Field>
        <Field
          label={t.f_lang}
          required
          error={errors.preferredLanguage?.message}
        >
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
        <span>{t.f_consent}</span>
      </label>
      {errors.consent && (
        <p className="-mt-3 text-xs text-red-600">{errors.consent.message}</p>
      )}

      <SubmitButton pending={isSubmitting}>{t.f_submit}</SubmitButton>
    </form>
  );
}
