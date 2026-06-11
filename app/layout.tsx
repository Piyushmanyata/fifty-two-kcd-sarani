import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, Marcellus } from "next/font/google";
import { LenisProvider } from "@/lib/lenis";
import "./globals.css";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fifty-two-kcd-sarani.vercel.app"),
  title: "FIFTY TWO - Entire G+4 Building for Sale | New Alipore, Kolkata",
  description:
    "A five-storied premium residential building at 52 Krishna Chandra Dey Sarani, New Alipore - 6,271 sq ft, four residences, four car parks. Offered in its entirety to a single buyer. Price on request.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "FIFTY TWO — Entire G+4 Building for Sale | New Alipore, Kolkata",
    description:
      "A five-storied private residence of 6,271 sq ft on Krishna Chandra Dey Sarani, New Alipore — offered in its entirety to a single buyer. Price on request.",
    url: "https://fifty-two-kcd-sarani.vercel.app",
    siteName: "FIFTY TWO",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://fifty-two-kcd-sarani.vercel.app/og.jpg",
        width: 1200,
        height: 630,
        alt: "FIFTY TWO — G+4 Building for Sale at 52 Krishna Chandra Dey Sarani, New Alipore, Kolkata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIFTY TWO — Entire G+4 Building for Sale | New Alipore, Kolkata",
    description:
      "A five-storied private residence of 6,271 sq ft on Krishna Chandra Dey Sarani — offered in its entirety to a single buyer.",
    images: ["https://fifty-two-kcd-sarani.vercel.app/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#121317",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: "FIFTY TWO - Entire G+4 Building for Sale",
  description:
    "A five-storied premium residential building at 52 Krishna Chandra Dey Sarani, New Alipore, offered in its entirety to a single buyer.",
  url: "https://fifty-two-kcd-sarani.vercel.app",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Premises No. 52, Krishna Chandra Dey Sarani",
    addressLocality: "New Alipore",
    addressRegion: "Kolkata",
    postalCode: "700053",
    addressCountry: "IN",
  },
  numberOfRooms: 4,
  floorSize: {
    "@type": "QuantitativeValue",
    value: 6271,
    unitText: "SQFT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${hanken.variable} ${fraunces.variable}`}
    >
      <body>
        <LenisProvider>
          {children}
          <div className="noise" aria-hidden="true" />
        </LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
