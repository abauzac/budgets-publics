import { useEffect, useState } from "react";
import departements from "../../../public/json/departements.json";
import GraphOneLine from "./graphOneLine";
import {
  communeFonctionnementChargeListe,
  communeFonctionnementProduitCharge,
  communeFonctionnementProduitListe,
  communeInvestissementResourcesEmplois,
  communeInvestissementsEmploisListe,
  communeInvestissementsResourcesListe,
} from "../utils/charts";
import GraphMultiLines from "./graphMultiLines";

export default function Departement() {
  const [departementCode, setDepartementCode] = useState(""); // "01", "02", "03", ... "95
  const [departement, setDepartement] = useState(null); // "01", "02", "03", ... "95
  const [typeVue, setTypeVue] = useState<
    "global" | "budget" | "investissements" | "dette" | "fiscalite"
  >("global");
  useEffect(() => {
    if (departementCode !== "") {
      setDepartement(departements.find((d) => d.DEP === departementCode));
    }
  }
  , [departementCode]);

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
          <div className="grid">
            <select
              style={{ width: "300px", justifySelf: "center" }}
              name="departements"
              aria-label="Départements"
              onChange={(event) => {
                setDepartementCode(event.target.value);
              }}
              required
            >
              <option value="">Départements</option>
              {departements.map((departement) => (
                <option key={departement.DEP} value={departement.DEP}>
                  {departement.DEP} - {departement.NCCENR}
                </option>
              ))}
            </select>
          </div>
          {departement && (
            <div>
              {typeVue === "global" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Vue globale pour le département {departement.NCCENR}</h2>
                  <br />
                  <h5>Résultat d'ensemble</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"res"}
                  ></GraphOneLine>
                  <p>
                    Résultat d'ensemble = Résultat comptable + Besoin/Capacité
                    de financement section investissement
                  </p>
                  <hr />
                  <h5>Résultat comptable</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"rec"}
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
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"bfi"}
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
                    Budget fonctionnel du département {departement.NCCENR}
                  </h2>
                  <br />
                  <h5>Total des produits et charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"departement"}
                    code={departement.DEP}
                    graphs={communeFonctionnementProduitCharge}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Produits de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"departement"}
                    code={departement.DEP}
                    graphs={communeFonctionnementProduitListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"departement"}
                    code={departement.DEP}
                    graphs={communeFonctionnementChargeListe}
                  ></GraphMultiLines>
                </div>
              )}
              {typeVue === "investissements" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Investissements et resources d'investissement du département{" "}
                    {departement.NCCENR}
                  </h2>
                  <br />
                  <h5>Total des resources et dépenses d'investissement</h5>
                  <GraphMultiLines
                    collectivite={"departement"}
                    code={departement.DEP}
                    graphs={communeInvestissementResourcesEmplois}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Resources d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"departement"}
                    code={departement.DEP}
                    graphs={communeInvestissementsResourcesListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Dépenses d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"departement"}
                    code={departement.DEP}
                    graphs={communeInvestissementsEmploisListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Soldes des operations pour compte de tiers</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"solde"}
                  ></GraphOneLine>
                </div>
              )}
              {typeVue === "dette" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Dette et Capacité d'autofinancement du département{" "}
                    {departement.NCCENR}
                  </h2>
                  <br />

                  <h3>Fonds de roulement</h3>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"fdr"}
                  ></GraphOneLine>
                  <hr />

                  <h3>Dette</h3>
                  <h5>Encours total de la dette au 31 décembre N</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"dette"}
                  ></GraphOneLine>
                  <hr />

                  <h5>Annuité de la dette</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"annu"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Avance du trésor</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"avance"}
                  ></GraphOneLine>
                  <hr />
                  <h3>Autofinancement</h3>
                  <h5>Excédent brut d'exploitation</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"ebf"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Capacité d'autofinancement = CAF</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"caf"}
                  ></GraphOneLine>
                  <hr />
                  <h5>CAF nette du remboursement en capital des emprunts</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"cafn"}
                  ></GraphOneLine>
                  <hr />
                </div>
              )}
              {typeVue === "fiscalite" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Fiscalité du département {departement.NCCENR}</h2>
                  <br />
                  <h5>Taxe d'habitation</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"pth"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe foncière sur les propriétés bâties</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"pfb"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe foncière sur les propriétés non bâties</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"pfnb"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Potentiel fiscal</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    typeChart={"potfis"}
                  ></GraphOneLine>
                  <hr />
                  {/* <h5>Cotisation foncière des entreprises</h5>
            <GraphOneLine code={departement.DEP} typeChart={'pcfe'}></GraphOneLine>
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
