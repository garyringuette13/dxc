const BASE =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://worklife.alight.com/ah-angular-afirst-web";

export default function Head() {
  return (
    <>
      <title>Alight Worklife — Login</title>
      <meta
        name="description"
        content="Secure login for Alight Worklife at worklife.alight.com. Access employee benefits, FSA, HSA, COBRA, and more through the Worklife portal."
      />
      <link
        rel="canonical"
        href="https://worklife.alight.com/ah-angular-afirst-web/#/web/csc/login?forkPage=false"
      />

      {/* Open Graph */}
      <meta property="og:title" content="Alight Worklife — Login" />
      <meta
        property="og:description"
        content="Secure login for Alight Worklife at worklife.alight.com. Access employee benefits, FSA, HSA, COBRA, and more through the Worklife portal."
      />
      <meta
        property="og:url"
        content="https://worklife.alight.com/ah-angular-afirst-web/#/web/csc/login?forkPage=false"
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${BASE}/Nbs%20banner_new.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Alight Worklife — Login" />
      <meta
        name="twitter:description"
        content="Secure login for Alight Worklife at worklife.alight.com. Access employee benefits, FSA, HSA, COBRA, and more through the Worklife portal."
      />
      <meta name="twitter:image" content={`${BASE}/Nbs%20banner_new.png`} />
    </>
  );
}
