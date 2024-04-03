export const urlChartCommunes =
  "https://data.economie.gouv.fr/explore/embed/dataset/comptes-individuels-des-communes-fichier-global-a-compter-de-2000/analyze/?refine.dep=[DEPARTEMENT]&refine.icom=[CODECOMM]&dataChart=[DATACHART]&static=false&datasetcard=false";
export const urlChartDepartement =
  "https://data.economie.gouv.fr/explore/embed/dataset/comptes-individuels-des-departements-et-des-collectivites-territoriales-uniques0/analyze/?refine.dep=[DEPARTEMENT]&dataChart=[DATACHART]&static=false&datasetcard=false";
export const urlChartRegion =
  "https://data.economie.gouv.fr/explore/embed/dataset/comptes-individuels-des-regions-fichier-global/analyze/?refine.reg=[REGION]&dataChart=[DATACHART]&static=false&datasetcard=false";
export const urlChartCollectivite =
  "https://data.economie.gouv.fr/explore/embed/dataset/comptes-individuels-des-groupements-a-fiscalite-propre-fichier-global-a-compter-/analyze/?refine.siren=[SIREN]&dataChart=[DATACHART]&static=false&datasetcard=false";

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

export function getDataChart(config: any, charts: any[], xAxis:string, stacked = false) {
  return {
    queries: [
      {
        config: config,
        charts: charts,
        xAxis: xAxis,
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


// budget fonctionnel

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
    yAxis: "impo2",
    color: "#0000ff", // blue
    description: "Autres impôts et taxes",
  },
  {
    yAxis: "dgf",
    color: "#000000", // black
    description: "Dotation globale de fonctionnement",
  },
];

export const communeFonctionnementChargeListe = [
  {
    yAxis: "perso",
    color: "#ff292f",
    description: "Charges de personnel",
  },
  {
    yAxis: "achat",
    // blue
    color: "#0000ff",
    description: "Achats et charges externes",
  },
  {
    yAxis: "fin",
    // green
    color: "#447049",
    description: "Charges financières",
  },
  {
    yAxis: "cont",
    // yellow
    color: "#ffcc00",
    description: "Contingents",
  },
  {
    yAxis: "subv",
    // cyan
    color: "#00ffff",
    description: "Subventions versées",
  },
];

// investissements
/**
 * recinv	TOTAL DES RESSOURCES D'INVESTISSEMENT = C		
emp	dont : Emprunts bancaires et dettes assimilées		
subr	          Subventions reçues		
tamen	          Taxe d’aménagement		
fctva	          FCTVA		
raff	          Retour de biens affectés, concédés, ...		
depinv	TOTAL DES EMPLOIS D'INVESTISSEMENT = D		
equip	  dont : Dépenses d'équipement		
remb	          Remboursement d'emprunts et dettes assimilées		
repart	          Charges à répartir		
daff	          Immobilisations affectées, concédées, ...		
bf1	Besoin ou capacité de financement résiduel de la section d'investissement = D - C		
solde	+ Solde des opérations pour le compte de tiers		
bf2	Besoin ou capacité de financement de la section d'investissement = E		

 */

export const communeInvestissementResourcesEmplois = [
  {
    yAxis: "recinv",
    color: "#447049",
    description: "Ressources d'investissement",
  },
  {
    yAxis: "depinv",
    color: "#ff292f",
    description: "Emplois d'investissement",
  },
];

export const communeInvestissementsResourcesListe = [
  {
    yAxis: "emp",
    color: "#ff292f",
    description: "Emprunts bancaires et dettes assimilées",
  }, 
  {
    yAxis: "subr",
    color: "#447049",
    description: "Subventions reçues",
  },
  {
    yAxis: "fctva",
    color: "#0000ff",
    description: "FCTVA",
  },
  {
    yAxis: "raff",
    color: "#000000",
    description: "Retour de biens affectés, concédés, ...",
  },
];

export const communeInvestissementsEmploisListe = [
  {
    yAxis: "equip",
    color: "#ff292f",
    description: "Dépenses d'équipement",
  },
  {
    yAxis: "remb",
    color: "#447049",
    description: "Remboursement d'emprunts et dettes assimilées",
  },
  {
    yAxis: "repart",
    color: "#0000ff",
    description: "Charges à répartir",
  },
  {
    yAxis: "daff",
    color: "#000000",
    description: "Immobilisations affectées, concédées, ...",
  },
];


// departement

// fonctionnement

export const depFonctionnementProduitCharge = [
  {
    yAxis: "tpf",
    color: "#447049",
    description: "Produits de fonctionnement",
  },
  {
    yAxis: "tcf",
    color: "#ff292f",
    description: "Charges de fonctionnement",
  },
];

export const depFonctionnementProduitListe = [
  {
    yAxis: "imd",
    color: "#447049", // green
    description: "Impôts locaux",
  },
  {
    yAxis: "dgf",
    // yellow
    color: "#ffcc00",
    description: "Dotation globale de fonctionnement",
  },
  {
    yAxis: "imt",
    color: "#0000ff", // blue
    description: "Autres impôts et taxes",
  },
  {
    yAxis: "tdp",
    // light blue
    color: "#00ccff",
    description: "Dont : Taxe départementale de publicité foncière et droits d'enregistrement",
  },
  // {
  //   yAxis: "f1dtam",
  //   color: "#999999", // grey
  //   description: "dont : Taxe d'aménagement",
  // },
];

// investissement
export const depInvestissementResourcesEmplois = [
  {
    yAxis: "tri",
    color: "#447049",
    description: "Ressources d'investissement",
  },
  {
    yAxis: "tib",
    color: "#ff292f",
    description: "Emplois d'investissement",
  },
];



export const depFonctionnementChargeListe = [
  {
    yAxis: "cfr",
    color: "#ff292f",
    description: "Charges de fonctionnement CAF",
  },
  {
    yAxis: "chp",
    color: "#ff292f",
    description: "dont : Charges de personnel",
  },
  {
    yAxis: "ace",
    // blue
    color: "#0000ff",
    description: "dont : Achats et charges externes",
  },
  {
    yAxis: "chf",
    // green
    color: "#447049",
    description: "dont : Charges financières",
  },
  {
    yAxis: "sub",
    // cyan
    color: "#00ffff",
    description: "dont : Subventions versées",
  },
  {
    yAxis: "aid",
    // yellow
    color: "#ffcc00",
    description: "dont : Aide à la personne",
  },
  {
    yAxis: "fsh",
    // orange
    color: "#ff6600",
    description: "dont : Frais de séjours et d'hébergement",
  },
];

export const depInvestissementsResourcesListe = [
  {
    yAxis: "emp",
    color: "#ff292f",
    description: "Emprunts bancaires et dettes assimilées",
  }, 
  {
    yAxis: "sir",
    color: "#447049",
    description: "Subventions reçues",
  },
  {
    yAxis: "fct",
    color: "#0000ff",
    description: "FCTVA",
  },
];


export const depInvestissementsEmploisListe = [
  {
    yAxis: "ded",
    color: "#ff292f",
    description: "Dépenses d'équipement",
  },
  {
    yAxis: "rce",
    color: "#447049",
    description: "Remboursement d'emprunts et dettes assimilées",
  },
  {
    yAxis: "sev",
    color: "#0000ff",
    description: "Subventions d'équipements versées",
  },
];


// region 


export const regFonctionnementProduitListe = [
  // {
  //   yAxis: "f2rpfr",
  //   color: "#000000", 
  //   description: "Produit de fonctionnement CAF",
  // },
  {
    yAxis: "imd",
    color: "#447049", // green
    description: "Impôts locaux",
  },
  {
    yAxis: "imt",
    // lightgreen
    color: "#00cc00",
    description: "Autres impôts et taxes",
  },
  {
    yAxis: "dgf",
    // yellow
    color: "#ffcc00",
    description: "Dotation globale de fonctionnement",
  },
  //tip
  {
    yAxis: "tip",
    // blue
    color: "#0000ff",
    description: "TICPE",
  },

];



export const regFonctionnementChargeListe = [

  {
    yAxis: "chp",
    color: "#ff292f",
    description: "Charges de personnel",
  },
  {
    yAxis: "ace",
    // blue
    color: "#0000ff",
    description: "Achats et charges externes",
  },
  {
    yAxis: "chf",
    // green
    color: "#447049",
    description: "Charges financières",
  },
  {
    yAxis: "sub",
    // cyan
    color: "#00ffff",
    description: "Subventions versées",
  },
  {
    yAxis: "cop",
    // orange
    color: "#ff6600",
    description: "Contributions obligatoires et versements",
  },

];

// collectivités

export const collFonctionnementProduitCharge = [
  {
    yAxis: "pftot",
    color: "#447049",
    description: "Produits de fonctionnement",
  },
  {
    yAxis: "cftot",
    color: "#ff292f",
    description: "Charges de fonctionnement",
  },
];


export const collFonctionnementProduitListe = [
  // {
  //   yAxis: "Produits de fonctionnement CAF",
  //   color: "#00ffff",
  //   description: "Charges de personnel",
  // },
  {
    yAxis: "iltot",
    color: "#447049", // green
    description: "Impôts locaux",
  },
  {
    yAxis: "revtot",
    color: "#0000ff", // blue
    description: "Fiscalité reversée",
  },
  {
    yAxis: "aittot",
    color: "#000000", // black
    description: "Autres impôts et taxes",
  },
  {
    yAxis: "dgftot",
    color: "#ffcc00", // yellow
    description: "Dotation globale de fonctionnement",
  },
  // {
  //   yAxis: "adp",
  //   color: "#ff6600",
  //   description: "Autres dotations et participations",
  // },
  // {
  //   yAxis: "pserdom",
  //   color: "#cccccc",
  //   description: "Produits des services et du domaine",
  // },

];


export const collFonctionnementChargeListe = [
  // {
  //   yAxis: "Charges de fonctionnement CAF",
  //   color: "#00ffff",
  //   description: "Charges de personnel",
  // },
  {
    yAxis: "perstot",
    color: "#ff292f",
    description: "Charges de personnel",
  },
  {
    yAxis: "acetot",
    // blue
    color: "#0000ff",
    description: "Achats et charges externes",
  },
  {
    yAxis: "cfitot",
    // green
    color: "#447049",
    description: "Charges financières",
  },
  // {
  //   yAxis: "cont",
  //   // yellow
  //   color: "#ffcc00",
  //   description: "Contingents",
  // },
  {
    yAxis: "suvftot",
    // cyan
    color: "#00ffff",
    description: "Subventions versées",
  },
];

export const collInvestissementResourcesEmplois = [
  {
    yAxis: "ritot",
    color: "#447049",
    description: "Ressources d'investissement",
  },
  {
    yAxis: "eitot",
    color: "#ff292f",
    description: "Emplois d'investissement",
  },
];


export const collInvestissementsResourcesListe = [
  {
    yAxis: "rdettot",
    color: "#ff292f",
    description: "Emprunts bancaires et dettes assimilées",
  }, 
  {
    yAxis: "subvitot",
    color: "#447049",
    description: "Subventions reçues",
  },
  {
    yAxis: "fattot",
    color: "#0000ff",
    description: "FCTVA",
  },
];

export const collInvestissementsEmploisListe = [
  {
    yAxis: "detot",
    color: "#ff292f",
    description: "Dépenses d'équipement",
  },
  {
    yAxis: "edettot",
    color: "#447049",
    description: "Remboursement d'emprunts et dettes assimilées",
  },
];

// common

export const commonChartObjects = {
  alignMonth: true,
  type: "line",
  func: "AVG",
  yAxis: "prod",
  scientificDisplay: true,
  color: "#447049",
};
