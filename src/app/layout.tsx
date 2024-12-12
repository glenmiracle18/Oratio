import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Modals } from "@/components/modals";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { JotaiProvider } from "@/components/JotaiProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Oratio",
  description: "An attempt to clone slack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
        >
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <JotaiProvider>
              <Modals />
              <Toaster />
              {children}
              </JotaiProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
