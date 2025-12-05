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
  },
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
              comptesBrut: ["1021", "10251"],
              comptesAmortissements: [],
              comptesNegatifs: ["10259"],
            },
            key: "dotations",
          },
          {
            label: "Fonds globalisés",
            comptes: {
              // 1022...sauf 10229… , (-10229… )
              comptesBrut: ["1022*"],
              comptesBrutsExclus: ["10229*"],
              comptesAmortissements: [],
              comptesNegatifs: ["10229*"],
            },
            key: "fonds-globalises",
          },
        ],
      },
      {
        label: "SUBVENTIONS D'INVESTISSEMENT",
        key: "subventions-dinvestissement",
        categories: [
          {
            label: "Rattachées à un actif amortissable",
            comptes: {
              // 131… , 133…, (- 1391…), (-1393...)
              comptesBrut: ["131*", "133*"],
              comptesNegatifs: ["1391*", "1393*"],
              comptesAmortissements: [],
            },
            key: "rattachees-a-un-actif-amortissable",
          },
          {
            label: "Rattachées à un actif non amortissable",
            comptes: {
              //132…, 134… , 138…
              comptesBrut: ["132*", "134*", "138*"],
              comptesAmortissements: [],
            },
            key: "rattachees-a-un-actif-non-amortissable",
          },
        ],
      },
      {
        label: "NEUTRALISATIONS ET REGULARISATIONS",
        key: "neutralisations-et-regularisations",
        comptes: {
          // 192 C , (-192D) , 193C , (-193D) , 194 , 197 , (-198D)
          comptesBrut: ["192C", "193C", "194", "197"],
          comptesAmortissements: [],
          comptesNegatifs: ["192D", "193D", "198D"],
        },
      },
      //RESERVES
      {
        label: "RESERVES",
        key: "reserves",
        comptes: {
          // 1068
          comptesBrut: ["1068"],
          comptesAmortissements: [],
        },
      },
      // REPORT A NOUVEAU
      {
        label: "REPORT A NOUVEAU",
        key: "report-a-nouveau",
        comptes: {
          // 110, (-119)
          comptesBrut: ["110"],
          comptesNegatifs: ["119"],
          comptesAmortissements: [],
        },
      },
      // RESULTAT DE L'EXERCICE
      {
        label: "RESULTAT DE L'EXERCICE",
        key: "resultat-de-lexercice",
        comptes: {
          // 12
          comptesBrut: ["12*"],
          comptesAmortissements: [],
        },
      },
      // DROITS DU CONCEDANT ET DE L'AFFERMANT
      {
        label: "DROITS DU CONCEDANT ET DE L'AFFERMANT",
        key: "droits-du-concedant-et-de-laffermant",
        comptes: {
          // 2491
          comptesBrut: ["2491"],
          comptesAmortissements: [],
        },
      },
      //DROITS DE L'AFFECTANT ET DU REMETTANT
      {
        label: "DROITS DE L'AFFECTANT ET DU REMETTANT",
        key: "droits-de-laffectant-et-du-remettant",
        // 1027 , 181C , 229… , 2492 , 2493 , 2494 , 2495 , 2496 , 2498
        comptes: {
          comptesBrut: [
            "1027",
            "181C",
            "229*",
            "2492",
            "2493",
            "2494",
            "2495",
            "2496",
            "2498",
          ],
          comptesAmortissements: [],
        },
      },
    ],
  },
  {
    label: "PASSIF",
    key: "passif",
    sections: [
      {
        label: "PROVISIONS POUR RISQUES ET CHARGES",
        key: "provisions-pour-risques-et-charges",
        categories: [
          {
            label: "Provisions pour risques",
            //151… , 152…
            comptes: {
              comptesBrut: ["151*", "152*"],
              comptesAmortissements: [],
            },
            key: "provisions-pour-risques",
          },
          {
            label: "Provisions pour charges",
            key: "provisions-pour-charges",
            // 154... , 157... , 158...
            comptes: {
              comptesBrut: ["154*", "157*", "158*"],
              comptesAmortissements: [],
            },
          },
        ],
      },
      {
        label: "DETTES FINANCIERES",
        key: "dettes-financieres",
        categories: [
          {
            label: "Emprunts obligataires",
            key: "emprunts-obligataires",
            // 163… , 16883
            comptes: {
              comptesBrut: ["163*", "16883"],
              comptesAmortissements: [],
            },
          },
          {
            label: "Emprunts souscrits auprès des établissements de crédit",
            key: "emprunts-souscrits-aupres-des-etablissements-de-credit",
            // 164… sauf 16449 , (- 16449) , 16884 , 5193…
            comptes: {
              comptesBrut: ["164*", "16884", "5193*"],
              comptesBrutsExclus: ["16449"],
              comptesNegatifs: ["16449"],
              comptesAmortissements: [],
            },
          },
          {
            label: "Dettes financières et autres emprunts",
            key: "dettes-financieres-et-autres-emprunts",
            // 165 , 166 , 167… , 1681... , 1682 , 1687 …, 16888
            comptes: {
              comptesBrut: [
                "165",
                "166",
                "167*",
                "1681*",
                "1682",
                "1687*",
                "16888",
              ],
              comptesAmortissements: [],
            },
          },
        ],
      },
      {
        label: "DETTES NON FINANCIERES",
        key: "dettes-non-financieres",
        categories: [
          {
            label: "Dettes fournisseurs et comptes rattachés",
            key: "dettes-fournisseurs-et-comptes-rattaches",
            // 269 , 279 , 401… , 402… , 403 , 404… , 405 , 407... , 408
            comptes: {
              comptesBrut: [
                "269",
                "279",
                "401*",
                "402*",
                "403",
                "404*",
                "405",
                "407*",
                "408",
              ],
              comptesAmortissements: [],
            },
          },
          {
            label: "Dettes fiscales et sociales",
            key: "dettes-fiscales-et-sociales",
            //421 , 427 , 4282 , 4286 , 431 , 437 , 4382 , 4386 , 442… , 4452 , 4453, 4455…, 4457... , 445885 , 447 , 4482 , 4486
            comptes: {
              comptesBrut: [
                "421",
                "427",
                "4282",
                "4286",
                "431",
                "437",
                "4382",
                "4386",
                "442*",
                "4452",
                "4453",
                "4455*",
                "4457*",
                "445885",
                "447",
                "4482",
                "4486",
              ],
              comptesAmortissements: [],
            },
          },
          {
            label: "Avances et acomptes reçus",
            key: "avances-et-acomptes-recus",
            // 4093C , 419...
            comptes: {
              comptesBrut: ["4093C", "419*"],
              comptesAmortissements: [],
            },
          },
          {
            label: "Dettes correspondant à des opérations pour compte de tiers",
            key: "dettes-correspondant-a-des-operations-pour-compte-de-tiers",
            // 444 , 45412 , 45422 , 45432 , 45442 , 4552 , 4567 , 4568… , 4582 , 464...
            comptes: {
              comptesBrut: [
                "444",
                "45412",
                "45422",
                "45432",
                "45442",
                "4552",
                "4567",
                "4568*",
                "4582",
                "464*",
              ],
              comptesAmortissements: [],
            },
          },
          {
            label: "Fonds gérés par la collectivité",
            key: "fonds-geres-par-la-collectivite",
            // 453...
            comptes: {
              comptesBrut: ["453*"],
              comptesAmortissements: [],
            },
          },
          {
            label: "Dettes sur budgets annexes",
            key: "dettes-sur-budgets-annexes",
            // 451...C , 586C
            comptes: {
              comptesBrut: ["451*C", "586C"],
              comptesAmortissements: [],
            },
          },
          {
            label: "Autres dettes non financières",
            key: "autres-dettes-non-financieres",
            // 4419…, 44311 , 44321 , 44331 , 44341 , 44351 , 44361 , 44371 , 44381 , 449 , 452 , 461C , 463… , 466 , 4671… , 46751C , 46771, 4686 , 4711 , 4712 , 4716
            comptes: {
              comptesBrut: [
                "4419*",
                "44311",
                "44321",
                "44331",
                "44341",
                "44351",
                "44361",
                "44371",
                "44381",
                "449",
                "452",
                "461C",
                "463*",
                "466",
                "4671*",
                "46751C",
                "46771",
                "4686",
                "4711",
                "4712",
                "4716",
              ],
              comptesAmortissements: [],
            },
          },
          {
            label: "PRODUITS CONSTATES D'AVANCE",
            key: "produits-constates-davance",
            // 487…
            comptes: {
              comptesBrut: ["487*"],
              comptesAmortissements: [],
            },
          },
        ],
      },
    ],
  },
  {
    label: "TRESORERIE",
    key: "tresorerie-passif",
    sections: [
      {
        label: "AUTRES ELEMENTS DE TRESORERIE PASSIVE",
        key: "autres-elements-de-tresorerie-passive",
        comptes: {
          // 5191 , 5192 , 51931 , 5194 , 5198 , 5421C , 5428C , 5186
          comptesBrut: [
            "5191",
            "5192",
            "51931",
            "5194",
            "5198",
            "5421C",
            "5428C",
            "5186",
          ],
          comptesAmortissements: [],
        },
      },
    ],
  },
];

// M57 pdf : page 23
export const COMPTE_RESULTAT_PRODUITS: ComptabiliteModele = [
  {
    label: "Produits de fonctionnement",
    key: "produits-de-fonctionnement",
    sections: [
      {
        label: "Produits sans contrepartie directe",
        key: "produits-sans-contrepartie-directe",
        categories: [
          {
            label: "Dotations de l'Etat",
            key: "dotations-de-letat",
            comptes: {
              // 741… sauf 74119, (-74119), 742, 743, 744, 745…, 746…, (-7491)
              comptesBrut: ["741*", "742", "743", "744", "745*", "746*"],
              comptesBrutsExclus: ["74119"],
              comptesNegatifs: ["74119", "7491"],
              comptesAmortissements: [],
            },
          },
          {
            label: "Participations",
            key: "participations",
            comptes: {
              // 747…
              comptesBrut: ["747*"],
            },
          },
          {
            label:
              "Compensations, autres attributions et autres participations",
            key: "compensations-autres-attributions-et-autres-participations",
            comptes: {
              // 748… sauf 74869 sauf 748719 sauf 748729, (-74869), (-748719), (-748729), (-7498)
              comptesBrut: ["748*"],
              comptesBrutsExclus: ["74869", "748719", "748729"],
              comptesNegatifs: ["74869", "748719", "748729", "7498"],
            },
          },
          {
            label: "Dons et legs",
            key: "dons-et-legs",
            comptes: {
              // 756
              comptesBrut: ["756"],
            },
          },
          {
            label: "Impôts et taxes",
            key: "impots-et-taxes",
            comptes: {
              // 73… sauf 739…, (-739…)
              comptesBrut: ["73*"],
              comptesBrutsExclus: ["739*"],
              comptesNegatifs: ["739*"],
            },
          },
        ],
      },
      {
        label: "PRODUITS AVEC CONTREPARTIE DIRECTE",
        key: "produits-avec-contrepartie-directe",
        categories: [
          {
            label: "Ventes de biens ou prestations de services",
            key: "ventes-de-biens-ou-prestations-de-services",
            comptes: {
              //70… sauf 701249 sauf 70389… sauf 70619 sauf 7068129, (-701249), (-70389...), (-70619), (-7068129), (-709)
              comptesBrut: ["70*"],
              comptesBrutsExclus: ["701249", "70389*", "70619", "7068129"],
              comptesNegatifs: ["701249", "70389*", "70619", "7068129", "709"],
            },
          },
          {
            label: "Produits des cessions d'actifs",
            key: "produits-des-cessions-dactifs",
            comptes: {
              // 775
              comptesBrut: ["775"],
            },
          },
          {
            label: "Autres produits de gestion",
            key: "autres-produits-de-gestion",
            comptes: {
              // 75… (sauf 756), 773
              comptesBrut: ["75*", "773"],
              comptesBrutsExclus: ["756"],
            },
          },
          {
            label: "Production stockée et immobilisée",
            key: "production-stockee-et-immobilisee",
            comptes: {
              // SC 713…, (-SD 713), 72…
              comptesBrut: ["713*C", "72*"],
              comptesNegatifs: ["713D"],
            },
          },
        ],
      },
      {
        label: "AUTRES PRODUITS",
        key: "autres-produits",
        categories: [
          {
            label:
              "Reprises sur amortissement, dépréciations, provisions et transferts de charges",
            key: "reprises-sur-amortissement-depreciations-provisions-et-transferts-de-charges",
            comptes: {
              // 781…, 791
              comptesBrut: ["781*", "791"],
            },
          },
          {
            label: "Reprises du financement rattaché à un actif",
            key: "reprises-du-financement-rattache-a-un-actif",
            comptes: {
              // 777
              comptesBrut: ["777"],
            },
          },
          {
            label:
              "Neutralisation des amortissements, dépréciations et provisions",
            key: "neutralisation-des-amortissements-depreciations-et-provisions",
            comptes: {
              // 7768...
              comptesBrut: ["7768*"],
            },
          },
          {
            label: "Neutralisation des moins-values de cession",
            key: "neutralisation-des-moins-values-de-cession",
            comptes: {
              // 7761
              comptesBrut: ["7761"],
            },
          },
        ],
      },
    ],
  },
];
export const COMPTE_RESULTAT_CHARGES: ComptabiliteModele = [
  {
    label: "Charges de fonctionnement",
    key: "charges-de-fonctionnement",
    sections: [
      {
        label: "Achats et charges externes",
        key: "achats-et-charges-externes",
        comptes: {
          // 601…, 602…, SD6031…, (- SC6031…), SD6032, (- SC6032), SD6037, (- SC6037),
          // 604…, 605, 606…, 607…, 608, (- 609…), 61… sauf 619, (-619), 62… sauf 629, (-629)
          comptesBrut: [
            "601*",
            "602*",
            "6031*D",
            "6032D",
            "6037D",
            "604*",
            "605",
            "606*",
            "607*",
            "608",
            "61*",
            "62*",
          ],
          comptesBrutsExclus: ["619", "629"],
          comptesNegatifs: ["6031*C", "6032C", "6037C", "609*", "619", "629"],
        },
      },
      {
        label: "Charges de personnel",
        key: "charges-de-personnel",
        categories: [
          {
            label: "Dont salaires, traitements et rémunérations diverses",
            key: "dont-salaires-traitements-et-remunerations-diverses",
            comptes: {
              // 641… sauf 6419, (-6419), 642, 643 sauf 6439, (-6439), 646, 648...
              comptesBrut: ["641*", "642", "643*", "646", "648*"],
              comptesBrutsExclus: ["6419", "6439"],
              comptesNegatifs: ["6419", "6439"],
            },
          },
          {
            label: "Dont charges sociales",
            key: "dont-charges-sociales",
            comptes: {
              // 645… sauf 6459, (-6459), 647… sauf 6479, (-6479)
              comptesBrut: ["645*", "647*"],
              comptesBrutsExclus: ["6459", "6479"],
              comptesNegatifs: ["6459", "6479"],
            },
          },
        ],
      },
      {
        label: "Indemnités des élus (et membres du CESR)",
        key: "indemnites-des-elus-et-membres-du-cesr",
        comptes: {
          // 653...
          comptesBrut: ["653*"],
        },
      },
      {
        label: "Autres charges de fonctionnement (dont pertes sur créances irrécouvrables)",
        key: "autres-charges-de-fonctionnement-dont-pertes-sur-creances-irrecoverables",
        comptes: {
          // 654…, 658…, 673
          comptesBrut: ["654*", "658*", "673"],
        },
      },
      {
        label: "Impôts et taxes",
        key: "impots-et-taxes",
        comptes: {
          // 63…
          comptesBrut: ["63*"],
        },
      },
      {
        label: "Dotations aux amortissements, dépréciations, provisions",
        key: "dotations-aux-amortissements-depreciations-provisions",
        comptes: {
          // 681…
          comptesBrut: ["681*"],
        },
      },
      {
        label: "Valeurs nettes comptables des éléments d'actifs cédés",
        key: "valeurs-nettes-comptables-des-elements-d-actifs-cedes",
        comptes: {
          // 675
          comptesBrut: ["675"],
        },
      },
      {
        label: "Neutralisation des dépréciations et provisions",
        key: "neutralisation-des-depreciations-et-provisions",
        comptes: {
          // 6768
          comptesBrut: ["6768"],
        },
      },
      {
        label: "Neutralisation des plus-values de cession",
        key: "neutralisation-des-plus-values-de-cession",
        comptes: {
          // 6761
          comptesBrut: ["6761"],
        },
      },
    ],
  },
  {
    label: "CHARGES D'INTERVENTION",
    key: "charges-dintervention",
    sections: [
      {
        label: "Dispositifs d'intervention pour compte propre",
        key: "dispositifs-dintervention-pour-compte-propre",
        categories: [
          {
            label: "Dont ménages",
            key: "dont-menages",
            comptes: {
              // 651…sauf 65182, 652…, 65741, 6565, 6566, 6567…, 6575
              comptesBrut: [
                "651*",
                "652*",
                "65741",
                "6565",
                "6566",
                "6567*",
                "6575",
              ],
              comptesBrutsExclus: ["65182"],
            }
          },
          {
            label: "Dont personnes morales de droit privé",
            key: "dont-personnes-morales-de-droit-prive",
            comptes: {
              // 65521, 65641, 65737, 65742, 65748
              comptesBrut: [
                "65521",
                "65641",
                "65737",
                "65742",
                "65748",
              ],
            }
          },
          {
            label: "Dont collectivités territoriales",
            key: "dont-collectivites-territoriales",
            comptes: {
              // 65522, 6554…, 65732, 65733, 65734…
              comptesBrut: [
                "65522",
                "6554*",
                "65732",
                "65733",
                "65734*",
              ],
            }
          },
          {
            label: "Dont autres organismes publics",
            key: "dont-autres-organismes-publics",
            comptes: {
              // 655238, 6553, 6555, 65561, 6561, 6562, 65642, 65731, 65735…, 65736…, 65738…
              comptesBrut: [
                "655238",
                "6553",
                "6555",
                "65561",
                "6561",
                "6562",
                "65642",
                "65731",
                "65735*",
                "65736*",
                "65738*",
              ],
            }
          },
          {
            label: "Dont établissements d'enseignement",
            key: "dont-etablissements-denseignement",
            comptes: {
              // 6551…, 655231
              comptesBrut: [
                "6551*",
                "655231",
              ],
            }
          }
        ]
      },
      {
        label: "Charges résultant de la mise en jeu de la garantie de la collectivité",
        key: "charges-resultant-de-la-mise-en-jeu-de-la-garantie-de-la-collectivite",
        comptes: {
          // 65182
          comptesBrut: ["65182"],
        },
      },
      {
        label: "Autres charges",
        key: "autres-charges-intervention",
        comptes: {
          // 65568, 6557…, 6558…, 65648, 6568, 6577
          comptesBrut: ["65568", "6557*", "6558*", "65648", "6568", "6577"],
        },
      }
    ]
  }
];
