import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/shared/theme-provider";
import { LanguageProvider } from "@/components/shared/LanguageContext";
import { ThemeModeProvider } from "@/components/shared/ThemeModeContext";
import { MainContentWrapper } from "@/components/shared/MainContentWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Ocdyvian Alfin R",
  description: "Software Engineer & UI/UX Researcher Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ThemeModeProvider>
              <MainContentWrapper>
                {children}
              </MainContentWrapper>
            </ThemeModeProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}