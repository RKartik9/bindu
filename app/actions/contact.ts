"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; message: string };
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email.";
  if (message.length < 10) errors.message = "A few more words, please.";

  if (Object.keys(errors).length) {
    return { status: "error", errors, values: { name, email, message } };
  }

  // Swap for an email provider (e.g. Resend) or CRM webhook when going live.
  console.log("[contact]", { name, email, message });

  return { status: "success", message: `Thanks ${name.split(" ")[0]}, we'll be in touch within two working days.` };
}
