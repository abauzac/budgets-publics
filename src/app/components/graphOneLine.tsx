import {  getChartsOneLine, getDataChart } from "../utils/charts";
import { TypeDataSet, getCommuneQueryConfig } from "../utils/utils";

export default function GraphOneLine({ commune, type }) {
  const codeCommune: string = commune.COM;
  const dep = codeCommune.startsWith("97")
    ? codeCommune.substring(0, 3)
    : codeCommune.substring(0, 2);
  const idCommune = codeCommune.replace(dep, "");
  const codeDep = dep.length === 2 ? `0${dep}` : dep;
  const charts = getChartsOneLine(type);
  const url =
    "https://data.economie.gouv.fr/explore/embed/dataset/comptes-individuels-des-communes-fichier-global-a-compter-de-2000/analyze/?refine.dep=[DEPARTEMENT]&refine.icom=[CODECOMM]&dataChart=[DATACHART]&static=false&datasetcard=false";
  const dataChart = getDataChart(
    getCommuneQueryConfig(TypeDataSet.Commune, codeDep, idCommune,),
    charts
  );
  console.log(dataChart)
  const urlFinale = url
    .replace("[DEPARTEMENT]", codeDep)
    .replace("[CODECOMM]", idCommune)
    .replace("[DATACHART]", btoa(JSON.stringify(dataChart)));

  return (
    <div className="d-flex justify-content-center">
    <iframe src={urlFinale} width="600" height="400" frameBorder="0"></iframe>
  </div>
  );
}
