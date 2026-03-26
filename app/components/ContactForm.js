"use client";

import { useCallback, useState } from "react";

import MaskedEmailLink from "@/app/components/MaskedEmailLink";

const INQUIRY_TYPES = [
  { value: "general", label: "일반 문의" },
  { value: "ad", label: "광고 문의" },
  { value: "bug", label: "오류 신고" },
  { value: "other", label: "기타" },
];

const baseFieldClass =
  "w-full rounded-lg border bg-bg-main px-3 py-2.5 text-sm text-text-main outline-none transition placeholder:text-text-sub/70 dark:bg-dm-card dark:text-dm-text dark:placeholder:text-dm-muted/80";

const focusRing =
  "focus:border-primary focus:ring-2 focus:ring-primary/35 dark:focus:border-blue-500 dark:focus:ring-blue-500/30";

function isValidEmail(value) {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/**
 * @param {{ mailLocal: string; mailDomain: string }} props
 */
export default function ContactForm({ mailLocal, mailDomain }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const clearFieldError = useCallback((key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  function validate() {
    const next = {};
    if (!name.trim()) next.name = "이름을 입력해 주세요.";
    if (!email.trim()) next.email = "이메일을 입력해 주세요.";
    else if (!isValidEmail(email)) next.email = "올바른 이메일 형식이 아닙니다.";
    if (!inquiryType) next.inquiryType = "문의 유형을 선택해 주세요.";
    if (!subject.trim()) next.subject = "제목을 입력해 주세요.";
    if (!message.trim()) next.message = "내용을 입력해 주세요.";
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="space-y-10">
        <div
          className="rounded-2xl border border-emerald-200/80 bg-emerald-50/90 px-6 py-10 text-center dark:border-emerald-800/60 dark:bg-emerald-950/40"
          role="status"
        >
          <p className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
            문의가 접수되었습니다.
          </p>
          <p className="mt-2 text-sm text-emerald-800/90 dark:text-emerald-200/90">
            실제 전송·답변은 추후 서비스 연동 후 제공될 예정입니다.
          </p>
        </div>

        <footer className="border-t border-border pt-8 dark:border-dm-border">
          <p className="text-sm text-text-sub dark:text-dm-muted">
            직접 이메일로 문의하기:{" "}
            <MaskedEmailLink localPart={mailLocal} domain={mailDomain} />
          </p>
        </footer>
      </div>
    );
  }

  const err = (key) => errors[key];

  return (
    <div className="space-y-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
        aria-label="문의 양식"
      >
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-text-main dark:text-dm-text"
          >
            이름 <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError("name");
            }}
            aria-invalid={Boolean(err("name"))}
            aria-describedby={err("name") ? "err-name" : undefined}
            className={`${baseFieldClass} ${focusRing} ${
              err("name")
                ? "border-red-500 dark:border-red-500"
                : "border-border dark:border-dm-border"
            }`}
          />
          {err("name") ? (
            <p id="err-name" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {err("name")}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-text-main dark:text-dm-text"
          >
            이메일 <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            aria-invalid={Boolean(err("email"))}
            aria-describedby={err("email") ? "err-email" : undefined}
            className={`${baseFieldClass} ${focusRing} ${
              err("email")
                ? "border-red-500 dark:border-red-500"
                : "border-border dark:border-dm-border"
            }`}
          />
          {err("email") ? (
            <p id="err-email" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {err("email")}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-type"
            className="mb-1.5 block text-sm font-medium text-text-main dark:text-dm-text"
          >
            문의 유형 <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <select
            id="contact-type"
            name="inquiryType"
            value={inquiryType}
            onChange={(e) => {
              setInquiryType(e.target.value);
              clearFieldError("inquiryType");
            }}
            aria-invalid={Boolean(err("inquiryType"))}
            aria-describedby={err("inquiryType") ? "err-type" : undefined}
            className={`${baseFieldClass} ${focusRing} ${
              err("inquiryType")
                ? "border-red-500 dark:border-red-500"
                : "border-border dark:border-dm-border"
            }`}
          >
            <option value="">선택하세요</option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {err("inquiryType") ? (
            <p id="err-type" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {err("inquiryType")}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="mb-1.5 block text-sm font-medium text-text-main dark:text-dm-text"
          >
            제목 <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              clearFieldError("subject");
            }}
            aria-invalid={Boolean(err("subject"))}
            aria-describedby={err("subject") ? "err-subject" : undefined}
            className={`${baseFieldClass} ${focusRing} ${
              err("subject")
                ? "border-red-500 dark:border-red-500"
                : "border-border dark:border-dm-border"
            }`}
          />
          {err("subject") ? (
            <p
              id="err-subject"
              className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            >
              {err("subject")}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-sm font-medium text-text-main dark:text-dm-text"
          >
            내용 <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={7}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              clearFieldError("message");
            }}
            aria-invalid={Boolean(err("message"))}
            aria-describedby={err("message") ? "err-message" : undefined}
            className={`min-h-[150px] resize-y ${baseFieldClass} ${focusRing} ${
              err("message")
                ? "border-red-500 dark:border-red-500"
                : "border-border dark:border-dm-border"
            }`}
          />
          {err("message") ? (
            <p
              id="err-message"
              className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            >
              {err("message")}
            </p>
          ) : null}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:outline-blue-500 sm:w-auto sm:min-w-[10rem]"
          >
            {loading ? "전송 중…" : "제출하기"}
          </button>
        </div>
      </form>

      <footer className="border-t border-border pt-8 dark:border-dm-border">
        <p className="text-sm leading-relaxed text-text-sub dark:text-dm-muted">
          직접 이메일로 문의하기:{" "}
          <MaskedEmailLink localPart={mailLocal} domain={mailDomain} />
        </p>
        <p className="mt-2 text-xs text-text-sub/90 dark:text-dm-muted/90">
          주소는 페이지 로드 후에만 표시되어 자동 수집을 줄이기 위한 조치입니다.
        </p>
      </footer>
    </div>
  );
}
