

export interface BalanceResponse {
  total_count:number;
  results:BalanceCommuneResponse[];
}

export interface BalanceCommuneInfos extends BalanceCommuneResponse {
  compteLib?: string;
}

export interface BalanceCommuneResponse {
    /**  Exercice de gestion */
    exer: string
    /** N° SIRET */
    ident: string
    /** N° département. Ex : 006 */
    ndept: string
    /** Libellé du budget. (nom de ville) */
    lbudg: string
    /** Code INSEE  */
    insee: string
    /** Type de budget : 
     * - Budget principal  ("1")
     * - Budget principal rattaché (CCAS, CDE…) ("2") 
     * - Budget annexe ("3")
     */
    cbudg: "1" | "2" | "3"
    /** Type d'établissement */
    ctype: string
    /** Sous-type d'établissement */
    cstyp: string
    /** Nomenclature comptable (M14, M57...) */
    nomen: string
    /** Les 9  premiers caractères du n° SIRET ; 
     * Le SIREN d'un budget principal X est identique au SIREN du/ou des Budget(s) annexe(s) du Budget principal X
     * SIREN BPx = SIREN BA du BPx */
    siren: string
    /** Code région */
    cregi: string
    /** Code activité */
    cacti: string
    /** Code secteur */
    secteur: any
    /** N° FINESS
     * Pour les budgets annexes sociaux et médico-sociaux rattachés à une collectivité territoriale, EPCI ou EPL
     */
    finess: any
    /** Code budget
     * Pour les budgets annexes sociaux et médico-sociaux rattachés à une collectivité territoriale, EPCI ou EPL
     */
    codbud1: any
    /**
     * Catégorie de collectivité
     * Commune  - PARIS - CTU - DEPT -  EPL  - EPT -  - GFP -  ML - SYND - REG -                
     * Cf. onglet "Codif_données_d'identification"
     */
    categ: string
    /** Type de balance. "DEF" = définitive */
    bal: string
    /** N° du compte dans le plan comptable */
    compte: string
    /** Balance d'entrée débit */
    bedeb: number
    /** Balance d'entrée crédit */
    becre: number
    /** Opération budgétaire débit nette des annulations
     * Opérations d'ordre budgétaires comprises
     */
    obnetdeb: number
    /** Opération budgétaire crédit nette des annulations
     * Opérations d'ordre budgétaires comprises
     */
    obnetcre: number
    /** Opération Non Budgétaire Débit (1) */
    onbdeb: number
    /** Opération Non Budgétaire Crédit (1) */
    onbcre: number
    /** Opération d'Ordre Budgétaire Débit (2) */
    oobdeb: number
    /** Opération d'Ordre Budgétaire Crédit (2) */
    oobcre: number
    /** Solde débiteur
     * max(0,sum(BEDEB,-BECRE,OBNETDEB,-OBNETCRE,ONBDEB,-ONBCRE))
     */
    sd: number
    /**
     * Solde créditeur
     * max(0,sum(BECRE,-BEDEB,OBNETCRE,-OBNETDEB,ONBCRE,-ONBDEB))
     */
    sc: number

    propTarget: "sc" | "sd";
  }
/*
CTYPE

  Collectivités territoriales
  101	Communes (BP)
201	Départements (BP)
301	Régions (BP)
701	Collectivités territoriales uniques (BP) (Guyane Martinique Corse)
702	Ville de Paris  (BP)
410	Communes (BA) 
420	Départements (BA) 
430	Régions (BA)
490	Collectivités territoriales uniques (BA)
497	Ville de Paris (BA)

Établissements publics de coopération intercommunale (EPCI)                 
Dont Groupements à fiscalité propre (GFP)
401	GFP - CU - Communautés Urbaines (BP)
402	GFP - CA - Communautés d’Agglomérations (BP)
403	GFP - CC – Communautés de Communes (BP)
405	GFP - MET – Métropoles (BP)
705	Métropole de Lyon (BP)
421	SIVU – Syndicats à Vocation Unique (BP)
422	SIVOM – Syndicats à Vocation Multiple (BP)
423	Pôles métropolitains (BP)
424	Pôles d'équilibre territorial et rural (BP)
425	EPT – Établissements publics territoriaux (BP)
440	Groupements de communes à fiscalité propre (CU,CA, CC, SAN et MET)    (BA)
450	Groupements de communes non fiscalisés  (Syndicats + Pôles)      (BA)
495	Métropole de Lyon   (BA)

Établissements publics locaux (EPL)
431	CCAS - CIAS - Centres communaux et intercommunaux d’action sanitaire et sociale  (BP)
432	CDE – Caisses des Écoles   (BP)
433	Régies personnalisées (BP)
434	SDIS - Services Départementaux d’Incendie et de Secours   (BP)
435	CDGFPT - Centres Départementaux de Gestion de la Fonction Publique Territoriale    (BP)
436	Associations Syndicales Autorisées / Associations Foncières Urbaines / Associations Foncières Rurales (BP)
437	Établissements publics administratifs  (BP)
438	Préfecture de Police de Paris (BP)
439	Sections de communes (BP)
480	Établissements publics fonciers locaux (EPFL)   (BP)
536	CAS Paris
539	DNA Paris (BA)
544	SSIAD Paris (BA)
545	Autres activités Paris (BA)
551	Ehpad Paris (BA)
901	Groupements d'intérêt public – sauf GIPMDPH (BP)
460	EPL (CCAS, CIAS, CDE, régies, SDIS, CGFPT, ASSOC, EPA)     (BA)

Budgets annexes EPSM rattachés à une collectivité territoriale, EPCI ou EPL
581	EHPAD  - Établissement d'Hébergement pour personnes Âgées Dépendantes (BA de CCAS, CIAS ou de département)
582	Foyers-Logements (BA)
583	Centres d'hébergement et de Réadaptation Sociale (BA)
584	Instituts Médico-Educatif (BA)
585	Maisons d'Accueil Spécialisé (BA)
586	Autres établissements (BA)
587	Services de soins à domicile (sans soins médicaux) (BA)
588	Services de soins infirmiers à domicile (avec soins médicaux) (BA)
589	Petite enfance (BA)
*/

export type ComptabiliteModele  = ComptabiliteChapitre[];

export type ComptabiliteChapitre = {
  label: string; // ACTIF IMMOBILISE...
  sections : ComptabiliteSection[];
  key: string;
}

export type ComptabiliteSection = {
  label: string; // IMMOBILISATIONS INCORPORELLES...
  categories?: ComptabiliteCategory[];
  comptes?: ComptabiliteCompte;
  key: string;
}

export type ComptabiliteCategory = {
  label: string; // Subventions d'investissement versées...
  comptes: ComptabiliteCompte;
  key: string;
}

export type ComptabiliteCompte = {
  comptesBrut: string[];
  comptesAmortissements: string[];
  comptesBrutsExclus?: string[];
  comptesNegatifs?: string[];
}