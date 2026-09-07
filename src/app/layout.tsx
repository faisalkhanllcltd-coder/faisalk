import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Faisal Khan — Web Developer & Digital Marketer",
    template: "%s | Faisal Khan",
  },
  description:
    "Faisal Khan is a web developer and digital marketer helping businesses grow through performant, accessible digital experiences.",
  metadataBase: new URL("https://faisalk.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
