import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://worklife.alight.com/ah-angular-afirst-web";
const SITE_DOMAIN = new URL(SITE_BASE_URL).hostname;
const SITE_BRAND = "Alight Worklife";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_BASE_URL),
  title: {
    default: "Alight Worklife - Login",
    template: "%s | Alight Worklife",
  },
  keywords: [
    "Alight Worklife",
    "Worklife login",
    "worklife.alight.com",
    "Alight employee benefits",
    "employee benefits portal",
    "benefits login",
    "FSA account",
    "HSA account",
    "COBRA continuation",
    "benefits enrollment",
    "benefits claims",
    "participant login",
    "new user registration",
    "password reset",
    "benefits administration",
    "dependent care benefits",
    "healthcare benefits",
    "employer benefits portal",
    "broker benefits",
    "secure benefits login",
    "benefits account management",
    "benefits eligibility",
    "benefits customer support",
    "Alight mobile login",
    "Worklife app login",
    "Worklife secure portal",
    "Alight Worklife login",
    "Alight benefits login",
    "Alight employee portal",
    "worklife benefits portal",
    "employee benefit login",
    "worklife alight employee benefits",
    "worklife alight portal",
  ],
  description: `${SITE_BRAND} – ${SITE_DOMAIN}. Secure login for the Alight Worklife employee benefits portal at worklife.alight.com. Access FSA, HSA, COBRA, and employee benefit services through the Worklife portal.`,

  authors: [{ name: "Alight Worklife" }],
  creator: "Alight Worklife",
  publisher: "Alight Worklife",
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
    title: "Alight Worklife - Login",
    description: `${SITE_BRAND} – ${SITE_DOMAIN}. Secure login for the Alight Worklife employee benefits portal at worklife.alight.com. Access FSA, HSA, COBRA, and employee benefit services through the Worklife portal.`,
    siteName: SITE_BRAND,
    url: SITE_BASE_URL,
    images: [
      {
        url: `${SITE_BASE_URL}/Nbs%20banner_new.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_BRAND}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Alight Worklife - Login",
    description: `${SITE_BRAND} – ${SITE_DOMAIN}. Secure login for the Alight Worklife employee benefits portal at worklife.alight.com. Access FSA, HSA, COBRA, and employee benefit services through the Worklife portal.`,
    images: [`${SITE_BASE_URL}/Nbs%20banner_new.png`],
  },
  icons: {
    icon: "/favicon-32x32.png",
  },
  category: "Business",
  alternates: {
    canonical: SITE_BASE_URL,
    languages: {
      "en-US": SITE_BASE_URL,
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
  themeColor: "#254650",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_BRAND,
  url: SITE_BASE_URL,
  logo: `${SITE_BASE_URL}/Nbs%20banner_new.png`,
  description:
    "Alight Worklife provides secure access to FSA, HSA, COBRA, and employee benefit services through the Worklife portal at worklife.alight.com.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    availableLanguage: ["en"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I login to my Alight Worklife account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit the Alight Worklife portal at worklife.alight.com and enter your username and password. Select your user role and click LOGIN to access your benefits.",
      },
    },
    {
      "@type": "Question",
      name: "What is FSA login and how do I access it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FSA (Flexible Spending Account) login allows you to manage your health and dependent care reimbursement accounts through the National Benefit Services portal.",
      },
    },
    {
      "@type": "Question",
      name: "How do I reset my Alight Worklife password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Click the forgot password link on the Alight Worklife login page. Follow the verification steps and set a new password for your account.",
      },
    },
    {
      "@type": "Question",
      name: "What benefits can I manage through this employee benefits portal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can manage FSA (health and dependent care), HSA, COBRA continuation coverage, and other employee benefits through your secure account.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_BRAND,
  url: SITE_BASE_URL,
};

const jsonLd = [organizationSchema, faqSchema, websiteSchema];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/logo.svg" />
        <link rel="shortcut icon" href="/images/logo.svg" />
        <link rel="apple-touch-icon" href="/images/logo.svg" />
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
