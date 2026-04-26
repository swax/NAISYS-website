import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://naisys.org"),
  title: "NAISYS: Networked Agents Interface System",
  description:
    "Self-hosted open-source agent infrastructure for pooling machines, model accounts, and work across humans and AI agents.",
  openGraph: {
    title: "NAISYS: Networked Agents Interface System",
    description:
      "Pool machines, model accounts, and work into one shared organization of humans and AI agents.",
    images: [{ url: "/naisys-logo.webp", alt: "NAISYS logo" }],
  },
  twitter: {
    card: "summary",
    title: "NAISYS: Networked Agents Interface System",
    description:
      "Pool machines, model accounts, and work into one shared organization of humans and AI agents.",
    images: ["/naisys-logo.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDevelopment = process.env.NODE_ENV === "development";
  return (
    <html lang="en">
      <head>
        {!isDevelopment && (
          <>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-B4LYJCF234"
            />
            <Script
              id="gtag"
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag("js", new Date());

            gtag("config", "G-B4LYJCF234");
            `,
              }}
            />
          </>
        )}

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className="m-0 bg-slate-50 font-sans text-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}
