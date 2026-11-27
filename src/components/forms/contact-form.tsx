"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validation";
import {
  Field,
  Input,
  Select,
  Textarea,
  SubmitButton,
  SuccessPanel,
  FormError,
} from "./fields";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string>();

  async function onSubmit(values: ContactInput) {
    setServerError(undefined);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
      reset();
    } catch {
      setServerError("Network error. Please check your connection and retry.");
    }
  }

  if (done) {
    return (
      <SuccessPanel title="Message sent">
        <p>Thank you for reaching out. Our team will get back to you shortly.</p>
        <button
          onClick={() => setDone(false)}
          className="link-underline mt-6 pb-0.5 text-sm font-semibold text-leaf"
        >
          Send another message
        </button>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormError message={serverError} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" required error={errors.name?.message}>
          <Input {...register("name")} placeholder="Full name" />
        </Field>
        <Field label="Email" required error={errors.email?.message}>
          <Input type="email" {...register("email")} placeholder="name@email.com" />
        </Field>
        <Field label="Phone" error={errors.phone?.message} hint="Optional.">
          <Input {...register("phone")} placeholder="Mobile number" />
        </Field>
        <Field label="I am a" error={errors.audience?.message}>
          <Select {...register("audience")} defaultValue="">
            <option value="">Select</option>
            <option value="Farmer">Farmer</option>
            <option value="Buyer">Buyer</option>
            <option value="Other">Other</option>
          </Select>
        </Field>
      </div>
      <Field label="Message" required error={errors.message?.message}>
        <Textarea {...register("message")} placeholder="How can we help?" />
      </Field>
      <SubmitButton pending={isSubmitting}>Send message</SubmitButton>
    </form>
  );
}
