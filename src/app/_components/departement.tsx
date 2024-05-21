"use client";

import { useEffect, useState } from "react";
import departements from "../../../public/json/departements.json";
import GraphOneLine from "./graphOneLine";
import {
  depFonctionnementChargeListe,
  depFonctionnementProduitCharge,
  depFonctionnementProduitListe,
  depInvestissementResourcesEmplois,
  depInvestissementsEmploisListe,
  depInvestissementsResourcesListe,
} from "../_utils/charts";
import GraphMultiLines from "./graphMultiLines";
import { useRouter, useSearchParams } from "next/navigation";

export default function Departement() {
  const [departementCode, setDepartementCode] = useState(""); // "01", "02", "03", ... "95
  const [departement, setDepartement] = useState<any>(null);
  const [typeVue, setTypeVue] = useState<
    "global" | "budget" | "investissements" | "dette" | "fiscalite"
  >("global");
  const [prefix, setPrefix] = useState<string>("");

  const params = useSearchParams();
  const router = useRouter();

  // on component mount
  useEffect(() => {
    if (params.get("departement")) {
      setDepartementCode(params.get("departement") as string);
    }
  }, []);

  useEffect(() => {
    if (departementCode !== "") {
      setDepartement(departements.find((d) => d.DEP === departementCode));
    }
  }, [departementCode]);

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
          <h1 style={{ textAlign: "center" }}>Comptabilité des départements</h1>

          <div className="grid">
            <div className="d-flex justify-content-center">
              <select
                style={{ width: "300px", "height": 'fit-content' }}
                name="departements"
                aria-label="Départements"
                value={departementCode}
                onChange={(event) => {
                  setDepartementCode(event.target.value);
                  router.push(
                    `/budgets/departements?departement=${event.target.value}`
                  );
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
            <fieldset className="d-flex flex-column align-items-center">
              <label>
                <input
                  type="radio"
                  id="ratio"
                  name="prefix"
                  defaultChecked={prefix == ""}
                  onClick={(e) => setPrefix("")}
                />
                Total en milliers d'euros
              </label>

              <label>
                <input
                  type="radio"
                  id="ratio"
                  name="prefix"
                  defaultChecked={prefix == "f"}
                  onClick={(e) => setPrefix("f")}
                />
                Euros par habitant
              </label>

              <label>
                <input
                  type="radio"
                  id="strate"
                  name="prefix"
                  defaultChecked={prefix == "m"}
                  onClick={(e) => setPrefix("m")}
                />
                Comparé à la strate
              </label>
            </fieldset>
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
                    prefix={prefix}
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
                    prefix={prefix}
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
                    prefix={prefix}
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
                    prefix={prefix}
                    graphs={depFonctionnementProduitCharge}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Produits de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    graphs={depFonctionnementProduitListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    graphs={depFonctionnementChargeListe}
                  ></GraphMultiLines>
                </div>
              )}
              {typeVue === "investissements" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Budgets d'investissements du département{" "}
                    {departement.NCCENR}
                  </h2>
                  <br />
                  <h5>Total des resources et dépenses d'investissement</h5>
                  <GraphMultiLines
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    graphs={depInvestissementResourcesEmplois}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Resources d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    graphs={depInvestissementsResourcesListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Dépenses d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    graphs={depInvestissementsEmploisListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Soldes des operations pour compte de tiers</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    typeChart={"soc"}
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
                    prefix={prefix}
                    typeChart={"fdr"}
                  ></GraphOneLine>
                  <hr />

                  <h3>Dette</h3>
                  <h5>Encours total de la dette au 31 décembre N</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    typeChart={"f1detd"}
                  ></GraphOneLine>
                  <hr />

                  <h5>Annuité de la dette</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    typeChart={"adb"}
                  ></GraphOneLine>
                  <hr />

                  <h3>Autofinancement</h3>
                  <h5>Excédent brut d'exploitation</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    typeChart={"ebf"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Capacité d'autofinancement = CAF</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    typeChart={"caf"}
                  ></GraphOneLine>
                  <hr />
                  <h5>CAF nette du remboursement en capital des emprunts</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    typeChart={"cnr"}
                  ></GraphOneLine>
                  <hr />
                </div>
              )}
              {typeVue === "fiscalite" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Fiscalité du département {departement.NCCENR}</h2>
                  <br />
                  <h5>Cotisation Valeur Ajoutée des Entreprises</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    typeChart={"cvaed"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Fraction de TVA</h5>
                  <GraphOneLine
                    collectivite={"departement"}
                    code={departement.DEP}
                    prefix={prefix}
                    typeChart={"tvad"}
                  ></GraphOneLine>

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
