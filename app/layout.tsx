import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zanjeel Tariq | Portfolio",
  description: "Full Stack Developer & Designer specializing in creating innovative web experiences with modern technologies.",
  openGraph: {
    title: "Zanjeel Tariq | Portfolio",
    description: "Full Stack Developer & Designer specializing in creating innovative web experiences with modern technologies.",
    url: "https://zanjeel-portfolio.netlify.app",
    siteName: "Zanjeel Tariq Portfolio",
    images: [
      {
        url: "/proj-portfolio1.jpeg",
        width: 1200,
        height: 630,
        alt: "Zanjeel Tariq Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zanjeel Tariq | Portfolio",
    description: "Software Developer specializing in creating innovative web experiences with modern technologies.",
    creator: "@zanjeeltariq",
    images: ["/proj-portfolio1.jpeg"],
  },
  icons: {
    icon: '/zeejlogo.png',
    shortcut: '/zeejlogo.png',
    apple: '/zeejlogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/zeejlogo.svg" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
