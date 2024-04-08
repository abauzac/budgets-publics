import type { Metadata } from "next";
import Link from "next/link";

import "./pico.min.css";
import "./custom.css";
import "./flexbox-utils.css";

export const metadata: Metadata = {
  title: "Tableau de bord des finances locales",
  description:
    "Comptabilité et finances des collectivités locales (communes, départements, régions) en France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="container">
        <nav>
          <ul>
            <li>
              <strong>Budgets publics</strong>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/budgets/communes">
                Communes
              </Link>
            </li>
            <li>
              <Link href="/budgets/collectivites">
                Collectivités
              </Link>
            </li>
            <li>
              <Link href="/budgets/departements">
                Départements
              </Link>
            </li>
            <li>
              <Link href="/budgets/regions">
                Régions
              </Link>
            </li>
            <li>
              <Link href="/a-propos">
                A propos
              </Link>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
