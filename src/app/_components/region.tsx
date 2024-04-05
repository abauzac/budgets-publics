"use client"

import { useEffect, useState } from "react";
import regions from "../../../public/json/regions.json";
import GraphOneLine from "./graphOneLine";
import {

  depFonctionnementProduitCharge,
  depInvestissementResourcesEmplois,
  depInvestissementsEmploisListe,
  depInvestissementsResourcesListe,
  regFonctionnementChargeListe,
  regFonctionnementProduitListe,
} from "../_utils/charts";
import GraphMultiLines from "./graphMultiLines";
import { useRouter, useSearchParams } from "next/navigation";

export default function Region() {
  const [regionCode, setRegionCode] = useState(""); // "01", "02", "03", ... "95
  const [region, setRegion] = useState<any>(null); // "01", "02", "03", ... "95
  const [typeVue, setTypeVue] = useState<
    "global" | "budget" | "investissements" | "dette" | "fiscalite"
  >("global");
  const params = useSearchParams();
  const router = useRouter();

  // on component mount
  useEffect(() => {
    if (params.get("region")) {
      setRegionCode(params.get("region") as string);
    }
  }, []);



  useEffect(() => {
    if (regionCode !== "") {
      setRegion(regions.find((d) => d.REG === regionCode));
    }
  }
  , [regionCode]);

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
          <h1 style={{textAlign: "center"}}>Comptabilité des régions</h1>
          <h4 style={{textAlign: "center"}}>Chiffres en milliers d'euro</h4>

          <div className="grid">
            <select
              style={{ width: "300px", justifySelf: "center" }}
              name="regions"
              aria-label="Régions"
              value={regionCode}
              onChange={(event) => {
                setRegionCode(event.target.value);
                router.push('/budgets/regions?region=' + event.target.value);
              }}
              required
            >
              <option value="">Régions</option>
              {regions.map((reg) => (
                <option key={reg.REG} value={reg.REG}>
                  {reg.REG} - {reg.NCCENR}
                </option>
              ))}
            </select>
          </div>
          {region && (
            <div>
              {typeVue === "global" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Vue globale pour la région {region.NCCENR}</h2>
                  <br />
                  <h5>Résultat d'ensemble</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    typeChart={"res"}
                  ></GraphOneLine>
                  <p>
                    Résultat d'ensemble = Résultat comptable + Besoin/Capacité
                    de financement section investissement
                  </p>
                  <hr />
                  <h5>Résultat comptable</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
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
                    collectivite={"region"}
                    code={region.REG}
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
                    Budget fonctionnel de la région {region.NCCENR}
                  </h2>
                  <br />
                  <h5>Total des produits et charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"region"}
                    code={region.REG}
                    graphs={depFonctionnementProduitCharge}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Produits de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"region"}
                    code={region.REG}
                    graphs={regFonctionnementProduitListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"region"}
                    code={region.REG}
                    graphs={regFonctionnementChargeListe}
                  ></GraphMultiLines>
                </div>
              )}
              {typeVue === "investissements" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Budgets d'investissements de la région{" "}
                    {region.NCCENR}
                  </h2>
                  <br />
                  <h5>Total des resources et dépenses d'investissement</h5>
                  <GraphMultiLines
                    collectivite={"region"}
                    code={region.REG}
                    graphs={depInvestissementResourcesEmplois}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Resources d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"region"}
                    code={region.REG}
                    graphs={depInvestissementsResourcesListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Dépenses d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"region"}
                    code={region.REG}
                    graphs={depInvestissementsEmploisListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Soldes des operations pour compte de tiers</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    typeChart={"soc"}
                  ></GraphOneLine>
                </div>
              )}
              {typeVue === "dette" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Dette et Capacité d'autofinancement de la région{" "}
                    {region.NCCENR}
                  </h2>
                  <br />

                  <h3>Fonds de roulement</h3>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    typeChart={"fdr"}
                  ></GraphOneLine>
                  <hr />

                  <h3>Dette</h3>
                  <h5>Encours total de la dette au 31 décembre N</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    typeChart={"dba"}
                  ></GraphOneLine>
                  <hr />

                  <h5>Annuité de la dette</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    typeChart={"adb"}
                  ></GraphOneLine>
                  <hr />

                  <h3>Autofinancement</h3>
                  <h5>Excédent brut d'exploitation</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    typeChart={"ebf"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Capacité d'autofinancement = CAF</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    typeChart={"caf"}
                  ></GraphOneLine>
                  <hr />
                  <h5>CAF nette du remboursement en capital des emprunts</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    typeChart={"cnr"}
                  ></GraphOneLine>
                  <hr />
                </div>
              )}
              {typeVue === "fiscalite" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Fiscalité de la région {region.NCCENR}</h2>
                  <br />
                  <h5>Imposition forfaitaire sur les entreprises de réseau</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    typeChart={"iferr"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe intérieure sur la consommation des produits énergétiques (TICPE)</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    typeChart={"tip"}
                  ></GraphOneLine>
                  <hr />
                  {/* <h5>Fraction de TVA</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    typeChart={"tvar"}
                  ></GraphOneLine>
                  <hr /> */}

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
