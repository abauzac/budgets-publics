"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import departements from "../../../public/json/departements.json";
import collectivites from "../../../public/json/collectivites.json";
import GraphOneLine from "./graphOneLine";
import {
  collFonctionnementChargeListe,
  collFonctionnementProduitCharge,
  collFonctionnementProduitListe,
  collInvestissementResourcesEmplois,
  collInvestissementsEmploisListe,
  collInvestissementsResourcesListe,
} from "../_utils/charts";
import GraphMultiLines from "./graphMultiLines";
import {
  extractDepCodeFromCollectiviteDept,
  transformDepCodeToCollectiviteDept,
} from "../_utils/utils";

export default function Collectivite() {
  const [departement, setDepartement] = useState("");
  const [listeCollectivites, setListeCollectivites] = useState<any[]>([]); // liste des collectivites du département sélectionné
  const [collectivite, setCollectivite] = useState<any>(null); // objet collectivite
  const [typeVue, setTypeVue] = useState<
    "global" | "budget" | "investissements" | "dette" | "fiscalite"
  >("global");
  const [suffix, setSuffix] = useState<string>("");
  const router = useRouter();
  const params = useSearchParams();

  // on component mount
  useEffect(() => {
    const paramColl = params.get("collectivite");
    if (paramColl !== null) {
      //debugger;
      const collIndex = (collectivites as any[]).findIndex(
        (c) => c.siren === paramColl
      );
      if (collIndex !== -1) {
        const collFound = (collectivites as any[])[collIndex];
        collFound.index = collIndex;
        setCollectivite(collFound);

        const codeDep = extractDepCodeFromCollectiviteDept(collFound.ndept);

        const dep = departements.find((d) => d.DEP === codeDep);
        if (dep) {
          setDepartement(dep.DEP);
          setListeCollectivites(
            (collectivites as any[])
              .map((c, i) => {
                c.index = i;
                return c;
              })
              .filter(
                (coll, index) => (coll.ndept as string) === collFound.ndept
              )
          );
        }
      }
    }
  }, []);

  useEffect(() => {
    if (departement !== "") {
      const depCode = transformDepCodeToCollectiviteDept(departement);
      const liste = (collectivites as any[])
        .map((c, i) => {
          c.index = i;
          return c;
        })
        .filter(
          (collectivite, index) => (collectivite.ndept as string) === depCode
        );
      setListeCollectivites(liste);
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
          <h1 style={{ textAlign: "center" }}>
            Comptabilité des collectivités inter-urbaines
          </h1>

          <div className="grid">
            <div className="d-flex flex-column align-items-center">
              <select
                style={{ width: "300px", justifySelf: "center" }}
                name="departements"
                aria-label="Départements"
                onChange={(event) => {
                  setDepartement(event.target.value);
                }}
                value={departement}
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
                name="collectivites"
                aria-label="Collectivités"
                value={collectivite ? collectivite.index : ""}
                onChange={(event) => {
                  setCollectivite(
                    (collectivites as any[])[parseInt(event.target.value)]
                  );
                  router.push(
                    "/budgets/collectivites?collectivite=" +
                      (collectivites as any[])[parseInt(event.target.value)]
                        .siren
                  );
                }}
                required
              >
                <option value="">Collectivités</option>
                {listeCollectivites.length > 0 &&
                  listeCollectivites.map((coll) => (
                    <option key={coll.siren} value={coll.index}>
                      {coll.lbudg}
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
                  checked={suffix == ""}
                  onClick={(e) => setSuffix("")}
                />
                Total en milliers d'euros
              </label>

              <label>
                <input
                  type="radio"
                  id="ratio"
                  name="prefix"
                  checked={suffix == "hab"}
                  onClick={(e) => setSuffix("hab")}
                />
                Euros par habitant
              </label>

            </fieldset>
          </div>
          {collectivite && (
            <div>
              {typeVue === "global" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Vue globale pour la collectivité {collectivite.lbudg}</h2>
                  {/* <br />
                  <h5>Résultat d'ensemble</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    typeChart={GraphTypeVueGlobalCommune.ResultatEnsemble}
                  ></GraphOneLine>
                  <p>
                    Résultat d'ensemble = Résultat comptable + Besoin/Capacité
                    de financement section investissement
                  </p>
                  <hr /> */}
                  <h5>Résultat comptable</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    typeChart={"rtot"}
                  ></GraphOneLine>
                  <p>
                    Résultat comptable = Produits de fonctionnement - Charges de
                    fonctionnement
                  </p>
                  <hr />
                  {/* <h5>
                    Besoin ou capacité de financement de la section
                    investissement
                  </h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    typeChart={
                      GraphTypeVueGlobalCommune.BesoinFinancementInvestissement
                    }
                  ></GraphOneLine>
                  <p>
                    Besoin/Capa de fi. des inv. = Resources d'investissements -
                    Emplois d'investissement + solde des opérations compte de
                    tiers
                  </p> */}
                </div>
              )}
              {typeVue === "budget" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Budget fonctionnel pour la collectivité {collectivite.lbudg}
                  </h2>
                  <br />
                  <h5>Total des produits et charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    graphs={collFonctionnementProduitCharge}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Produits de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    graphs={collFonctionnementProduitListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    graphs={collFonctionnementChargeListe}
                  ></GraphMultiLines>
                </div>
              )}
              {typeVue === "investissements" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Budgets d'investissements pour la collectivité{" "}
                    {collectivite.lbudg}
                  </h2>
                  <br />
                  <h5>Total des resources et dépenses d'investissement</h5>
                  <GraphMultiLines
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    graphs={collInvestissementResourcesEmplois}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Resources d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    graphs={collInvestissementsResourcesListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Dépenses d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    graphs={collInvestissementsEmploisListe}
                  ></GraphMultiLines>
                </div>
              )}
              {typeVue === "dette" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Dette et Capacité d'autofinancement pour la collectivité{" "}
                    {collectivite.lbudg}
                  </h2>
                  <br />

                  <h3>Dette</h3>
                  <h5>Encours total de la dette au 31 décembre N</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    typeChart={"entot"}
                  ></GraphOneLine>
                  <hr />

                  <h5>Annuité de la dette</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    typeChart={"antot"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Encours des dettes bancaires et assimilées</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    typeChart={"encdb"}
                  ></GraphOneLine>
                  <hr />
                  <h3>Autofinancement</h3>
                  <h5>Capacité d'autofinancement = CAF</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    typeChart={"caftot"}
                  ></GraphOneLine>
                  <hr />
                  <h5>CAF nette du remboursement en capital des emprunts</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    typeChart={"cafntot"}
                  ></GraphOneLine>
                  <hr />
                </div>
              )}
              {typeVue === "fiscalite" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Fiscalité pour la commune de {collectivite.lbudg}</h2>
                  <br />
                  <h5>Taxe d'habitation</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    typeChart={"pth"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe foncière sur les propriétés bâties</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    typeChart={"pfb"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe foncière sur les propriétés non bâties</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    suffix={suffix}
                    typeChart={"pfnb"}
                  ></GraphOneLine>
                  {/* <hr />
                  <h5>Taxe professionnelle (fiscalité additionnelle)</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    typeChart={"ptp1"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe professionnelle (TPU ou TP de zones)</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    typeChart={"ptp1"}
                  ></GraphOneLine>
                  <hr /> */}
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
