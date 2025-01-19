import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const envUrl = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://jokes.mosesadebayo.tech";


export const metadata: Metadata = {
  title: "Jokes AI",
  description: "Jokes AI is your personal, on-demand comedian, powered by cutting-edge artificial intelligence. With a simple input—just provide a subject or theme—Jokes AI generates witty, funny, and sometimes sarcastic jokes that are perfect for any occasion. Whether you're looking to lighten the mood, break the ice, or just share a laugh with friends, Jokes AI delivers the perfect punchline every time.",
  openGraph: {
    type: "website",
    url: "https://jokes.mosesadebayo.tech",
    title: "Jokes AI",
    description: "Jokes AI is your personal, on-demand comedian, powered by cutting-edge artificial intelligence. With a simple input—just provide a subject or theme—Jokes AI generates witty, funny, and sometimes sarcastic jokes that are perfect for any occasion. Whether you're looking to lighten the mood, break the ice, or just share a laugh with friends, Jokes AI delivers the perfect punchline every time.",
    images: [
      {
        url: `${envUrl}/Images/logo.png`,
        width: 900,
        height: 600,
        alt: "Wholesquare Logo",
      },
    ],
  },
  twitter: {
    creator: "@muzarde1",
    site: "@muzarde1",
    card: "summary",
  },
  authors: [{ name: "Moses Adebayo", url: "https://mosesadebayo.tech" }],
  creator: "Moses Adebayo",
  publisher: "Moses Adebayo",
  applicationName: "Jokes AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
