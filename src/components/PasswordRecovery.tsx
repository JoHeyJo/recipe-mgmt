import React, { useEffect, useMemo, useState } from "react";
import API from "../api";
import { errorHandling } from "../utils/ErrorHandling";
import { useSearchParams } from "react-router-dom";

/**
 * PasswordRecovery
 * A self-contained, accessible password recovery component with two flows:
 * 1) Request reset link via email
 * 2) Submit token + new password
 *
 * Styling: Uses lightweight utility classes (Tailwind-friendly) but works without Tailwind.
 * Validation: Client-side checks for email format, password length, and confirmation match.
 *
 * RoutesList -> PasswordRecovery
 */

export type PasswordRecoveryStep = "request" | "reset";

export interface PasswordRecoveryProps {
  /** Minimum password length (default: 8) */
  minLength?: number;
  /** Whether to require confirm password matching (default: true) */
  requireConfirm?: boolean;
  /** Start on a particular step (default: "request") */
  initialStep?: PasswordRecoveryStep;
  /** Optionally prefill the email */
  initialEmail?: string;
  /** Optionally prefill token (e.g., from a magic link) */
  initialToken?: string;
  /** If true, automatically read ?token= from searchParams */
  allowTokenFromQuery?: boolean;
  /** Optional heading overrides */
  titles?: Partial<Record<PasswordRecoveryStep, string>>;
}

export default function PasswordRecovery({
  minLength = 8,
  requireConfirm = true,
  initialStep = "request",
  initialEmail = "",
  initialToken = "",
  allowTokenFromQuery = true,
  titles,
}: PasswordRecoveryProps) {
  const [step, setStep] = useState<PasswordRecoveryStep>(initialStep);
  const [email, setEmail] = useState(initialEmail);
  const [user, setUser] = useState("");
  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "loading" }
    | { state: "success"; message: string }
    | { state: "error"; message: string }
  >({ state: "idle" });
  const [searchParams, setSearchParams] = useSearchParams();

  // Autofill token from query string (?token=...) if allowed
  useEffect(() => {
    if (!allowTokenFromQuery || typeof window === "undefined") return;
    const URLToken = searchParams.get("token");
    searchParams.delete("token");
    setSearchParams(searchParams, { replace: true });
    if (URLToken && !token) {
      setToken(URLToken);
      setStep("reset");
    }
  }, [allowTokenFromQuery, token, searchParams, setSearchParams]);

  /** Validate email return error if invalid */
  const emailHasError = useMemo(() => {
    if (!email) return "";
    const requiredChars = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return requiredChars.test(email) ? "" : "Please enter a valid email.";
  }, [email]);

  /** Validates length of password */
  const passwordLengthHasError = useMemo(() => {
    if (!password) return "";
    if (password.length < minLength)
      return `Password must be at least ${minLength} characters.`;
    return "";
  }, [password, minLength]);

  /** Validates password comparison */
  const comparePasswordHasError = useMemo(() => {
    if (!requireConfirm) return "";
    if (!confirm) return "";
    return confirm !== password ? "Passwords do not match." : "";
  }, [confirm, password, requireConfirm]);

  /** Validates form */
  const formHasErrors = useMemo(() => {
    if (step === "request") return !!emailHasError || !email;
    // step === "reset"
    const tokenError = token ? "" : "Token is required.";
    return (
      !!tokenError ||
      !!passwordLengthHasError ||
      (!!comparePasswordHasError && requireConfirm)
    );
  }, [
    step,
    email,
    emailHasError,
    token,
    passwordLengthHasError,
    comparePasswordHasError,
    requireConfirm,
  ]);

  async function handleRequestSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status.state === "loading") return;
    setStatus({ state: "loading" });
    try {
      await API.postResetRequest(email.trim());
      setStatus({
        state: "success",
        message:
          "If an account exists for that email, we've sent a reset link.",
      });
    } catch (error: any) {
      errorHandling("PasswordRecovery -> handleRequestSubmit", error);
      setStatus({
        state: "error",
        message: error?.message || "Could not send reset link. Please try again.",
      });
    }
  }

  async function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status.state === "loading") return;
    setStatus({ state: "loading" });
    try {
      await API.postPasswordReset(
        password,
        user.trim() || undefined,
        token
      );
      setStatus({
        state: "success",
        message: "Password updated successfully. You can now sign in.",
      });
      // Optional: clear password fields
      setPassword("");
      setConfirm("");
    } catch (error: any) {
      errorHandling("PasswordRecovery -> handleResetSubmit", error)
      setStatus({
        state: "error",
        message: error.response.data.error,
      });
    }
  }

  const heading =
    step === "request"
      ? (titles?.request ?? "Forgot your password?")
      : (titles?.reset ?? "Set a new password");

  return (
    <div
      id="PasswordRecovery-container"
      className={`mx-auto w-full max-w-md rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900`}
    >
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {heading}
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {step === "request"
            ? "Enter your email and we'll send a reset link if your account exists."
            : "Paste the token from your email and choose a new password."}
        </p>
      </div>

      {/* Status banner */}
      {status.state !== "idle" && (
        <div
          role="status"
          className={
            `mb-4 rounded-lg border p-3 text-sm ` +
            (status.state === "loading"
              ? "border-neutral-300 bg-neutral-50 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              : status.state === "success"
                ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200"
                : "border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-200")
          }
        >
          {status.state === "loading" && "Working…"}
          {status.state === "success" && status.message}
          {status.state === "error" && status.message}
        </div>
      )}

      {/* Forms */}
      {step === "request" ? (
        <form onSubmit={handleRequestSubmit} noValidate>
          <Field
            label="Email"
            htmlFor="pr-email"
            error={emailHasError}
            required
          >
            <input
              id="pr-email"
              type="email"
              autoComplete="email"
              className={inputClass(emailHasError)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!emailHasError}
              aria-describedby={emailHasError ? "pr-email-error" : undefined}
              placeholder="you@example.com"
              required
            />
          </Field>

          <button
            type="submit"
            className={primaryButtonClass}
            disabled={formHasErrors || status.state === "loading"}
          >
            Send reset link
          </button>

          {/* <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setStep("reset")}
              className="text-sm font-medium text-blue-600 hover:underline disabled:opacity-50 dark:text-blue-400"
            >
              Already have a token?
            </button>
          </div> */}
        </form>
      ) : (
        <form onSubmit={handleResetSubmit} noValidate>
          <Field label="Username" htmlFor="pr-user" required>
            <input
              id="pr-user"
              type="text"
              className={inputClass(!user ? "Username required" : "")}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="User name"
            />
          </Field>
          {/* It is not necessary to show user token */}
          {/* <Field label="Token" htmlFor="pr-token" required>
            <input
              id="pr-token"
              type="text"
              inputMode="text"
              autoComplete="one-time-code"
              className={inputClass(!token ? "Token is required." : "")}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              aria-invalid={!token}
              aria-describedby={!token ? "pr-token-error" : undefined}
              placeholder="Paste token"
              required
            />
          </Field> */}

          <Field
            label="New password"
            htmlFor="pr-pass"
            error={passwordLengthHasError}
            required
          >
            <div className="relative">
              <input
                id="pr-pass"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                className={inputClass(passwordLengthHasError)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!passwordLengthHasError}
                aria-describedby={
                  passwordLengthHasError ? "pr-pass-error" : undefined
                }
                placeholder={`At least ${minLength} characters`}
                required
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute inset-y-0 right-2 my-auto inline-flex h-8 items-center rounded px-2 text-xs text-neutral-600 ring-1 ring-neutral-300 hover:bg-neutral-100 dark:text-neutral-300 dark:ring-neutral-600 dark:hover:bg-neutral-800"
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </Field>

          {requireConfirm && (
            <Field
              label="Confirm password"
              htmlFor="pr-confirm"
              error={comparePasswordHasError}
              required
            >
              <input
                id="pr-confirm"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                className={inputClass(comparePasswordHasError)}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                aria-invalid={!!comparePasswordHasError}
                aria-describedby={
                  comparePasswordHasError ? "pr-confirm-error" : undefined
                }
                placeholder="Re-enter password"
                required
              />
            </Field>
          )}

          <button
            type="submit"
            className={primaryButtonClass}
            disabled={formHasErrors || status.state === "loading"}
          >
            Reset password
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setStep("request")}
              className="text-sm font-medium text-blue-600 hover:underline disabled:opacity-50 dark:text-blue-400"
            >
              Need a reset link instead?
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ---------- UI primitives ---------- */

function Field({
  label,
  htmlFor,
  error,
  helper,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  helper?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const describedBy = error
    ? `${htmlFor}-error`
    : helper
      ? `${htmlFor}-help`
      : undefined;
  return (
    <div className="mb-4">
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200"
      >
        {label} {required && <span className="text-rose-600">*</span>}
      </label>
      {children}
      {helper && !error && (
        <p
          id={`${htmlFor}-help`}
          className="mt-1 text-xs text-neutral-500 dark:text-neutral-400"
        >
          {helper}
        </p>
      )}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="mt-1 text-xs text-rose-600 dark:text-rose-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "block w-full rounded-lg border bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 dark:bg-neutral-950 dark:text-neutral-100";

function inputClass(error?: string) {
  const ring = error
    ? "border-rose-400 focus:ring-rose-500/40"
    : "border-neutral-300 focus:ring-blue-500/30 dark:border-neutral-700";
  return `${inputBase} ${ring}`;
}

const primaryButtonClass =
  "mt-2 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-400";

