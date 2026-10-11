"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import { RollText } from "@/components/RollText";
import { site } from "@/content/site";
import { useFocusTrap, useHash, useLockScroll } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

function close() {
  window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

function Field({
  name,
  label,
  error,
  defaultValue,
  multiline,
  type = "text",
}: {
  name: string;
  label: string;
  error?: string;
  defaultValue?: string;
  multiline?: boolean;
  type?: string;
}) {
  const cls =
    "w-full resize-none border-b border-ink/20 bg-transparent py-2 text-base outline-none transition-colors placeholder:text-dim focus:border-ink";
  const props = { name, placeholder: label, className: cls, defaultValue, "aria-invalid": !!error };
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      {multiline ? <textarea rows={4} {...props} /> : <input type={type} {...props} />}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { status: "idle" });

  if (state.status === "success") {
    return <p className="text-lg leading-snug">{state.message}</p>;
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name" error={state.errors?.name} defaultValue={state.values?.name} />
        <Field
          name="email"
          label="Email"
          type="email"
          error={state.errors?.email}
          defaultValue={state.values?.email}
        />
      </div>
      <Field
        name="message"
        label="Message"
        multiline
        error={state.errors?.message}
        defaultValue={state.values?.message}
      />
      <button
        type="submit"
        disabled={pending}
        className="group/roll label rounded-full bg-ink px-6 py-3 text-paper transition-opacity disabled:opacity-50"
      >
        <RollText>{pending ? "Sending" : "Send"}</RollText>
      </button>
    </form>
  );
}

export function ContactOverlay() {
  const open = useHash() === "#contact";
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useLockScroll(open);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Contact"
          data-lenis-prevent
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(100% 0 0% 0)" }}
          transition={{ duration: 0.8, ease }}
          className="fixed inset-0 z-50 overflow-y-auto bg-paper"
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-6">
            <span className="font-display text-[19px] font-medium tracking-tight">{site.name}</span>
            <button ref={closeRef} type="button" onClick={close} className="group/roll label">
              <RollText>Close</RollText>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease }}
            className="grid gap-14 px-5 pt-10 pb-16 md:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-16"
          >
            <div className="space-y-5 lg:col-span-6">
              {site.bio.map((p, i) => (
                <p
                  key={i}
                  className={i === 0 ? "font-display text-2xl leading-tight tracking-tight md:text-[2.1rem]" : "max-w-xl text-[15px] leading-relaxed text-ink/80"}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
              {site.addresses.map((a) => (
                <div key={a.label}>
                  <h3 className="label mb-3 text-dim">{a.label}</h3>
                  <address className="text-[15px] leading-relaxed not-italic">
                    {a.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </div>
              ))}

              <div>
                <h3 className="label mb-3 text-dim">General</h3>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="group/roll block text-[15px]">
                  <RollText>{site.phone}</RollText>
                </a>
                <a href={`mailto:${site.email}`} className="group/roll block text-[15px]">
                  <RollText>{site.email}</RollText>
                </a>
              </div>

              {site.contacts.map((c) => (
                <div key={c.label}>
                  <h3 className="label mb-3 text-dim">{c.label}</h3>
                  <p className="text-[15px]">{c.name}</p>
                  <a href={`mailto:${c.email}`} className="group/roll block text-[15px]">
                    <RollText>{c.email}</RollText>
                  </a>
                </div>
              ))}

              <div className="sm:col-span-2">
                <h3 className="label mb-3 text-dim">Social</h3>
                <div className="flex gap-6">
                  {site.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group/roll text-[15px]">
                      <RollText>{s.label}</RollText>
                    </a>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <h3 className="label mb-4 text-dim">Send a message</h3>
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
