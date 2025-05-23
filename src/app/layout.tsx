import { MobileViewMessage } from "@/components/mobile-view-message";
import { ThemeProvider } from "@/components/theme-provider";
import TanstackQueryProvider from "@/providers/tanstack-query-provider";
import WhoAmIProvider from "@/providers/who-am-i-provider";
import FeedbackButton from "@/components/FeedbackButton";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Inter,
  Playfair_Display,
} from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { PostHogProvider } from "@/lib/posthog-provider";
import NerdspaceOut from "@/components/soon/nerdspace-out";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  preload: true,
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s | NerdSpace",
    default: "NerdSpace",
  },
  description: "social media for nerds",
};

const InstrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const itcThinItalic = localFont({
  src: [
    {
      path: "../../public/fonts/ITCGaramondStd-LtCondIta.ttf",
      weight: "700",
    },
  ],
  variable: "--font-itcThinItalic",
});

const itcThin = localFont({
  src: [
    {
      path: "../../public/fonts/ITCGaramondStd-LtCond.ttf",
      weight: "800",
    },
  ],
  variable: "--font-itcThin",
});

const itcBold = localFont({
  src: [
    {
      path: "../../public/fonts/ITCGaramondStd-BkCond.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-itcBold",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${InstrumentSerif.variable} ${inter.variable} ${itcThin.variable} ${itcBold.variable} ${itcThinItalic.variable} overflow-x-hidden font-geist antialiased dark:bg-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackQueryProvider>
            <WhoAmIProvider>
              <PostHogProvider>
                <MobileViewMessage />
                {/* <NerdspaceOut /> */}
                {children}
                <FeedbackButton />
              </PostHogProvider>
            </WhoAmIProvider>
          </TanstackQueryProvider>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              className: "",
              style: {
                border: "1px solid #201e1d",
                padding: "8px",
                color: "#ffffff",
                backgroundColor: "#201e1d",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 0,
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
