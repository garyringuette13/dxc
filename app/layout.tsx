import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

const CANONICAL_URL = "https://worklife.alight.com/ah-angular-afirst-web";
const SITE_DOMAIN = "worklife.alight.com";
const SITE_BRAND = "DXC Worklife";

const PAGE_DESCRIPTION =
  "DXC Worklife - Secure sign-in for the DXC Technology employee benefits portal. Access your account, manage health, retirement, and dependent care benefits through Alight Worklife.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || CANONICAL_URL,
  ),
  title: {
    default: "DXC Worklife - Login",
    template: "%s | DXC Worklife",
  },
  description: PAGE_DESCRIPTION,
  keywords: [
    "DXC Worklife",
    "DXC Worklife login",
    "DXC Technology employee portal",
    "DXC Technology benefits",
    "DXC benefits login",
    "DXC employee benefits",
    "Alight Worklife DXC",
    "worklife login",
    "employee benefits portal",
    "benefits login",
    "healthcare benefits",
    "retirement benefits",
    "dependent care benefits",
    "payroll benefits",
    "benefits account management",
    "DXC HSA",
    "DXC FSA",
    "DXC retirement",
    "DXC 401k",
    "Alight Worklife DXC",
    "secure login",
    "mobile benefits login",
    "HSA account",
    "FSA account",
    "benefits enrollment",
    "password reset",
    "register account",
    "employee benefits access",
    "DXC Worklife portal",
    "DXC benefits access",
  ],
  authors: [{ name: "DXC Worklife" }],
  creator: "DXC Worklife",
  publisher: "DXC Worklife",
  applicationName: SITE_BRAND,
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "DXC Worklife - Login",
    description: PAGE_DESCRIPTION,
    siteName: SITE_BRAND,
    url: CANONICAL_URL,
    images: [
      {
        url: "/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_BRAND} - Employee Benefits Portal`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DXC Worklife - Login",
    description: PAGE_DESCRIPTION,
    images: ["/og-banner.jpg"],
  },
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-32x32.png",
    apple: "/favicon-32x32.png",
  },
  category: "Business",
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      "en-US": CANONICAL_URL,
    },
  },
  other: {
    "geo.region": "US",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4D148C",
};

// \u2014\u2014 Schema.org Structured Data \u2014\u2014

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_BRAND,
  url: CANONICAL_URL,
  logo: `${CANONICAL_URL}/favicon-32x32.png`,
  description:
    "DXC Worklife provides secure access to health, retirement, and dependent care benefits through the Alight Worklife employee benefits portal.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    availableLanguage: ["en"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_BRAND,
  url: CANONICAL_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${CANONICAL_URL}?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I login to my DXC Worklife account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit the DXC Worklife sign-in page and enter your user ID and password to access your employee benefits portal.",
      },
    },
    {
      "@type": "Question",
      name: "What benefits can I manage through DXC Worklife?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can manage health benefits, retirement plans (401k), dependent care, HSA, FSA, and other employee benefits through the DXC Worklife portal.",
      },
    },
    {
      "@type": "Question",
      name: "How do I reset my DXC Worklife password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the forgot password link on the sign-in page and follow the verification steps to reset your password.",
      },
    },
    {
      "@type": "Question",
      name: "What is DXC Worklife?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DXC Worklife is the employee benefits portal powered by Alight Solutions, where DXC Technology employees can access and manage their benefits.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: CANONICAL_URL,
    },
  ],
};

const jsonLd = [organizationSchema, websiteSchema, faqSchema, breadcrumbSchema];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Core meta tags */}
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#4D148C" />
        <link rel="canonical" href={CANONICAL_URL} />
      </head>
      <body className={`${geist.className} font-sans antialiased`}>
        {jsonLd.map((schema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
