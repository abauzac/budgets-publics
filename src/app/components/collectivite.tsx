import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
} from "../utils/charts";
import GraphMultiLines from "./graphMultiLines";

export default function Collectivite() {
  const [departement, setDepartement] = useState("");
  const [listeCollectivites, setListeCollectivites] = useState<any[]>([]); // liste des collectivites du département sélectionné
  const [collectivite, setCollectivite] = useState<any>(null); // objet commune
  const [typeVue, setTypeVue] = useState<
    "global" | "budget" | "investissements" | "dette" | "fiscalite"
  >("global");
  const router = useRouter();

  function handleDepartementChange(event: any) {
    if(event.target.value === "") 
      return;
    let dep = event.target.value; // "06", "77", "2A"...
    // "06" => "6"
    if (dep.length === 2 && dep[0] === "0") {
      setDepartement(dep[1]);  
    }
    // "02A"
    else if (dep.length === 3 && dep.startsWith("02")) {
      setDepartement(dep);
    }
    // "971" => "101"
    else if (dep.length === 3 && dep.startsWith("97")) {
      setDepartement("10" + dep[2]);
    }
    else {
      setDepartement(dep);
    }
  }

  useEffect(() => {
    if (departement !== "") {
      const liste = (collectivites as any[])
        .map((c, i) => {
          c.index = i;
          return c;
        })
        .filter((collectivite, index) =>
          (collectivite.ndept as string) === departement
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
          <div className="grid">
            <select
              style={{ width: "300px", justifySelf: "center" }}
              name="departements"
              aria-label="Départements"
              onChange={handleDepartementChange}
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
              name="collectivites"
              aria-label="Collectivités"
              onChange={(event) => {
                setCollectivite(
                  (collectivites as any[])[parseInt(event.target.value)]
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
                    graphs={collFonctionnementProduitCharge}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Produits de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    graphs={collFonctionnementProduitListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    graphs={collFonctionnementChargeListe}
                  ></GraphMultiLines>
                </div>
              )}
              {typeVue === "investissements" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Budgets d'investissements pour la collectivité {collectivite.lbudg}
                  </h2>
                  <br />
                  <h5>Total des resources et dépenses d'investissement</h5>
                  <GraphMultiLines
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    graphs={collInvestissementResourcesEmplois}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Resources d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    graphs={collInvestissementsResourcesListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Dépenses d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    graphs={collInvestissementsEmploisListe}
                  ></GraphMultiLines>
                </div>
              )}
              {typeVue === "dette" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Dette et Capacité d'autofinancement pour la collectivité {" "}
                    {collectivite.lbudg}
                  </h2>
                  <br />

                  <h3>Dette</h3>
                  <h5>Encours total de la dette au 31 décembre N</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    typeChart={"entot"}
                  ></GraphOneLine>
                  <hr />

                  <h5>Annuité de la dette</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    typeChart={"antot"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Encours des dettes bancaires et assimilées</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    typeChart={"encdb"}
                  ></GraphOneLine>
                  <hr />
                  <h3>Autofinancement</h3>
                  <h5>Capacité d'autofinancement = CAF</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    typeChart={"caftot"}
                  ></GraphOneLine>
                  <hr />
                  <h5>CAF nette du remboursement en capital des emprunts</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
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
                    typeChart={"pth"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe foncière sur les propriétés bâties</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    typeChart={"pfb"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe foncière sur les propriétés non bâties</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
                    typeChart={"pfnb"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Potentiel fiscal</h5>
                  <GraphOneLine
                    collectivite={"collectivite"}
                    code={collectivite.siren}
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
