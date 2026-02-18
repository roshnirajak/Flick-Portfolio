import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import localFont from "next/font/local";
// import CustomCursor from "./components/CustomCursor";
import { VideoHoverProvider } from "./contexts/VideoHoverContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const akiraExpanded = localFont({
  src: "../public/font/Akira Expanded Demo.otf",
  variable: "--font-akira-expanded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flick",
  description: "My portfolio website showcasing my work and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${akiraExpanded.variable} ${nunito.variable} antialiased`}
      >
        <VideoHoverProvider>
          {/* <CustomCursor /> */}
          {children}
        </VideoHoverProvider>
      </body>
    </html>
  );
}
