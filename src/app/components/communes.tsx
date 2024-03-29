import { useEffect, useState } from "react";
import departements from "../../../public/json/departements.json";
import communes from "../../../public/json/communes.json";
import CommuneGraphBudget from "./communeGraphBudget";
import { useRouter } from "next/navigation";
import CommuneGraphGlobal from "./communeGraphGlobal";
import GraphOneLine from "./graphOneLine";
import { GraphTypeVueGlobalCommune, communeFonctionnementProduitCharge, communeFonctionnementProduitListe } from "../utils/charts";
import GraphMultiLines from "./graphMultiLines";

export default function Communes() {
  const [departement, setDepartement] = useState(""); // "01", "02", "03", ... "95
  const [listeCommunes, setListeCommunes] = useState<any[]>([]); // liste des communes du département sélectionné
  const [commune, setCommune] = useState<any>(null); // objet commune
  const [typeVue, setTypeVue] = useState<'global'|'budget'|'investissements'|'dette'>("global"); 
  const router = useRouter();
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
                <a href="#" onClick={() => { setTypeVue('global') }}>Vue globale</a>
              </li>
              <li>
                <a href="#" onClick={() => { setTypeVue('budget') }}>Budget fonctionnel</a>
              </li>
              <li>
                <a href="#" onClick={() => { setTypeVue('investissements') }}>Investissements</a>
              </li>
              <li>
                <a href="#" onClick={() => { setTypeVue('dette') }}>Dette</a>
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
                setDepartement(event.target.value);
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
              name="communes"
              aria-label="Communes"
              onChange={(event) => {
                setCommune((communes as any[])[parseInt(event.target.value)]);
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
        </div>
      </div>
      {commune && (
        <div>
        {typeVue === 'global' && (
          <div style={{textAlign: 'center'}}>
            <h2>Vue globale pour la commune de {commune.NCCENR}</h2>
            <br />
            <h5 >Résultat d'ensemble</h5>
            <GraphOneLine commune={commune} type={GraphTypeVueGlobalCommune.ResultatEnsemble}></GraphOneLine>
            <p>Résultat d'ensemble = Résultat comptable + Besoin/Capacité de financement section investissement</p>
            <hr />
            <h5 >Résultat comptable</h5>
            <p>Résultat comptable = Produits de fonctionnement - Charges de fonctionnement</p>
            <GraphOneLine commune={commune} type={GraphTypeVueGlobalCommune.ResultatComptable}></GraphOneLine>
            <hr />
            <h5 >Besoin ou capacité de financement de la section investissement</h5>
            <GraphOneLine commune={commune} type={GraphTypeVueGlobalCommune.BesoinFinancementInvestissement}></GraphOneLine>
            <p>Besoin/Capa de fi. des inv. = Resources d'investissements - Emplois d'investissement + solde des opérations compte de tiers</p>
          </div>
          )}
        {typeVue === 'budget' && (
          <div style={{textAlign: 'center'}}>
            <h2>Budget fonctionnel pour la commune de {commune.NCCENR}</h2>
            <GraphMultiLines commune={commune} graphs={communeFonctionnementProduitCharge}></GraphMultiLines>
            <hr />
            <h5 >Produits de fonctionnement</h5>
            <GraphMultiLines commune={commune} graphs={communeFonctionnementProduitListe}></GraphMultiLines>
          </div>
          )}
      </div>
      )}
    </>
  );
}
