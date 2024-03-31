import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord des finances locales",
  description: "Comptabilité et finances des collectivités locales (communes, départements, régions) en France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container">{children}</body>
    </html>
  );
}
