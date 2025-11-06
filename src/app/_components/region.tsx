"use client";

import { useEffect, useState } from "react";
import regions from "../../../public/json/regions.json";
import {
  depFonctionnementProduitCharge,
  depInvestissementResourcesEmplois,
  depInvestissementsEmploisListe,
  depInvestissementsResourcesListe,
  regFonctionnementChargeListe,
  regFonctionnementProduitListe,
} from "../_utils/charts";
import { useRouter, useSearchParams } from "next/navigation";
import { generateYearsArray, getRegionData } from "../_utils/utils";
import { ModalProvider } from "../_contexts/ComptabiliteModalContext";
import TableauComptable from "./tableauComptable";
import Modal from "./comptabiliteModal";
import GraphOneLineData from "./graphOneLineData";
import GraphMultiLinesData from "./graphMultiLinesData";

export default function Region() {
  const [regionCode, setRegionCode] = useState(""); // "01", "02", "03", ... "95
  const [region, setRegion] = useState<any>(null); // "01", "02", "03", ... "95
  const [typeVue, setTypeVue] = useState<
    "global" | "budget" | "investissements" | "dette" | "fiscalite" | "comptabilite"
  >("global");
  const [prefix, setPrefix] = useState<string>("");
  const [dataRegions, setDataRegions] = useState<any[]>([]);
  const currentYear = new Date().getFullYear();
  const [comptaYear, setComptaYear] = useState<number>(currentYear - 1);
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
      (async () => {
          const dataColl = await getRegionData(regionCode);
          setDataRegions(dataColl);
      })();
    }
  }, [regionCode]);

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Comptabilité des régions</h1>

        <div className="grid">
          <div className="d-flex flex-column align-items-center">
            <select
              style={{ width: "300px", justifySelf: "center" }}
              name="regions"
              aria-label="Régions"
              value={regionCode}
              onChange={(event) => {
                setRegionCode(event.target.value);
                router.push("/budgets/regions?region=" + event.target.value);
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
            <select
              style={{ width: "300px", justifySelf: "center" }}
              value={typeVue}
              onChange={(e) => setTypeVue(e.target.value as typeof typeVue)}
              aria-label="Type de vue"
            >
              <option value="global">Vue globale</option>
              <option value="budget">Budget fonctionnel</option>
              <option value="investissements">Investissements</option>
              <option value="dette">Dette</option>
              <option value="fiscalite">Fiscalité</option>
              <option value="comptabilite">Comptabilité</option>
            </select>
          </div>
          <fieldset className="d-flex flex-column align-items-center justify-content-center">
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
        {region && (
          <div>
            {typeVue === "global" && (
              <div style={{ textAlign: "center" }}>
                <h2>Vue globale pour la région {region.NCCENR}</h2>
                <br />
                <h5>Résultat d'ensemble</h5>
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"res"}
                ></GraphOneLineData>
                <p>
                  Résultat d'ensemble = Résultat comptable + Besoin/Capacité de
                  financement section investissement
                </p>
                <hr />
                <h5>Résultat comptable</h5>
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"rec"}
                ></GraphOneLineData>
                <p>
                  Résultat comptable = Produits de fonctionnement - Charges de
                  fonctionnement
                </p>
                <hr />
                <h5>
                  Besoin ou capacité de financement de la section investissement
                </h5>
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"bfi"}
                ></GraphOneLineData>
                <p>
                  Besoin/Capa de fi. des inv. = Resources d'investissements -
                  Emplois d'investissement + solde des opérations compte de
                  tiers
                </p>
              </div>
            )}
            {typeVue === "budget" && (
              <div style={{ textAlign: "center" }}>
                <h2>Budget fonctionnel de la région {region.NCCENR}</h2>
                <br />
                <h5>Total des produits et charges de fonctionnement</h5>
                <GraphMultiLinesData
                  data={dataRegions}
                  prefix={prefix}
                  graphs={depFonctionnementProduitCharge}
                ></GraphMultiLinesData>
                <hr />
                <h5>Produits de fonctionnement</h5>
                <GraphMultiLinesData
                  data={dataRegions}
                  prefix={prefix}
                  graphs={regFonctionnementProduitListe}
                ></GraphMultiLinesData>
                <hr />
                <h5>Charges de fonctionnement</h5>
                <GraphMultiLinesData
                  data={dataRegions}
                  prefix={prefix}
                  graphs={regFonctionnementChargeListe}
                ></GraphMultiLinesData>
              </div>
            )}
            {typeVue === "investissements" && (
              <div style={{ textAlign: "center" }}>
                <h2>Budgets d'investissements de la région {region.NCCENR}</h2>
                <br />
                <h5>Total des resources et dépenses d'investissement</h5>
                <GraphMultiLinesData
                  data={dataRegions}
                  prefix={prefix}
                  graphs={depInvestissementResourcesEmplois}
                ></GraphMultiLinesData>
                <hr />
                <h5>Resources d'investissements</h5>
                <GraphMultiLinesData
                  data={dataRegions}
                  prefix={prefix}
                  graphs={depInvestissementsResourcesListe}
                ></GraphMultiLinesData>
                <hr />
                <h5>Dépenses d'investissements</h5>
                <GraphMultiLinesData
                  data={dataRegions}
                  prefix={prefix}
                  graphs={depInvestissementsEmploisListe}
                ></GraphMultiLinesData>
                <hr />
                <h5>Soldes des operations pour compte de tiers</h5>
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"soc"}
                ></GraphOneLineData>
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
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"fdr"}
                ></GraphOneLineData>
                <hr />

                <h3>Dette</h3>
                <h5>Encours total de la dette au 31 décembre N</h5>
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"dba"}
                ></GraphOneLineData>
                <hr />

                <h5>Annuité de la dette</h5>
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"adb"}
                ></GraphOneLineData>
                <hr />

                <h3>Autofinancement</h3>
                <h5>Excédent brut d'exploitation</h5>
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"ebf"}
                ></GraphOneLineData>
                <hr />
                <h5>Capacité d'autofinancement = CAF</h5>
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"caf"}
                ></GraphOneLineData>
                <hr />
                <h5>CAF nette du remboursement en capital des emprunts</h5>
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"cnr"}
                ></GraphOneLineData>
                <hr />
              </div>
            )}
            {typeVue === "fiscalite" && (
              <div style={{ textAlign: "center" }}>
                <h2>Fiscalité de la région {region.NCCENR}</h2>
                <br />
                <h5>Imposition forfaitaire sur les entreprises de réseau</h5>
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"iferr"}
                ></GraphOneLineData>
                <hr />
                <h5>
                  Taxe intérieure sur la consommation des produits énergétiques
                  (TICPE)
                </h5>
                <GraphOneLineData
                  data={dataRegions}
                  prefix={prefix}
                  dataProperty={"tip"}
                ></GraphOneLineData>
                <hr />
                {/* <h5>Fraction de TVA</h5>
                  <GraphOneLine
                    collectivite={"region"}
                    code={region.REG}
                    dataProperty={"tvar"}
                  ></GraphOneLine>
                  <hr /> */}

                {/* <h5>Cotisation foncière des entreprises</h5>
            <GraphOneLine code={departement.DEP} dataProperty={'pcfe'}></GraphOneLine>
            <hr /> */}
              </div>
            )}
            {typeVue === "comptabilite" && (
              <div style={{ textAlign: "center" }}>
                <h2>Comptabilité</h2>
                <select
                  style={{ width: "300px", justifySelf: "center" }}
                  name="comptaYear"
                  aria-label="Année"
                  value={comptaYear}
                  onChange={(event) => {
                    setComptaYear(parseInt(event.target.value));
                  }}
                  required
                >
                  {generateYearsArray().map((year) => (
                    <option key={`yr${year}`} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <br />
                <ModalProvider>
                  <TableauComptable
                    collectivite={"region"}
                    codeCible={region.REG}
                    codeParent={""}
                    year={comptaYear}
                  ></TableauComptable>
                  <Modal />
                </ModalProvider>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
