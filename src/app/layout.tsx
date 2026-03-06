import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "Kiran Talagana | Data Engineer",
  description:
    "Experienced Data Engineer with 8 years of engineering experience. Specializing in Azure, Microsoft Fabric, Databricks, and data pipeline architecture.",
  keywords: [
    "Data Engineer",
    "Azure",
    "Microsoft Fabric",
    "Databricks",
    "PySpark",
    "ETL",
    "Data Pipeline",
    "Kiran Talagana",
  ],
  authors: [{ name: "Kiran Talagana" }],
  openGraph: {
    title: "Kiran Talagana | Data Engineer",
    description:
      "Experienced Data Engineer with 8 years of engineering experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="dark">
        <ThemeProvider>
          <AnimatedBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
