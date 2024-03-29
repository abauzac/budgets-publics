import { communeFonctionnementProduitCharge, communeGlobalResultatEnsemble, getDataChart, urlChartCommunes } from "../utils/charts";
import { TypeDataSet, getCommuneQueryConfig } from "../utils/utils";

export default function CommuneGraphGlobal({ commune }) {
  const codeCommune: string = commune.COM;
  const dep = codeCommune.startsWith("97")
    ? codeCommune.substring(0, 3)
    : codeCommune.substring(0, 2);
  const idCommune = codeCommune.replace(dep, "");
  const codeDep = dep.length === 2 ? `0${dep}` : dep;
    debugger;
  const dataChart = getDataChart(
    getCommuneQueryConfig(TypeDataSet.Commune, codeDep, idCommune,),
    communeGlobalResultatEnsemble
  );

  const urlFinale = urlChartCommunes
    .replace("[DEPARTEMENT]", codeDep)
    .replace("[CODECOMM]", idCommune)
    .replace("[DATACHART]", btoa(JSON.stringify(dataChart)));

  return (
    <div className="d-flex justify-content-center">
      <iframe src={urlFinale} width="600" height="400" frameBorder="0"></iframe>
    </div>
  );
}
