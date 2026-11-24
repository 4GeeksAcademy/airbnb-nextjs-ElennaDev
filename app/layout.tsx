import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Refugio · Alojamientos vacacionales",
  description: "Encuentra alojamientos vacacionales por categoría, precio y valoración.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-neutral-800">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
