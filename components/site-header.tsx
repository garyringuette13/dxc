"use client";

import React from "react";

export function SiteHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-5 py-2">
      <style>{`
        .topnav-header {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 8px 20px;
        }

        .nbs-logo-header {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          text-decoration: none;
          flex-shrink: 0;
          line-height: 1;
        }

        .contact-block-header {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 0.78rem;
          color: #444;
        }

        .contact-row-header {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .contact-row-header svg {
          flex-shrink: 0;
          color: #666;
        }

        .nav-login-label-header {
          font-size: 1.25rem;
          font-weight: 300;
          color: #333;
          margin-left: 4px;
        }

        @media (max-width: 768px) {
          .topnav-header {
            flex-wrap: wrap;
            gap: 12px;
            padding: 8px 16px;
          }
          .contact-block-header {
            font-size: 0.72rem;
          }
        }
      `}</style>
      <nav className="topnav-header">
        <a className="nbs-logo-header" href="/" onClick={(e) => e.preventDefault()}>
          <svg
            width="72"
            height="44"
            viewBox="0 0 200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 55 Q60 5 130 30 Q160 40 190 28 Q155 55 100 48 Q55 42 10 55Z"
              fill="#f5c400"
            />
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

        <div className="contact-block-header">
          <div className="contact-row-header">
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
          <div className="contact-row-header">
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

        <span className="nav-login-label-header">Login</span>
      </nav>
    </header>
  );
}
