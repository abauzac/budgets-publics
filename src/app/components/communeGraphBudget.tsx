import { communeFonctionnementProduitCharge, getDataChart } from "../utils/charts";
import { TypeDataSet, getCommuneQueryConfig } from "../utils/utils";

export default function CommuneGraphBudget({ commune }) {
  const codeCommune: string = commune.COM;
  const dep = codeCommune.startsWith("97")
    ? codeCommune.substring(0, 3)
    : codeCommune.substring(0, 2);
  const idCommune = codeCommune.replace(dep, "");
  const codeDep = dep.length === 2 ? `0${dep}` : dep;
    
  const url =
    "https://data.economie.gouv.fr/explore/embed/dataset/comptes-individuels-des-communes-fichier-global-a-compter-de-2000/analyze/?refine.dep=[DEPARTEMENT]&refine.icom=[CODECOMM]&dataChart=[DATACHART]&static=false&datasetcard=false";
  const dataChart = getDataChart(
    getCommuneQueryConfig(TypeDataSet.Commune, codeDep, idCommune,),
    communeFonctionnementProduitCharge
  );
  console.log(dataChart)
  const urlFinale = url
    .replace("[DEPARTEMENT]", codeDep)
    .replace("[CODECOMM]", idCommune)
    .replace("[DATACHART]", btoa(JSON.stringify(dataChart)));

  return (
    <div>
      <iframe src={urlFinale} width="400" height="300" frameBorder="0"></iframe>
    </div>
  );
}
