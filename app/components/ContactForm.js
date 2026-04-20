"use client";

import { useState } from "react";

const CONTACT_API = "/api/contact";

/** @type {React.FormEventHandler<HTMLFormElement>} */
export default function ContactForm({ formEnabled }) {
  const isConfigured = formEnabled === true;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isConfigured) return;
    setErrorText("");
    setStatus("sending");

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.success === false) {
        setStatus("idle");
        setErrorText(
          typeof data.message === "string"
            ? data.message
            : "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("idle");
      setErrorText("네트워크 오류가 발생했습니다. 연결을 확인한 뒤 다시 시도해 주세요.");
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-lg border border-border bg-bg-main px-3.5 py-2.5 text-[0.9375rem] text-text-main shadow-sm outline-none transition placeholder:text-text-sub/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 dark:border-dm-border dark:bg-dm-card dark:text-dm-text dark:placeholder:text-dm-muted/50 dark:focus:border-blue-500/40 dark:focus:ring-blue-500/20";

  const labelClass =
    "text-sm font-medium text-text-main dark:text-dm-text";

  return (
    <section
      className="rounded-2xl border border-border bg-secondary/60 px-5 py-8 shadow-sm dark:border-dm-border dark:bg-dm-bg sm:px-8 sm:py-10"
      aria-labelledby="contact-form-heading"
    >
      <h2
        id="contact-form-heading"
        className="text-base font-semibold uppercase tracking-wider text-primary sm:text-lg dark:text-blue-400"
      >
        문의 보내기
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-text-sub dark:text-dm-muted">
        아래 폼을 작성해 주시면 이메일로 전달됩니다.
      </p>

      {!isConfigured ? (
        <p
          className="mt-6 rounded-lg border border-amber-200/90 bg-amber-50/90 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100"
          role="status"
        >
          문의 폼이 아직 연결되지 않았습니다.{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs dark:bg-white/10">
            WEB3FORMS_ACCESS_KEY
          </code>
          에 Web3Forms Access Key를 넣어 주세요. 로컬은{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs dark:bg-white/10">
            .env.local
          </code>
          , Vercel은 Environment Variables에 등록한 뒤 재배포하면 됩니다. (서버
          전용이라 브라우저에 키가 노출되지 않습니다.)
        </p>
      ) : null}

      {status === "success" ? (
        <div
          className="mt-8 rounded-xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-4 text-center text-sm font-medium text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-100"
          role="status"
        >
          전송 완료 (Success!)
        </div>
      ) : isConfigured ? (
        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              성함 <span className="text-text-sub dark:text-dm-muted">(Name)</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldClass}
              disabled={status === "sending"}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              이메일 <span className="text-text-sub dark:text-dm-muted">(Email)</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
              disabled={status === "sending"}
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className={labelClass}>
              제목 <span className="text-text-sub dark:text-dm-muted">(Subject)</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={fieldClass}
              disabled={status === "sending"}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className={labelClass}>
              메시지 <span className="text-text-sub dark:text-dm-muted">(Message)</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${fieldClass} resize-y min-h-[140px]`}
              disabled={status === "sending"}
            />
          </div>

          {errorText ? (
            <p
              className="rounded-lg border border-red-200/90 bg-red-50/90 px-3 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/35 dark:text-red-100"
              role="alert"
            >
              {errorText}
            </p>
          ) : null}

          <div className="pt-1">
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              {status === "sending" ? "Sending..." : "보내기"}
            </button>
          </div>
        </form>
      ) : null}

      {status === "success" ? (
        <p className="mt-6 text-center text-sm text-text-sub dark:text-dm-muted">
          <button
            type="button"
            className="font-medium text-primary underline-offset-2 hover:underline dark:text-blue-400"
            onClick={() => setStatus("idle")}
          >
            새 문의 작성
          </button>
        </p>
      ) : null}
    </section>
  );
}
