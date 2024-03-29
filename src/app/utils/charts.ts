export const urlChartCommunes =
  "https://data.economie.gouv.fr/explore/embed/dataset/comptes-individuels-des-communes-fichier-global-a-compter-de-2000/analyze/?refine.dep=[DEPARTEMENT]&refine.icom=[CODECOMM]&dataChart=[DATACHART]&static=false&datasetcard=false";

export enum GraphTypeBudgetFonctCommune {
  ProduitDeFonctionnementCAF = "pfcaf",
  ImpotsLocaux = "impo1",
  FiscaliteReversee = "fiscrev",
  AutresImpotsTaxes = "impo2",
  DotationGlobaleFonctionnement = "dgf",
  Autres = "autdot",
  DotationFCTVA = "dfctva",
  ProduitsServicesDomaine = "dpserdom",
  ChargeTotal = "charge",
  ChargesDeFonctionnementCAF = "cfcaf",
  ChargesPersonnel = "perso",
  AchatsChargesExternes = "achat",
  ChargesFinancieres = "fin",
  Contingents = "cont",
  SubventionsVersees = "subv",
  ResultatComptable = "res1",
}

/** Graph Vue globale
 * 
 * 
bf1	Besoin ou capacité de financement résiduel de la section d'investissement = D - C		
solde	+ Solde des opérations pour le compte de tiers		
bf2	Besoin ou capacité de financement de la section d'investissement = E		
res2	Résultat d'ensemble = R - E		

 * 
 * 
 */

export enum GraphTypeVueGlobalCommune {
  ResultatComptable = "res1",
  BesoinFinancementInvestissement = "bf2",
  BesoinFinancementResiduel = "bf1",
  ResultatEnsemble = "res2",
}

export function getChartsOneLine(type: string, color: string = "#000000") {
  return [
    {
      alignMonth: true,
      type: "line",
      func: "AVG",
      yAxis: type,
      scientificDisplay: true,
      color: color,
    },
  ];
}

export function getDataChart(config: any, charts: any[], stacked = false) {
  return {
    queries: [
      {
        config: config,
        charts: charts,
        xAxis: "an",
        maxpoints: null,
        sort: "",
        stacked: stacked ? "normal" : "",
      },
    ],
    timescale: "",
    displayLegend: false,
    alignMonth: true,
    singleAxis: true,
  };
}

export function getCharts(datas: { yAxis: string; color: string }[]) {
  return datas.map((data) => {
    return {
      alignMonth: true,
      type: "line",
      func: "AVG",
      yAxis: data.yAxis,
      scientificDisplay: true,
      color: data.color,
    };
  });
}

export const communeFonctionnementProduitCharge = [
  {
    yAxis: "prod",
    color: "#447049",
    description: "Produits de fonctionnement",
  },
  {
    yAxis: "charge",
    color: "#ff292f",
    description: "Charges de fonctionnement",
  },
];

export const communeFonctionnementProduitListe = [
  {
    yAxis: "impo1",
    color: "#447049", // green
    description: "Impôts locaux",
  },
  {
    yAxis: "pfcaf",
    // red
    color: "#ff292f",
    description: "Produits de fonctionnement CAF",
  },
  // {
  //   yAxis: "fiscrev",
  //   color: "#ff292f", // red
  //   description: "Fiscalité reversée par les groupements à fiscalité propre",
  // },
  {
    yAxis: "impo2",
    color: "#0000ff", // blue
    description: "Autres impôts et taxes",
  },
  {
    yAxis: "dgf",
    color: "#000000", // black
    description: "Dotation globale de fonctionnement",
  },
  {
    yAxis: "autdot",
    // orange
    color: "#ff6600",
    description: "Autres dotations et participations",
  },
];

export const commonChartObjects = {
  alignMonth: true,
  type: "line",
  func: "AVG",
  yAxis: "prod",
  scientificDisplay: true,
  color: "#447049",
};

export const communeGlobalResultatEnsemble = [
  {
    alignMonth: true,
    type: "line",
    func: "AVG",
    yAxis: "res2",
    scientificDisplay: true,
    color: "#000000",
  },
];
