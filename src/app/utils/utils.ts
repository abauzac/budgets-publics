import { getCharts, getChartsOneLine, getDataChart, urlChartCommunes, urlChartDepartement } from "./charts";

export enum TypeDataSet {
  Commune = "comptes-individuels-des-communes-fichier-global-a-compter-de-2000",
  Departement = "comptes-individuels-des-departements-et-des-collectivites-territoriales-uniques0",
  Region = "TODO",
}

export function getUrlForCollectivite(collectivite: string, code: string, typeChart: string | any[]){
  if(collectivite == 'commune'){
    const dep = code.startsWith("97")
    ? code.substring(0, 3)
    : code.substring(0, 2);
  const idCommune = code.replace(dep, "");
  const codeDep = dep.length === 2 ? `0${dep}` : dep;
  const charts = typeof typeChart == 'string' ? getChartsOneLine(typeChart) : getCharts(typeChart);
  ;
  const dataChart = getDataChart(
    getCommuneQueryConfig(TypeDataSet.Commune, codeDep, idCommune,),
    charts,
    'an'
  );
  console.log(dataChart)
  const urlFinale = urlChartCommunes
    .replace("[DEPARTEMENT]", codeDep)
    .replace("[CODECOMM]", idCommune)
    .replace("[DATACHART]", btoa(JSON.stringify(dataChart)));
    return urlFinale
  }
  else if(collectivite == 'departement'){
    const dep = code;
    const codeDep = dep.length === 2 ? `0${dep}` : dep;
  const charts = typeof typeChart == 'string' ? getChartsOneLine(typeChart) : getCharts(typeChart);
  ;
  const dataChart = getDataChart(
    getDepartementQueryConfig(TypeDataSet.Departement, codeDep,),
    charts,
    'exer'
  );
  console.log(dataChart)
  const urlFinale = urlChartDepartement
    .replace("[DEPARTEMENT]", codeDep)
    .replace("[DATACHART]", btoa(JSON.stringify(dataChart)));
    return urlFinale

  }
}

export function getCommuneQueryConfig(
  dataset: TypeDataSet,
  codeDep: string,
  communeName: string
) {
  return {
    dataset: dataset,
    options: {
      "refine.dep": codeDep,
      "refine.icom": communeName.toLowerCase(),
    },
  };
}
export function getDepartementQueryConfig(
  dataset: TypeDataSet,
  codeDep: string,
) {
  return {
    dataset: dataset,
    options: {
      "refine.dep": codeDep,
    },
  };
}
