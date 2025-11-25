import { ComptabiliteModele } from "./types";

export const BILAN_ACTIF: ComptabiliteModele = [
  {
    label: "ACTIF IMMOBILISE",
    key: "actif-immobilise",
    sections: [
      {
        label: "IMMOBILISATIONS INCORPORELLES",
        key: "immobilisations-incorporelles",
        categories: [
          // Subventions d'investissement versées 204…        2804…
          // Autres immobilisations incorporelles 202 , 203… , 205… , 208…        2802, 2803… , 2805… , 2808… , 290…
          // Immobilisations incorporelles en cours 232… , 237        2932…
          {
            label: "Subventions d'investissement versées",
            comptes: {
              comptesBrut: ["204*"],
              comptesAmortissements: ["2804*"],
            },
            key: "subventions-investissement-versees",
          },
          {
            label: "Autres immobilisations incorporelles",
            comptes: {
              comptesBrut: ["202", "203*", "205*", "208*"],
              comptesAmortissements: [
                "2802",
                "2803*",
                "2805*",
                "2808*",
                "290*",
              ],
            },
            key: "autres-immobilisations-incorporelles",
          },
          {
            label: "Immobilisations incorporelles en cours",
            comptes: {
              comptesBrut: ["232*", "237"],
              comptesAmortissements: ["2932*"],
            },
            key: "immobilisations-incorporelles-en-cours",
          },
        ],
      },
      {
        label: "IMMOBILISATIONS CORPORELLES",
        key: "immobilisations-corporelles",
        categories: [
          /*
            Terrains 211... , 212… , 2171... , 2172… , 221… , 222…      2811 , 2812… , 28171 , 28172… , 2821 ,2822… , 2911... , 2912… , 29171... , 29172… , 2921… , 2922…
            Constructions 213… , 214… , 2173..., 2174… , 223… , 224…    2813… , 2814… , 28173..., 28174… , 2823… , 824… , 2913… , 2914… , 29173..., 29174… ,2923… , 2924…
            Réseaux et installations de voirie 2151 , 2152 , 2154 , 21751 , 21752 , 21754 , 2251 , 2252 , 2254      28151 , 28152 , 28154 , 281751 , 281752 , 281754 , 28251 , 28252 , 28254 , 29151... , 29152... , 29154... , 291751... , 291752... ,291754... , 29251... , 29252... , 29254…
            Réseaux divers 2153… , 21753… , 2253…       28153… , 281753… , 28253… , 29153… , 291753… , 29253…
            Installations techniques, agencements et matériel 2156... , 2157... , 2158 , 21756…, 21757... ,21758 , 2256 , 2257... , 2258        28156... , 28157... , 28158 , 281756…, 29156... , 29157... , 29158... , 291756…, 291757... , 291758... , 29256... , 29257... , 29258... 281757... , 281758 , 28256 , 28257... , 28258 ,
            Immobilisations mises en concessions ou affermées 241…
            Autres 216... , 2176 , 2178…, 218... , 226... , 228…       2816, 28176, 28178... , 2818... , 2826, 2828... , 2916... , 29176... , 29178… , 2918... , 2926... , 2928…
            Immobilisations corporelles en cours 23… sauf 232… sauf 237      2931…
            */
          {
            label: "Terrains",
            comptes: {
              comptesBrut: ["211*", "212*", "2171*", "2172*", "221*", "222*"],
              comptesAmortissements: [
                "2811",
                "2812*",
                "28171",
                "28172*",
                "2821",
                "2822*",
                "2911*",
                "2912*",
                "29171*",
                "29172*",
                "2921*",
                "2922*",
              ],
            },
            key: "terrains",
          },
          {
            label: "Constructions",
            comptes: {
              comptesBrut: ["213*", "214*", "2173*", "2174*", "223*", "224*"],
              comptesAmortissements: [
                "2813*",
                "2814*",
                "28173*",
                "28174*",
                "2823*",
                "824*",
                "2913*",
                "2914*",
                "29173*",
                "29174*",
                "2923*",
                "2924*",
              ],
            },
            key: "constructions",
          },
          {
            label: "Réseaux et installations de voirie",
            comptes: {
              comptesBrut: [
                "2151",
                "2152",
                "2154",
                "21751",
                "21752",
                "21754",
                "2251",
                "2252",
                "2254",
              ],
              comptesAmortissements: [
                "28151",
                "28152",
                "28154",
                "281751",
                "281752",
                "281754",
                "28251",
                "28252",
                "28254",
                "29151*",
                "29152*",
                "29154*",
                "291751*",
                "291752*",
                "291754*",
                "29251*",
                "29252*",
                "29254*",
              ],
            },
            key: "reseaux-installations-voirie",
          },
          {
            label: "Réseaux divers",
            comptes: {
              comptesBrut: ["2153*", "21753*", "2253*"],
              comptesAmortissements: [
                "28153*",
                "281753*",
                "28253*",
                "29153*",
                "291753*",
                "29253*",
              ],
            },
            key: "reseaux-divers",
          },
          {
            label: "Installations techniques, agencements et matériel",
            comptes: {
              comptesBrut: [
                "2156*",
                "2157*",
                "2158",
                "21756*",
                "21757*",
                "21758",
                "2256",
                "2257*",
                "2258",
              ],
              comptesAmortissements: [
                "28156*",
                "28157*",
                "28158",
                "281756*",
                "29156*",
                "29157*",
                "29158*",
                "291756*",
                "291757*",
                "291758*",
                "29256*",
                "29257*",
                "29258*",
                "281757*",
                "281758",
                "28256",
                "28257*",
                "28258*",
              ],
            },
            key: "installations-techniques-agencements-materiel",
          },
          {
            label: "Immobilisations mises en concessions ou affermées",
            comptes: {
              comptesBrut: ["241*"],
              comptesAmortissements: [],
            },
            key: "immobilisations-mises-en-concessions-ou-affermees",
          },
          {
            label: "Autres",
            comptes: {
              comptesBrut: ["216*", "2176", "2178*", "218*", "226*", "228*"],
              comptesAmortissements: [
                "2816",
                "28176",
                "28178*",
                "2818*",
                "2826",
                "2828*",
                "2916*",
                "29176*",
                "29178*",
                "2918*",
                "2926*",
                "2928*",
              ],
            },
            key: "autres",
          },
          {
            label: "Immobilisations corporelles en cours",
            comptes: {
              comptesBrut: ["23*"],
              comptesAmortissements: ["2931*"],
              comptesBrutsExclus: ["232*", "237"],
            },
            key: "immobilisations-corporelles-en-cours",
          },
        ],
      },
      {
        label:
          "DROITS DE RETOUR RELATIFS AUX BIENS MIS A DISPOSITION OU AFFECTES",
        key: "droits-de-retour-relatifs-aux-biens-mis-a-disposition-ou-affectes",
        comptes: {
          // 181D , 242… , 243 , 244 , 245 , 246 , 248…
          comptesBrut: ["181D", "242*", "243", "244", "245", "246", "248*"],
          comptesAmortissements: [],
        },
      },
      {
        label: "IMMOBILISATIONS FINANCIERES",
        key: "immobilisations-financieres",
        comptes: {
          // 26... sauf 269 , 27 … sauf 279
          comptesBrut: ["26*", "27*"],
          // 296... , 297…
          comptesAmortissements: ["296*", "297*"],
          comptesBrutsExclus: ["269", "279"],
        },
      },
    ],
  },
  {
    label: "ACTIF CIRCULANT",
    key: "actif-circulant",
    sections: [
      {
        label: "STOCKS",
        key: "stocks",
        comptes: {
          // 31... , 32... , 33... , 34... , 35... , 37...
          comptesBrut: ["31*", "32*", "33*", "34*", "35*", "37*"],
          comptesAmortissements: ["39*"],
        },
      },
      {
        label: "CREANCES",
        key: "creances",
        categories: [
          {
            label:
              "Créances sur des entités publiques, des organismes internationaux et la Commission européenne",
            /* 441… , 44312 , 44316 , 44322 , 44326 , 44332 ,
44336 , 44342 , 44346 , 44352 , 44356 , 44362 ,
44366 , 44372 , 44376 , 44382 , 44386 , 4456…
, 44581 , 44583 , 44585 , 445884 , 445886 ,
4487
*/
            comptes: {
              comptesBrut: [
                "441*",
                "44312",
                "44316",
                "44322",
                "44326",
                "44332",
                "44336",
                "44342",
                "44346",
                "44352",
                "44356",
                "44362",
                "44366",
                "44372",
                "44376",
                "44382",
                "44386",
                "4456*",
                "44581",
                "44583",
                "44585",
                "445884",
                "445886",
                "4487",
              ],
              comptesAmortissements: [],
            },
            key: "creances-sur-des-entites-publiques-des-organismes-internationaux-et-la-commission-europeenne",
          },
          {
            label: "Créances sur les redevables et comptes rattachés",
            /* 411… 412… , 414… , 415… , 416… 417 , 418…        491... */
            comptes: {
              comptesBrut: [
                "411*",
                "412*",
                "414*",
                "415*",
                "416*",
                "417",
                "418*",
              ],
              comptesAmortissements: ["491*"],
            },
            key: "creances-sur-les-redevables-et-comptes-rattaches",
          },
          {
            label: "Avances et acomptes versés par la collectivité",
            //4091 , 4092 , 4093D
            comptes: {
              comptesBrut: ["4091", "4092", "4093D"],
              comptesAmortissements: [],
            },
            key: "avances-et-acomptes-verses-par-la-collectivite",
          },
          {
            label:
              "Créances correspondant à des opérations pour compte de tiers",
            /* 45411 , 45421 , 45431 , 45441 , 4551 , 4561 , 4569… , 4581 */
            comptes: {
              comptesBrut: [
                "45411",
                "45421",
                "45431",
                "45441",
                "4551",
                "4561",
                "4569*",
                "4581",
              ],
              comptesAmortissements: [],
            },
            key: "creances-correspondant-a-des-operations-pour-compte-de-tiers",
          },
          // Créances sur budgets annexes
          // 451...D , 586D
          {
            label: "Créances sur budgets annexes",
            comptes: {
              comptesBrut: ["451*", "586D"],
              comptesAmortissements: [],
            },
            key: "creances-sur-budgets-annexes",
          },
          {
            label: "Créances sur les autres débiteurs",
            /* 4097… , 4098 , 425 , 4287 , 429 , 4387 , 461D ,462… , 465 , 4672… , 46751D , 46752 ,4687 , 4673…, 46772          496… */
            comptes: {
              comptesBrut: [
                "4097*",
                "4098",
                "425",
                "4287",
                "429",
                "4387",
                "461D",
                "462*",
                "465",
                "4672*",
                "46751D",
                "46752",
                "4687",
                "4673*",
                "46772",
              ],
              comptesAmortissements: ["496*"],
            },
            key: "creances-sur-les-autres-debiteurs",
          },
        ],
      },
      {
        label: "CHARGES CONSTATEES D'AVANCE",
        key: "charges-constatees-davance",
        comptes: {
          // 486…
          comptesBrut: ["486*"],
          comptesAmortissements: [],
        },
      },
    ],
  },
  {
    label: "TRESORERIE",
    key: "tresorerie",
    sections: [
      {
        label: "VALEURS MOBILIERES DE PLACEMENT",
        key: "valeurs-mobilieres-de-placement",
        comptes: {
          // 50…       590...
          comptesBrut: ["50*"],
          comptesAmortissements: ["590*"],
        },
      },
      {
        label: "DISPONIBILITES",
        key: "disponibilites",
        comptes: {
          // 511... , 515 , 516... , 517 , 5187 , 541... , 5421D, 5428D
          comptesBrut: [
            "511*",
            "515",
            "516*",
            "517",
            "5187",
            "541*",
            "5421D",
            "5428D",
          ],
          comptesAmortissements: [],
        },
      },
      {
        label: "AUTRES",
        // 55... , 56...       595...
        key: "autres-tresorerie",
        comptes: {
          comptesBrut: ["55*", "56*"],
          comptesAmortissements: ["595*"],
        },
      },
    ],
  },
  {
    label: "COMPTES DE REGULARISATION",
    key: "comptes-de-regularisation",
    sections: [
      {
        label: "COMPTES DE REGULARISATION",
        key: "comptes-de-regularisation-section",
        comptes: {
          // 169 , 445888D , 472… , 478...D , 481… , 580D,584D , 587...D , 588D , 589…D
          comptesBrut: [
            "169",
            "445888D",
            "472*",
            "478*",
            "481*",
            "580D",
            "584D",
            "587*",
            "588D",
            "589*",
          ],
          comptesAmortissements: [],
        },
      },
    ],
  },
  {
    label: "ECARTS DE CONVERSION ACTIF",
    key: "ecarts-de-conversion-actif",
    sections: [
      {
        label: "ECARTS DE CONVERSION ACTIF",
        key: "ecarts-de-conversion-actif-section",
        comptes: {
          // 476…
            comptesBrut: ["476*"],
            comptesAmortissements: [],
        },
      },
    ],
  }
];

// M57 pdf : page 15
export const BILAN_PASSIF: ComptabiliteModele = [
  {
    label: "FONDS PROPRES",
    key: "fonds-propres",
    sections: [
      {
        label: "APPORTS NON RATTACHES A UN ACTIFS DETERMINE",
        key: "apports-non-rattaches-a-un-actifs-determine",
        categories: [
          {
            label: "Dotations",
            comptes: {
              // 1021, 10251, (-10259)
              comptesBrut: [
                "1021",
                "10251",
              ],
              comptesAmortissements: [],
              comptesNegatifs: [
                "10259",
              ],
            },
            key: "dotations",
          },
          {
            label: "Fonds globalisés",
            comptes: {
              // 1022...sauf 10229… , (-10229… )
              comptesBrut: [
                "1022*",
              ],
              comptesBrutsExclus: [
                "10229*",
              ],
              comptesAmortissements: [],
              comptesNegatifs: [
                "10229*",
              ],
            },
            key: "fonds-globalises",
          }
        ]
      },
      {
        label: "SUBVENTIONS D'INVESTISSEMENT",
        key: "subventions-dinvestissement",
        categories: [
          {
            label: "Rattachées à un actif amortissable",
            comptes: {
              // 131… , 133…, (- 1391…), (-1393...)
              comptesBrut: [
                "131*",
                "133*",
              ],
              comptesNegatifs: [
                "1391*",
                "1393*",
              ],
              comptesAmortissements: [],
            },
            key: "rattachees-a-un-actif-amortissable",
          },
          {
            label: "Rattachées à un actif non amortissable",
            comptes: {
              //132…, 134… , 138…
              comptesBrut: [
                "132*",
                "134*", 
                "138*",
              ],
              comptesAmortissements: [],
            },
            key: "rattachees-a-un-actif-non-amortissable",
          }
        ]
      }
    ]
  }
];


// M57 pdf : page 23
export const COMPTE_RESULTAT: ComptabiliteModele = [
  // To be implemented
];
