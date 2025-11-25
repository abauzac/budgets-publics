"use client";

import { useEffect, useState } from "react";
import departements from "../../../public/json/departements.json";
import {
  depFonctionnementChargeListe,
  depFonctionnementProduitCharge,
  depFonctionnementProduitListe,
  depInvestissementResourcesEmplois,
  depInvestissementsEmploisListe,
  depInvestissementsResourcesListe,
} from "../_utils/charts";
import { useRouter, useSearchParams } from "next/navigation";
import { generateYearsArray, getComptesForCommune, getDepartementData, getNomenclature, getUrlForComptaDepartement } from "../_utils/utils";
import GraphOneLineData from "./graphOneLineData";
import GraphMultiLinesData from "./graphMultiLinesData";
import { ModalProvider } from "../_contexts/ComptabiliteModalContext";
import TableauComptable from "./tableauComptable";
import Modal from "./comptabiliteModal";
import { BalanceCommuneInfos } from "../_utils/types";

export default function Departement() {
  const [departementCode, setDepartementCode] = useState(""); // "01", "02", "03", ... "95
  const [departement, setDepartement] = useState<any>(null);
  const [typeVue, setTypeVue] = useState<
    "global" | "budget" | "investissements" | "dette" | "fiscalite" | "comptabilite"
  >("global");
  const [prefix, setPrefix] = useState<string>("");
  const [dataDepartements, setDataDepartements] = useState<any[]>([]);
  const currentYear = (new Date()).getFullYear()
  const [comptaYear, setComptaYear] = useState<number>(currentYear-1);
  const [listeComptes, setListeComptes] = useState<BalanceCommuneInfos[]>([]);
  const [nomenclature, setNomenclature] = useState<any[]>([]);
  

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
      (async () => {
          const dataColl = await getDepartementData(departementCode);
          setDataDepartements(dataColl);
      })();
    }
  }, [departementCode]);
  
    useEffect(() => {
      if (typeVue === "comptabilite") {
        (async function GetComptes() {
          let codeCible = departementCode;
              if (codeCible.length != 3) codeCible = codeCible.padStart(3, "0");
        
              const urlFinale = getUrlForComptaDepartement(codeCible, comptaYear);
        
              let comptesDepartements: BalanceCommuneInfos[] = await getComptesForCommune(
                urlFinale
              );
              if (comptesDepartements.length == 0) {
                return;
              }
              setNomenclature(getNomenclature(comptesDepartements[0]));
              comptesDepartements.sort((cca, ccb) => cca.compte.localeCompare(ccb.compte));
              setListeComptes(comptesDepartements);
           /* } else if (collectivite == "region") {
              if (codeCible.length != 3) codeCible = codeCible.padStart(3, "0");
        
              const urlFinale = getUrlForComptaRegion(codeCible, year);
        
              let comptesRegions: BalanceCommuneInfos[] = await getComptesForCommune(
                urlFinale
              );
              if (comptesRegions.length == 0) {
                return;
              }
              setNomenclature(getNomenclature(comptesRegions[0]));
              comptesRegions.sort((cca, ccb) => cca.compte.localeCompare(ccb.compte));
              setListeComptes(comptesRegions);
            }*/
        })();
      }
    }, [typeVue, departementCode, comptaYear]);

  return (
    <>
        <div>
          <h1 style={{ textAlign: "center" }}>Comptabilité des départements</h1>

          <div className="grid">
            <div className="d-flex flex-column align-items-center">
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
              <select
                style={{ width: "300px", justifySelf: "center" }}
                value={typeVue}
                onChange={e => setTypeVue(e.target.value as typeof typeVue)}
                aria-label="Type de vue">
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
          {departement && (
            <div>
              {typeVue === "global" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Vue globale pour le département {departement.NCCENR}</h2>
                  <br />
                  <h5>Résultat d'ensemble</h5>
                  <GraphOneLineData
                    data={dataDepartements}
                    prefix={prefix}
                    dataProperty={"res"}
                  ></GraphOneLineData>
                  <p>
                    Résultat d'ensemble = Résultat comptable + Besoin/Capacité
                    de financement section investissement
                  </p>
                  <hr />
                  <h5>Résultat comptable</h5>
                  <GraphOneLineData
                    data={dataDepartements}
                    prefix={prefix}
                    dataProperty={"rec"}
                  ></GraphOneLineData>
                  <p>
                    Résultat comptable = Produits de fonctionnement - Charges de
                    fonctionnement
                  </p>
                  <hr />
                  <h5>
                    Besoin ou capacité de financement de la section
                    investissement
                  </h5>
                  <GraphOneLineData
                    data={dataDepartements}
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
                  <h2>
                    Budget fonctionnel du département {departement.NCCENR}
                  </h2>
                  <br />
                  <h5>Total des produits et charges de fonctionnement</h5>
                  <GraphMultiLinesData
                    data={dataDepartements}
                    prefix={prefix}
                    graphs={depFonctionnementProduitCharge}
                  ></GraphMultiLinesData>
                  <hr />
                  <h5>Produits de fonctionnement</h5>
                  <GraphMultiLinesData
                    data={dataDepartements}
                    prefix={prefix}
                    graphs={depFonctionnementProduitListe}
                  ></GraphMultiLinesData>
                  <hr />
                  <h5>Charges de fonctionnement</h5>
                  <GraphMultiLinesData
                    data={dataDepartements}
                    prefix={prefix}
                    graphs={depFonctionnementChargeListe}
                  ></GraphMultiLinesData>
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
                  <GraphMultiLinesData
                    data={dataDepartements}
                    prefix={prefix}
                    graphs={depInvestissementResourcesEmplois}
                  ></GraphMultiLinesData>
                  <hr />
                  <h5>Resources d'investissements</h5>
                  <GraphMultiLinesData
                    data={dataDepartements}
                    prefix={prefix}
                    graphs={depInvestissementsResourcesListe}
                  ></GraphMultiLinesData>
                  <hr />
                  <h5>Dépenses d'investissements</h5>
                  <GraphMultiLinesData
                    data={dataDepartements}
                    prefix={prefix}
                    graphs={depInvestissementsEmploisListe}
                  ></GraphMultiLinesData>
                  <hr />
                  <h5>Soldes des operations pour compte de tiers</h5>
                  <GraphOneLineData
                    data={dataDepartements}
                    prefix={prefix}
                    dataProperty={"soc"}
                  ></GraphOneLineData>
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
                  <GraphOneLineData
                    data={dataDepartements}
                    prefix={prefix}
                    dataProperty={"fdr"}
                  ></GraphOneLineData>
                  <hr />

                  <h3>Dette</h3>
                  <h5>Encours total de la dette au 31 décembre N</h5>
                  <GraphOneLineData
                    data={dataDepartements}
                    prefix={prefix}
                    dataProperty={"f1detd"}
                  ></GraphOneLineData>
                  <hr />

                  <h5>Annuité de la dette</h5>
                  <GraphOneLineData
                    data={dataDepartements}
                    prefix={prefix}
                    dataProperty={"adb"}
                  ></GraphOneLineData>
                  <hr />

                  <h3>Autofinancement</h3>
                  <h5>Excédent brut d'exploitation</h5>
                  <GraphOneLineData
                    data={dataDepartements}
                    prefix={prefix}
                    dataProperty={"ebf"}
                  ></GraphOneLineData>
                  <hr />
                  <h5>Capacité d'autofinancement = CAF</h5>
                  <GraphOneLineData
                    data={dataDepartements}
                    prefix={prefix}
                    dataProperty={"caf"}
                  ></GraphOneLineData>
                  <hr />
                  <h5>CAF nette du remboursement en capital des emprunts</h5>
                  <GraphOneLineData
                    data={dataDepartements}
                    prefix={prefix}
                    dataProperty={"cnr"}
                  ></GraphOneLineData>
                  <hr />
                </div>
              )}
              {typeVue === "fiscalite" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Fiscalité du département {departement.NCCENR}</h2>
                  <br />
                  <h5>Cotisation Valeur Ajoutée des Entreprises</h5>
                  <GraphOneLineData
                    data={dataDepartements}
                    prefix={prefix}
                    dataProperty={"cvaed"}
                  ></GraphOneLineData>
                  <hr />
                  <h5>Fraction de TVA</h5>
                  <GraphOneLineData
                    data={dataDepartements}
                    prefix={prefix}
                    dataProperty={"tvad"}
                  ></GraphOneLineData>

                  {/* <h5>Cotisation foncière des entreprises</h5>
            <GraphOneLine code={departement.DEP} typeChart={'pcfe'}></GraphOneLine>
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
                    {generateYearsArray().map(year => <option key={`yr${year}`} value={year}>{year}</option>)}
                  </select>
                  <br />
                  <ModalProvider>

                    <TableauComptable
                        listeComptes={listeComptes}
                        nomenclature={nomenclature}
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
