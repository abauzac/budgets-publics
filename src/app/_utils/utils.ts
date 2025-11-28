import {
  urlComptaCommune,
  urlComptaDepartement,
  urlComptaRegion,
  urlDataCommunesIdentifiers,
  urlDataDepartementsIdentifiers,
  urlDataEconomieTemplate,
  urlDataGroupementFiscalitePropreIdentifiers,
  urlDataRegionsIdentifiers,
} from "./charts";
import { BalanceCommuneInfos, type BalanceCommuneResponse, type BalanceResponse } from "./types";
import comptesM14 from "../../../public/json/m14.json";
import comptesM57 from "../../../public/json/m57.json";

export enum TypeDataSet {
  Commune = "comptes-individuels-des-communes-fichier-global-a-compter-de-2000",
  Departement = "comptes-individuels-des-departements-et-des-collectivites-territoriales-uniques0",
  Region = "comptes-individuels-des-regions-fichier-global",
  Collectivite = "comptes-individuels-des-groupements-a-fiscalite-propre-fichier-global-a-compter-",
}

export function toEuro(euro: number){
  if(euro === 0)
    return "-"
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(euro);
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

export function getUrlForComptaDepartement(
  codeDep: string,
  year: number,
){
  return urlComptaDepartement.replace("[YEAR]", ""+year)
    .replace("[DEPARTEMENT]", codeDep)
}

export function getUrlForComptaRegion(
  codeReg: string,
  year: number,
){
  return urlComptaRegion.replace("[YEAR]", ""+year)
    .replace("[REGION]", codeReg)
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

export function generateYearsArray() {
  let startYear = 2015
  const endYear = new Date().getFullYear()-1
  const endDate = endYear || new Date().getFullYear();
  let years = [];
  for (var i = startYear; i <= endDate; i++) {
    years.push(startYear);
    startYear++;
  }
  return years.toReversed();
}

export function getNomenclature(responseItem: BalanceCommuneResponse): {c: string; lib: string}[] {
  switch (responseItem.nomen) {
    case "M14":
    case "M52": // departement
      return comptesM14;
    case "M57":
    case "M57A":
      return comptesM57.map(m => { return { c: ""+parseInt(m.CODE), lib: m.LIBELLE }});
    // case "M52":
    //   return comptesM52.map(m => { return { c: ""+parseInt(m.), lib: m.LIBELLE }}); // TODO ajouter nomenclature M52
    // case "M4":
    //   return comptesM52.map(m => { return { c: ""+parseInt(m.), lib: m.LIBELLE }}); // TODO ajouter nomenclature M4
    default:
      return [];
  }
}

export async function getComptesForCommune(url: string){
  let offset = 0;
  let results: BalanceCommuneResponse[] = [];
  let resultTmp = []
  let loopIdx = 0;

  // get from localstorage first 
  if (localStorage.getItem(url) != null) {
    const jsonStored = localStorage.getItem(url);
    return JSON.parse(jsonStored!);
  }

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
  localStorage.setItem(url, JSON.stringify(results));
  return results;
}

export async function getCommunesData(codeCommune: string, codeDep : string){
  // url encode : dep="006" and icom="088" 
  if(codeCommune.length == 2) // pad left 0
    codeCommune = codeCommune.padStart(3, "0");
  if(codeDep.length == 2) // pad left 0
    codeDep = codeDep.padStart(3, "0");

  const results: any[] = [];
  for (let i = 0; i < urlDataCommunesIdentifiers.length; i++) {
    const identifier = urlDataCommunesIdentifiers[i];
    const url = getCommuneUrlDataEconomie(identifier, codeCommune, codeDep);

      if (localStorage.getItem(url) != null) {
        const jsonStored = localStorage.getItem(url);
        results.push(...JSON.parse(jsonStored!));
        continue;
      }

    const response = await fetch(url);
    if(!response.ok)
      continue;
    const json = await response.json();
    localStorage.setItem(url, JSON.stringify(json.results));
    if(json.total_count && json.total_count > 0) {
      results.push(...json.results);
    }
  }
  // order by "an" property ascending
  results.sort((a, b) => +a.an - +b.an);
  return results;
}

export async function getCollectivitesData(siren: string, codeDep : string){
  const results: any[] = [];
  for (let i = 0; i < urlDataGroupementFiscalitePropreIdentifiers.length; i++) {
    const url = getCollectivitesUrlDataEconomie(urlDataGroupementFiscalitePropreIdentifiers[i], siren, codeDep);
    const response = await fetch(url);
    if(!response.ok)
      continue;
    const json = await response.json();
    if(json.total_count && json.total_count > 0) {
      results.push(...json.results);
    }
  }
  results.sort((a, b) => +a.exer - +b.exer);
  return results.map(r => {
    r.an = r.exer;
    return r;
  });
}

export async function getDepartementData(codeDep : string){
  const results: any[] = [];
  for (let i = 0; i < urlDataDepartementsIdentifiers.length; i++) {
    const url = getDepartementUrlDataEconomie(urlDataDepartementsIdentifiers[i], codeDep);
    const response = await fetch(url);
    if(!response.ok)
      continue;
    const json = await response.json();
    if(json.total_count && json.total_count > 0) {
      results.push(...json.results);
    }
  }
  results.sort((a, b) => +a.exer - +b.exer);
  return results.map(r => {
    r.an = r.exer;
    return r;
  });
}

export async function getRegionData(codeRegion : string){
  const results: any[] = [];
  for (let i = 0; i < urlDataRegionsIdentifiers.length; i++) {
    const url = getRegionUrlDataEconomie(urlDataRegionsIdentifiers[i], codeRegion);
    const response = await fetch(url);
    if(!response.ok)
      continue;
    const json = await response.json();
    if(json.total_count && json.total_count > 0) {
      results.push(...json.results);
    }
  }
  results.sort((a, b) => +a.exer - +b.exer);
  return results.map(r => {
    r.an = r.exer;
    return r;
  });
}

export function getRegionUrlDataEconomie(dataIdentifier: string, codeRegion: string){
  if(!dataIdentifier)
    throw new Error("dataIdentifier is required");
  if(codeRegion.length != 3)
    codeRegion = codeRegion.padStart(3, "0");
  const url = getUrlDataEconomieForIdentifier(dataIdentifier);
  const whereEncoded = encodeURIComponent(`reg="${codeRegion}"`);
  return url + `?where=${whereEncoded}`;
}

export function getDepartementUrlDataEconomie(dataIdentifier: string, codeDep: string){
  if(!dataIdentifier)
    throw new Error("dataIdentifier is required");
  if(codeDep.length != 3)
    codeDep = codeDep.padStart(3, "0");
  const url = getUrlDataEconomieForIdentifier(dataIdentifier);
  const whereEncoded = encodeURIComponent(`dep="${codeDep}"`);
  return url + `?where=${whereEncoded}`;
}

export function getCommuneUrlDataEconomie(dataIdentifier: string, codeCommune: string, codeDep: string){
  if(!dataIdentifier)
    throw new Error("dataIdentifier is required");
  const url = getUrlDataEconomieForIdentifier(dataIdentifier);
  const whereEncoded = encodeURIComponent(`dep="${codeDep}" and icom="${codeCommune}"`);
  return url + `?where=${whereEncoded}`;
}

export function getCollectivitesUrlDataEconomie(dataIdentifier: string, siren: string, codeDep: string){
  if(!dataIdentifier)
    throw new Error("dataIdentifier is required");
  if(codeDep.length != 3)
    codeDep = codeDep.padStart(3, "0");
  const url = getUrlDataEconomieForIdentifier(dataIdentifier);
  const whereEncoded = encodeURIComponent(`ndept="${codeDep}" and siren="${siren}"`);
  return url + `?where=${whereEncoded}`;
}

export function getUrlDataEconomieForIdentifier(dataIdentifier: string){
  return urlDataEconomieTemplate.replace("[IDENTIFIER]", dataIdentifier);
}

export function getListeComptesForComptabilite(comptes: string[], listeComptes: BalanceCommuneInfos[], defaultProperty: "sd" | "sc" = "sd"): BalanceCommuneInfos[] {
  
  const result = comptes.map(c => {
    if(c.toLowerCase().indexOf("c") !== -1)
      defaultProperty = "sc";
    else if(c.toLowerCase().indexOf("d") !== -1)
      defaultProperty = "sd";

    if (c.indexOf("*") !== -1){
      const prefix = c.substring(0, c.indexOf("*"));
      return listeComptes
      .filter(compte => compte.compte.startsWith(prefix) && compte.compte.length > prefix.length)
      .map(compte => ({
        ... compte,
        propTarget: defaultProperty
      }));
    }
    else {
      return listeComptes.filter(compte => compte.compte === c)
      .map(compte => ({
        ... compte,
        propTarget: defaultProperty
      }));
    }
  })
  .flat();
  return result;

  // compteBrut contains "*" wildcard, e.g. "101*" : return all comptes starting with "101"
  /*const result = comptes.reduce((acc: BalanceCommuneInfos[], compteBrut: string) => {
    const comptes = listeComptes.filter(c => {
      if(compteBrut.indexOf("*") !== -1){
        const prefix = compteBrut.substring(0, compteBrut.indexOf("*"));
        return c.compte.startsWith(prefix) && c.compte.length > prefix.length;
      } else {
        return c.compte === compteBrut;
      }
    });

    // deduplicate comptes having same "compte" value
    const comptesMap: {[key: string]: BalanceCommuneInfos} = {};
    comptes.forEach(c => {
      
      comptesMap[c.compte] = c;
    });

    acc.push(...Object.values(comptesMap));
    return acc;
  }, [] as BalanceCommuneInfos[]);*/
  return result;
}