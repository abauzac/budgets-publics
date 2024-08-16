import { Graph } from "../_components/graphMultiLines";
import {
  getCharts,
  getChartsOneLine,
  getDataChart,
  urlChartCollectivite,
  urlChartCommunes,
  urlChartDepartement,
  urlChartRegion,
  urlComptaCommune,
} from "./charts";
import { type BalanceCommuneResponse, type BalanceResponse } from "./types";
import comptesM14 from "../../../public/json/m14.json";
import comptesM57 from "../../../public/json/m57.json";

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
    const idCommune = code.startsWith("97")
      ? code.replace("97", "")
      : code.replace(dep, "");
    const codeDep = code.startsWith("97")
      ? `10${dep.replace("97", "")}`
      : `0${dep}`;
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
    if (code.length === 2) {
      codeDep = `0${code}`;
    } else if (code.length === 3) {
      codeDep = `10${code.substring(2)}`;
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
  } else if (collectivite == "region") {
    const reg = code;
    const regCode = reg.startsWith("0") ? `1${reg}` : `0${reg}`;
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
  } else if (collectivite == "collectivite") {
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

export function getUrlForComptaCommune(
  codeDep: string,
  codeCommune: string,
  year: number,
){
  return urlComptaCommune.replace("[YEAR]", ""+year)
    .replace("[DEPARTEMENT]", codeDep)
    .replace("[CODECOMM]", codeCommune)
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
export function getRegionQueryConfig(dataset: TypeDataSet, codeReg: string) {
  return {
    dataset: dataset,
    options: {
      "refine.reg": codeReg,
    },
  };
}

export function extractDepCodeFromCollectiviteDept(collDept: string) {
  // "101" => "971", "1" => "01", "22" => "22", "02A" => "2A
  if (collDept.length === 1) {
    return `0${collDept}`;
  } else if (collDept.length === 2) {
    return collDept;
  } else if (collDept.length === 3 && collDept.startsWith("10")) {
    return `97${collDept.substring(2)}`;
  } else if (collDept.length === 3 && collDept.startsWith("02")) {
    return collDept.substring(1);
  }
  return null;
}

export function transformDepCodeToCollectiviteDept(depCode: string, padleft = false) {
  if (depCode === "") return;
  let dep = depCode; // "06", "77", "2A"...
  // "06" => "6"
  if (dep.length === 2 && dep[0] === "0") {
    if(padleft)
      return dep[1].padStart(3, "0")
    return dep[1];
  }
  // "02A"
  else if (["2A", "2B"].includes(dep)) {
    return "0" + dep;
  }
  // "971" => "101"
  else if (dep.length === 3 && dep.startsWith("97")) {
    return "10" + dep[2];
  } else {
    if(padleft)
      return dep.padStart(3, "0")
    return dep;
  }
}

export function getTypeChart(
  typeChart: string,
  prefix: string | undefined,
  suffix: string | undefined
) {
  if (prefix) {
    typeChart = `${prefix}${typeChart}`;
  }
  if (suffix) {
    typeChart = `${typeChart}${suffix}`;
  }
  return typeChart;
}

export function getTypeCharts(
  typeCharts: Graph[],
  prefix: string | undefined,
  suffix: string | undefined
) {
  return typeCharts.map((typeChart) => ({
    ...typeChart,
    yAxis: `${prefix || ""}${typeChart.yAxis}${suffix || ""}`,
  }));
}

export function getNomenclature(responseItem: BalanceCommuneResponse): {c: string; lib: string}[] {
  switch (responseItem.nomen) {
    case "M14":
      return comptesM14;
    case "M57":
      return comptesM57.map(m => { return { c: ""+parseInt(m.CODE), lib: m.LIBELLE }});
    default:
      return [];
  }
}

export async function getComptesForCommune(url: string){
  let offset = 0;
  let results: BalanceCommuneResponse[] = [];
  let resultTmp = []
  let loopIdx = 0;
  while(resultTmp.length == 100 || offset == 0){
    const urlFinale = url.replace("[OFFSET]", ""+offset)
    const response = await fetch(urlFinale);
    if(!response.ok)
      break;

    const json: BalanceResponse = await response.json()
    if(json.results.length == 0)
      break;

    resultTmp = json.results;
    results.push(...json.results)

    if(json.results.length < 100){
      break;
    }

    loopIdx++;
    offset = loopIdx*100;
  }
  return results;
}
