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
          <img src="/images/file.svg" alt="logo" width="72" height="44" />
        </a>
      </nav>
    </header>
  );
}
