import {
  getCharts,
  getChartsOneLine,
  getDataChart,
  urlChartCollectivite,
  urlChartCommunes,
  urlChartDepartement,
  urlChartRegion,
} from "./charts";

export enum TypeDataSet {
  Commune = "comptes-individuels-des-communes-fichier-global-a-compter-de-2000",
  Departement = "comptes-individuels-des-departements-et-des-collectivites-territoriales-uniques0",
  Region = "comptes-individuels-des-regions-fichier-global",
  Collectivite = "comptes-individuels-des-groupements-a-fiscalite-propre-fichier-global-a-compter-",
}

export function getUrlForCollectivite(
  collectivite: string,
  code: string,
  typeChart: string | any[]
) {
  if (collectivite == "commune") {
    const dep = code.startsWith("97")
      ? code.substring(0, 3)
      : code.substring(0, 2);
    const idCommune = code.startsWith("97") ? code.replace("97", "") : code.replace(dep, "");
    const codeDep = code.startsWith("97") ? `10${dep.replace("97", "")}` : `0${dep}` ;
    const charts =
      typeof typeChart == "string"
        ? getChartsOneLine(typeChart)
        : getCharts(typeChart);

    const dataChart = getDataChart(
      getCommuneQueryConfig(TypeDataSet.Commune, codeDep, idCommune),
      charts,
      "an"
    );
    console.log(dataChart);
    const urlFinale = urlChartCommunes
      .replace("[DEPARTEMENT]", codeDep)
      .replace("[CODECOMM]", idCommune)
      .replace("[DATACHART]", btoa(JSON.stringify(dataChart)));
    return urlFinale;
  } else if (collectivite == "departement") {
    let codeDep = code;
    if(code.length === 2) {
      codeDep = `0${code}`;
    }
    else if(code.length === 3){
      codeDep = `10${code.substring(2)}`
    }
    const charts =
      typeof typeChart == "string"
        ? getChartsOneLine(typeChart)
        : getCharts(typeChart);
    const dataChart = getDataChart(
      getDepartementQueryConfig(TypeDataSet.Departement, codeDep),
      charts,
      "exer"
    );
    console.log(dataChart);
    const urlFinale = urlChartDepartement
      .replace("[DEPARTEMENT]", codeDep)
      .replace("[DATACHART]", btoa(JSON.stringify(dataChart)));
    return urlFinale;
  }
  else if (collectivite == "region") {

    const reg = code;
    const regCode = reg.startsWith("0") ? `1${reg}`: `0${reg}`;
    const charts =
      typeof typeChart == "string"
        ? getChartsOneLine(typeChart)
        : getCharts(typeChart);
    const dataChart = getDataChart(
      getRegionQueryConfig(TypeDataSet.Region, regCode),
      charts,
      "exer"
    );
    console.log(dataChart);
    const urlFinale = urlChartRegion
      .replace("[REGION]", regCode)
      .replace("[DATACHART]", btoa(JSON.stringify(dataChart)));
    return urlFinale;
  }
  else if (collectivite == "collectivite") {
    const siren = code;
    const charts =
      typeof typeChart == "string"
        ? getChartsOneLine(typeChart)
        : getCharts(typeChart);
    const dataChart = getDataChart(
      { dataset: TypeDataSet.Collectivite, options: {} },
      charts,
      "exer"
    );
    console.log(dataChart);
    const urlFinale = urlChartCollectivite
      .replace("[SIREN]", siren)
      .replace("[DATACHART]", btoa(JSON.stringify(dataChart)));
    return urlFinale;
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
  codeDep: string
) {
  return {
    dataset: dataset,
    options: {
      "refine.dep": codeDep,
    },
  };
}
export function getRegionQueryConfig(
  dataset: TypeDataSet,
  codeReg: string
) {
  return {
    dataset: dataset,
    options: {
      "refine.reg": codeReg,
    },
  };
}
