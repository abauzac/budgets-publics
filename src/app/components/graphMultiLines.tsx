import {  communeFonctionnementProduitCharge, getCharts, getChartsOneLine, getDataChart } from "../utils/charts";
import { TypeDataSet, getCommuneQueryConfig } from "../utils/utils";

export default function GraphMultiLines({ commune, graphs }) {
  const codeCommune: string = commune.COM;
  const dep = codeCommune.startsWith("97")
    ? codeCommune.substring(0, 3)
    : codeCommune.substring(0, 2);
  const idCommune = codeCommune.replace(dep, "");
  const codeDep = dep.length === 2 ? `0${dep}` : dep;
  const charts = getCharts(graphs);
  const url =
    "https://data.economie.gouv.fr/explore/embed/dataset/comptes-individuels-des-communes-fichier-global-a-compter-de-2000/analyze/?refine.dep=[DEPARTEMENT]&refine.icom=[CODECOMM]&dataChart=[DATACHART]&static=false&datasetcard=false";
  const dataChart = getDataChart(
    getCommuneQueryConfig(TypeDataSet.Commune, codeDep, idCommune,),
    getCharts(charts)
  );
  console.log(dataChart)
  const urlFinale = url
    .replace("[DEPARTEMENT]", codeDep)
    .replace("[CODECOMM]", idCommune)
    .replace("[DATACHART]", btoa(JSON.stringify(dataChart)));

  return (
    <div className="d-flex flex-column align-items-center">
      <iframe src={urlFinale} width="600" height="400" frameBorder="0"></iframe>
      <br/>
      {graphs.map((graph,i) => {
        return (
          <div key={btoa(JSON.stringify(graph))+i}>
            <span className="square-legend" style={{backgroundColor: graph.color}}></span> {graph.description}&nbsp;({graph.yAxis})
          </div>
        );
      })}
  </div>
  );
}
