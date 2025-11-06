"use client";

import { useEffect, useState } from "react";
import departements from "../../../public/json/departements.json";
import communes from "../../../public/json/communes.json";
import {
  GraphTypeVueGlobalCommune,
  communeFonctionnementChargeListe,
  communeFonctionnementProduitCharge,
  communeFonctionnementProduitListe,
  communeInvestissementResourcesEmplois,
  communeInvestissementsEmploisListe,
  communeInvestissementsResourcesListe,
} from "../_utils/charts";
import { useRouter, useSearchParams } from "next/navigation";
import TableauComptable from "./tableauComptable";
import { generateYearsArray, getCommunesData } from "../_utils/utils";
import { ModalProvider } from "../_contexts/ComptabiliteModalContext";
import Modal from "./comptabiliteModal";
import GraphOneLineData from "./graphOneLineData";
import GraphMultiLinesData from "./graphMultiLinesData";

export default function Communes() {
  const [departement, setDepartement] = useState(""); // "01", "02", "03", ... "95
  const [listeCommunes, setListeCommunes] = useState<any[]>([]); // liste des communes du département sélectionné
  const [commune, setCommune] = useState<any>(null); // objet commune
  const [dataCommunes, setDataCommunes] = useState<any[]>([]);
  const [prefix, setPrefix] = useState<string>("");
  const [suffix, setSuffix] = useState<string>("");
  const currentYear = (new Date()).getFullYear()
  const [comptaYear, setComptaYear] = useState<number>(currentYear-1);
  const [typeVue, setTypeVue] = useState<
    | "global"
    | "budget"
    | "investissements"
    | "dette"
    | "fiscalite"
    | "comptabilite"
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
    if (commune !== null && departement !== "") {
      (async () => {
        const data = await getCommunesData(
          commune.COM.replace(departement, ""),
          departement
        );
        setDataCommunes(data);
      })();
    }
  }, [commune, departement]);

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
        <div>
          <h1 style={{ textAlign: "center" }}>Comptabilité des communes</h1>

          <div className="grid">
            <div className="d-flex flex-column align-items-center">
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

            {typeVue !== "comptabilite" && (
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
            )}
          </div>
          {commune && (
            <div>
              {typeVue === "global" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Vue globale pour la commune de {commune.NCCENR}</h2>
                  <br />
                  <h5>Résultat d'ensemble</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={GraphTypeVueGlobalCommune.ResultatEnsemble}
                    prefix={prefix}
                    suffix={suffix}
                  ></GraphOneLineData>
                  <p>
                    Résultat d'ensemble = Résultat comptable + Besoin/Capacité
                    de financement section investissement
                  </p>
                  <hr />
                  <h5>Résultat comptable</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={prefix + GraphTypeVueGlobalCommune.ResultatComptable}
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
                    data={dataCommunes}
                    dataProperty={
                      prefix + GraphTypeVueGlobalCommune.BesoinFinancementInvestissement
                    }
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
                    Budget fonctionnel pour la commune de {commune.NCCENR}
                  </h2>
                  <br />
                  <h5>Total des produits et charges de fonctionnement</h5>
                  <GraphMultiLinesData
                    data={dataCommunes}
                    prefix={prefix}
                    graphs={communeFonctionnementProduitCharge}
                  ></GraphMultiLinesData>
                  <hr />
                  <h5>Produits de fonctionnement</h5>
                  <GraphMultiLinesData
                    data={dataCommunes}
                    prefix={prefix}
                    graphs={communeFonctionnementProduitListe}
                  ></GraphMultiLinesData>
                  <hr />
                  <h5>Charges de fonctionnement</h5>
                  <GraphMultiLinesData
                    data={dataCommunes}
                    prefix={prefix}
                    graphs={communeFonctionnementChargeListe}
                  ></GraphMultiLinesData>
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
                  <GraphMultiLinesData
                    data={dataCommunes}
                    prefix={prefix}
                    graphs={communeInvestissementResourcesEmplois}
                  ></GraphMultiLinesData>
                  <hr />
                  <h5>Resources d'investissements</h5>
                  <GraphMultiLinesData
                    data={dataCommunes}
                    prefix={prefix}
                    graphs={communeInvestissementsResourcesListe}
                  ></GraphMultiLinesData>
                  <hr />
                  <h5>Dépenses d'investissements</h5>
                  <GraphMultiLinesData
                    data={dataCommunes}
                    prefix={prefix}
                    graphs={communeInvestissementsEmploisListe}
                  ></GraphMultiLinesData>
                  <hr />
                  <h5>Soldes des operations pour compte de tiers</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={"solde"}
                    prefix={prefix}
                  ></GraphOneLineData>
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
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={"fdr"}
                    prefix={prefix}
                  ></GraphOneLineData>
                  <hr />

                  <h3>Dette</h3>
                  <h5>Encours total de la dette au 31 décembre N</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    prefix={prefix}
                    dataProperty={"dette"}
                  ></GraphOneLineData>
                  <hr />

                  <h5>Annuité de la dette</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={"annu"}
                    prefix={prefix}
                  ></GraphOneLineData>
                  <hr />
                  <h5>Avance du trésor</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={"avance"}
                    prefix={prefix}
                  ></GraphOneLineData>
                  <hr />
                  <h3>Autofinancement</h3>
                  <h5>Excédent brut d'exploitation</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={"ebf"}
                    prefix={prefix}
                  ></GraphOneLineData>
                  <hr />
                  <h5>Capacité d'autofinancement = CAF</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={"caf"}
                    prefix={prefix}
                  ></GraphOneLineData>
                  <hr />
                  <h5>CAF nette du remboursement en capital des emprunts</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={"cafn"}
                    prefix={prefix}
                  ></GraphOneLineData>
                  <hr />
                </div>
              )}
              {typeVue === "fiscalite" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Fiscalité pour la commune de {commune.NCCENR}</h2>
                  <br />
                  <h5>Taxe d'habitation</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={"pth"}
                    prefix={prefix}
                  ></GraphOneLineData>
                  <hr />
                  <h5>Taxe foncière sur les propriétés bâties</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={"pfb"}
                    prefix={prefix}
                  ></GraphOneLineData>
                  <hr />
                  <h5>Taxe foncière sur les propriétés non bâties</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={"pfnb"}
                    prefix={prefix}
                  ></GraphOneLineData>
                  <hr />
                  <h5>Potentiel fiscal</h5>
                  <GraphOneLineData
                    data={dataCommunes}
                    dataProperty={"potfis"}
                    prefix={prefix}
                  ></GraphOneLineData>
                  <hr />
                  {/* <h5>Cotisation foncière des entreprises</h5>
            <GraphOneLine code={commune.COM} typeChart={'pcfe'}></GraphOneLine>
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
                    collectivite={"commune"}
                    codeCible={commune.COM}
                    codeParent={departement}
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
