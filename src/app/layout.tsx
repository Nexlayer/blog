import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://nexlayer.com"),
  title: {
    template: "%s | Blog | Nexlayer",
    default: "Nexlayer Blog - Insights on AI, Cloud & Deployment",
  },
  description:
    "Read the latest insights, tutorials, and updates on AI-native cloud deployment, developer workflows, and building full-stack AI applications with Nexlayer.",
  keywords:
    "Nexlayer blog, AI deployment guides, cloud infrastructure blog, AI-native cloud insights, developer tutorials, full-stack AI apps, AI agents, launchfile blog, nexlayer updates",
  openGraph: {
    title: {
      template: "%s | Blog | Nexlayer",
      default: "Nexlayer Blog - Insights on AI, Cloud & Deployment",
    },
    description:
      "Stay ahead with expert articles on AI-native deployment, cloud infrastructure, and full-stack AI development. Tutorials, updates, and deep dives from Nexlayer.",
    type: "article",
    url: new URL("https://nexlayer.com/blog"),
    images: [
      {
        url: new URL("https://nexlayer.com/og-image.png"),
        alt: "Nexlayer Blog Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nexlayer",
    title: {
      template: "%s | Blog | Nexlayer",
      default: "Nexlayer Blog - Insights on AI, Cloud & Deployment",
    },
    description:
      "Expert insights, tutorials, and updates on AI-native deployment and cloud infrastructure—powered by Nexlayer.",
    creator: "@nexlayer",
    images: [
      {
        url: new URL("https://nexlayer.com/og-image.png"),
        alt: "Nexlayer Blog Twitter Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="canonical" href="https://nexlayer.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Nexlayer",
              url: "https://nexlayer.com/",
              logo: "https://nexlayer.com/logo.png",
              sameAs: ["https://x.com/nexlayer", "https://github.com/nexlayer"],
            }),
          }}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className={`flex flex-col min-h-screen`}>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
