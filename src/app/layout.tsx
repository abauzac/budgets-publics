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
              <Link href="/"><strong>Budgets publics</strong></Link>
            </li>
          </ul>
          <ul className="nav-links-desktop">
            <li>
              <Link href="/budgets/communes">Communes</Link>
            </li>
            <li>
              <Link href="/budgets/collectivites">Collectivités</Link>
            </li>
            <li>
              <Link href="/budgets/departements">Départements</Link>
            </li>
            <li>
              <Link href="/budgets/regions">Régions</Link>
            </li>
            <li>
              <Link href="/a-propos">A propos</Link>
            </li>
          </ul>
          <ul className="nav-links-mobile">
            <li>
            <details className="dropdown">
              <summary>Menu</summary>
              <ul dir="rtl">
                <li>
                  <Link href="/budgets/communes">Communes</Link>
                </li>
                <li>
                  <Link href="/budgets/collectivites">Collectivités</Link>
                </li>
                <li>
                  <Link href="/budgets/departements">Départements</Link>
                </li>
                <li>
                  <Link href="/budgets/regions">Régions</Link>
                </li>
                <li>
                  <Link href="/a-propos">A propos</Link>
                </li>
              </ul>
            </details>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
        <footer style={{ textAlign: "center" }}>
        <a href="https://visitorbadge.io/status?path=https%3A%2F%2Fabauzac.github.io%2Fbudgets-publics%2F"><img src="https://api.visitorbadge.io/api/combined?path=https%3A%2F%2Fabauzac.github.io%2Fbudgets-publics%2F&label=Visiteurs&countColor=%23263759&style=flat-square" /></a>
        </footer>
      </body>
    </html>
  );
}
