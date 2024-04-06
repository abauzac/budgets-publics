"use client";

import { useEffect, useState } from "react";
import departements from "../../../public/json/departements.json";
import communes from "../../../public/json/communes.json";
import GraphOneLine from "./graphOneLine";
import {
  GraphTypeVueGlobalCommune,
  communeFonctionnementChargeListe,
  communeFonctionnementProduitCharge,
  communeFonctionnementProduitListe,
  communeInvestissementResourcesEmplois,
  communeInvestissementsEmploisListe,
  communeInvestissementsResourcesListe,
} from "../_utils/charts";
import GraphMultiLines from "./graphMultiLines";
import { useRouter, useSearchParams } from "next/navigation";

export default function Communes() {
  const [departement, setDepartement] = useState(""); // "01", "02", "03", ... "95
  const [listeCommunes, setListeCommunes] = useState<any[]>([]); // liste des communes du département sélectionné
  const [commune, setCommune] = useState<any>(null); // objet commune
  const [typeVue, setTypeVue] = useState<
    "global" | "budget" | "investissements" | "dette" | "fiscalite"
  >("global");
  const router = useRouter();
  const params = useSearchParams();

  // on component mount
  useEffect(() => {
    const paramCommune = params.get("commune");
    if (paramCommune !== null) {
      const communeIndex = (communes as any[]).findIndex(
        (c) => c.COM === paramCommune && c.DATE_FIN === ""
      );
      if (communeIndex !== -1) {
        const communeFound = (communes as any[])[communeIndex];
        communeFound.index = communeIndex;
        setCommune(communeFound);
        const codeDep = communeFound.COM.startsWith("97")
          ? communeFound.COM.substring(0, 3)
          : communeFound.COM.substring(0, 2);
        const dep = departements.find((d) => d.DEP === codeDep);
        if (dep) {
          setDepartement(dep.DEP);
          setListeCommunes(
            (communes as any[])
              .map((c, i) => {
                c.index = i;
                return c;
              })
              .filter((c) => c.DATE_FIN === "" && c.COM.startsWith(codeDep))
          );
        }
      }
    }
  }, []);

  useEffect(() => {
    if (departement !== "") {
      const liste = (communes as any[])
        .map((c, i) => {
          c.index = i;
          return c;
        })
        .filter(
          (commune, index) =>
            commune.DATE_FIN == "" &&
            (commune.COM as string).startsWith(departement)
        );
      setListeCommunes(liste);
    }
  }, [departement]);
  return (
    <>
      <div className="wrapper">
        <aside>
          <nav>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setTypeVue("global");
                  }}
                >
                  Vue globale
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setTypeVue("budget");
                  }}
                >
                  Budget fonctionnel
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setTypeVue("investissements");
                  }}
                >
                  Investissements
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setTypeVue("dette");
                  }}
                >
                  Dette
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setTypeVue("fiscalite");
                  }}
                >
                  Fiscalité
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <div>
          <h1 style={{ textAlign: "center" }}>Comptabilité des communes</h1>
          <h4 style={{ textAlign: "center" }}>Chiffres en milliers d'euro</h4>
          <div className="grid">
            <select
              style={{ width: "300px", justifySelf: "center" }}
              name="departements"
              aria-label="Départements"
              value={departement}
              onChange={(event) => {
                setDepartement(event.target.value);
              }}
              required
            >
              <option value="">Départements</option>
              {departements.map((dep) => (
                <option key={dep.DEP} value={dep.DEP}>
                  {dep.DEP} - {dep.NCCENR}
                </option>
              ))}
            </select>
            <select
              style={{ width: "300px", justifySelf: "center" }}
              name="communes"
              aria-label="Communes"
              value={commune ? commune.index : ""}
              onChange={(event) => {
                setCommune((communes as any[])[parseInt(event.target.value)]);
                router.push(
                  `/budgets/communes?commune=${
                    (communes as any[])[parseInt(event.target.value)].COM
                  }`
                );
              }}
              required
            >
              <option value="">Communes</option>
              {listeCommunes.length > 0 &&
                listeCommunes.map((comm) => (
                  <option key={comm.COM} value={comm.index}>
                    {comm.COM} - {comm.NCCENR}
                  </option>
                ))}
            </select>
          </div>
          {commune && (
            <div>
              {typeVue === "global" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Vue globale pour la commune de {commune.NCCENR}</h2>
                  <br />
                  <h5>Résultat d'ensemble</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={GraphTypeVueGlobalCommune.ResultatEnsemble}
                  ></GraphOneLine>
                  <p>
                    Résultat d'ensemble = Résultat comptable + Besoin/Capacité
                    de financement section investissement
                  </p>
                  <hr />
                  <h5>Résultat comptable</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={GraphTypeVueGlobalCommune.ResultatComptable}
                  ></GraphOneLine>
                  <p>
                    Résultat comptable = Produits de fonctionnement - Charges de
                    fonctionnement
                  </p>
                  <hr />
                  <h5>
                    Besoin ou capacité de financement de la section
                    investissement
                  </h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={
                      GraphTypeVueGlobalCommune.BesoinFinancementInvestissement
                    }
                  ></GraphOneLine>
                  <p>
                    Besoin/Capa de fi. des inv. = Resources d'investissements -
                    Emplois d'investissement + solde des opérations compte de
                    tiers
                  </p>
                </div>
              )}
              {typeVue === "budget" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Budget fonctionnel pour la commune de {commune.NCCENR}
                  </h2>
                  <br />
                  <h5>Total des produits et charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={commune.COM}
                    graphs={communeFonctionnementProduitCharge}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Produits de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={commune.COM}
                    graphs={communeFonctionnementProduitListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={commune.COM}
                    graphs={communeFonctionnementChargeListe}
                  ></GraphMultiLines>
                </div>
              )}
              {typeVue === "investissements" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Budgets d'investissements pour la commune de{" "}
                    {commune.NCCENR}
                  </h2>
                  <br />
                  <h5>Total des resources et dépenses d'investissement</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={commune.COM}
                    graphs={communeInvestissementResourcesEmplois}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Resources d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={commune.COM}
                    graphs={communeInvestissementsResourcesListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Dépenses d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={commune.COM}
                    graphs={communeInvestissementsEmploisListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Soldes des operations pour compte de tiers</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"solde"}
                  ></GraphOneLine>
                </div>
              )}
              {typeVue === "dette" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Dette et Capacité d'autofinancement pour la commune de{" "}
                    {commune.NCCENR}
                  </h2>
                  <br />

                  <h3>Fonds de roulement</h3>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"fdr"}
                  ></GraphOneLine>
                  <hr />

                  <h3>Dette</h3>
                  <h5>Encours total de la dette au 31 décembre N</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"dette"}
                  ></GraphOneLine>
                  <hr />

                  <h5>Annuité de la dette</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"annu"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Avance du trésor</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"avance"}
                  ></GraphOneLine>
                  <hr />
                  <h3>Autofinancement</h3>
                  <h5>Excédent brut d'exploitation</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"ebf"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Capacité d'autofinancement = CAF</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"caf"}
                  ></GraphOneLine>
                  <hr />
                  <h5>CAF nette du remboursement en capital des emprunts</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"cafn"}
                  ></GraphOneLine>
                  <hr />
                </div>
              )}
              {typeVue === "fiscalite" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Fiscalité pour la commune de {commune.NCCENR}</h2>
                  <br />
                  <h5>Taxe d'habitation</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"pth"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe foncière sur les propriétés bâties</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"pfb"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe foncière sur les propriétés non bâties</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"pfnb"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Potentiel fiscal</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={commune.COM}
                    typeChart={"potfis"}
                  ></GraphOneLine>
                  <hr />
                  {/* <h5>Cotisation foncière des entreprises</h5>
            <GraphOneLine code={commune.COM} typeChart={'pcfe'}></GraphOneLine>
            <hr /> */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
