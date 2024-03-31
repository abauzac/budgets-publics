import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import departements from "../../../public/json/departements.json";
import collectivites from "../../../public/json/collectivites.json";
import GraphOneLine from "./graphOneLine";
import {
  GraphTypeVueGlobalCommune,
  communeFonctionnementChargeListe,
  communeFonctionnementProduitCharge,
  communeFonctionnementProduitListe,
  communeInvestissementResourcesEmplois,
  communeInvestissementsEmploisListe,
  communeInvestissementsResourcesListe,
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
    // "2A" => "02A"
    else if (dep.length === 2) {
      setDepartement("0" + dep);
    }
    // "971" => "101"
    else if (dep.length === 3) {
      setDepartement("10" + dep[2]);
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
                  <h2>Vue globale pour la commune de {collectivite.NCCENR}</h2>
                  <br />
                  <h5>Résultat d'ensemble</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
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
                    code={collectivite.COM}
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
                    code={collectivite.COM}
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
                    Budget fonctionnel pour la commune de {collectivite.NCCENR}
                  </h2>
                  <br />
                  <h5>Total des produits et charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={collectivite.COM}
                    graphs={communeFonctionnementProduitCharge}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Produits de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={collectivite.COM}
                    graphs={communeFonctionnementProduitListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Charges de fonctionnement</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={collectivite.COM}
                    graphs={communeFonctionnementChargeListe}
                  ></GraphMultiLines>
                </div>
              )}
              {typeVue === "investissements" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Investissements et resources d'investissement pour la
                    commune de {collectivite.NCCENR}
                  </h2>
                  <br />
                  <h5>Total des resources et dépenses d'investissement</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={collectivite.COM}
                    graphs={communeInvestissementResourcesEmplois}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Resources d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={collectivite.COM}
                    graphs={communeInvestissementsResourcesListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Dépenses d'investissements</h5>
                  <GraphMultiLines
                    collectivite={"commune"}
                    code={collectivite.COM}
                    graphs={communeInvestissementsEmploisListe}
                  ></GraphMultiLines>
                  <hr />
                  <h5>Soldes des operations pour compte de tiers</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
                    typeChart={"solde"}
                  ></GraphOneLine>
                </div>
              )}
              {typeVue === "dette" && (
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Dette et Capacité d'autofinancement pour la commune de{" "}
                    {collectivite.NCCENR}
                  </h2>
                  <br />

                  <h3>Fonds de roulement</h3>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
                    typeChart={"fdr"}
                  ></GraphOneLine>
                  <hr />

                  <h3>Dette</h3>
                  <h5>Encours total de la dette au 31 décembre N</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
                    typeChart={"dette"}
                  ></GraphOneLine>
                  <hr />

                  <h5>Annuité de la dette</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
                    typeChart={"annu"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Avance du trésor</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
                    typeChart={"avance"}
                  ></GraphOneLine>
                  <hr />
                  <h3>Autofinancement</h3>
                  <h5>Excédent brut d'exploitation</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
                    typeChart={"ebf"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Capacité d'autofinancement = CAF</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
                    typeChart={"caf"}
                  ></GraphOneLine>
                  <hr />
                  <h5>CAF nette du remboursement en capital des emprunts</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
                    typeChart={"cafn"}
                  ></GraphOneLine>
                  <hr />
                </div>
              )}
              {typeVue === "fiscalite" && (
                <div style={{ textAlign: "center" }}>
                  <h2>Fiscalité pour la commune de {collectivite.NCCENR}</h2>
                  <br />
                  <h5>Taxe d'habitation</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
                    typeChart={"pth"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe foncière sur les propriétés bâties</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
                    typeChart={"pfb"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Taxe foncière sur les propriétés non bâties</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
                    typeChart={"pfnb"}
                  ></GraphOneLine>
                  <hr />
                  <h5>Potentiel fiscal</h5>
                  <GraphOneLine
                    collectivite={"commune"}
                    code={collectivite.COM}
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
