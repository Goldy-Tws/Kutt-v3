import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "KUTT — The Social Betting Platform | Bet With People, Not The House",
  description:
    "Turn handshake bets and group chat arguments into real, trackable, head-to-head wagers with zero house vig. Challenge friends on sports, pop culture, and verifiable outcomes.",
  keywords: [
    "social betting",
    "peer-to-peer betting",
    "P2P wagering",
    "sports betting without the house",
    "handshake bets",
    "KUTT",
  ],
  openGraph: {
    title: "KUTT — Bet With People, Not The House",
    description:
      "Turn handshake bets into real, trackable, social competition. Mutual acceptance, escrow protection, and zero bookmaker vig.",
    url: "https://kutt.com",
    siteName: "Kutt",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KUTT — The Social Betting Platform",
    description:
      "Peer-to-peer social betting. Challenge friends directly with locked escrow terms and zero house vig.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('kutt-theme') === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-kutt-bg text-kutt-textLight light:bg-[#F8FAFC] light:text-slate-700 antialiased selection:bg-kutt-green selection:text-black min-h-screen transition-colors">
        <ThemeProvider>
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

