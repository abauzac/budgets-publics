import {
  BalanceCommuneInfos,
  ComptabiliteCompte,
  ComptabiliteModele,
  ComptabiliteSection,
} from "../_utils/types";
import { getListeComptesForComptabilite, toEuro } from "../_utils/utils";

export function LigneComptable({
  ligne,
  listeComptes,
  label,
  propertyCompte = "sd",
}: {
  ligne: ComptabiliteCompte;
  listeComptes: BalanceCommuneInfos[];
  label: string;
  propertyCompte: "sd" | "sc";
}) {
  let listeComptesBruts = getListeComptesForComptabilite(
    ligne.comptesBrut,
    listeComptes,
    propertyCompte
  );
  const listeComptesAmortissements = getListeComptesForComptabilite(
    ligne.comptesAmortissements ?? [],
    listeComptes,
    propertyCompte
  );
  if (ligne.comptesBrutsExclus && ligne.comptesBrutsExclus.length > 0)
    listeComptesBruts = listeComptesBruts.filter(
      (c) => ligne.comptesBrutsExclus?.indexOf(c.compte) === -1
    );

  if (ligne.comptesNegatifs && ligne.comptesNegatifs.length > 0)
    listeComptesBruts.forEach((c) => {
      if (ligne.comptesNegatifs?.indexOf(c.compte) !== -1) {
        c[c.propTarget] = c[c.propTarget] * -1;
      }
    });
  const totalBrut = listeComptesBruts.reduce(
    (acc, curr) => acc + (curr[curr.propTarget] ?? 0),
    0
  );
  const totalAmortissements = listeComptesAmortissements.reduce(
    (acc, curr) => acc + ((curr["sc"] ? curr["sc"] : curr["sd"]) ?? 0),
    0
  );
  const totalNet = totalBrut - totalAmortissements;

  if (totalBrut === 0 && totalAmortissements === 0 && totalNet === 0)
    return null;

  return (
    <div className="d-flex flex-row justify-content-center ligneComptable">
      <div style={{ width: "400px", textAlign: "left" }}>{label}</div>
      <div className="ligneComptableMontant">{totalAmortissements > 0 ? toEuro(totalBrut) : ""}</div>
      <div className="ligneComptableMontant">{totalAmortissements > 0 ? toEuro(totalAmortissements) : ""}</div>
      <div className="ligneComptableMontant">{toEuro(totalNet)}</div>
    </div>
  );
}

export function SectionComptableTotal({
  ligne,
  listeComptes,
  propertyCompte = "sd",
}: {
  ligne: ComptabiliteSection;
  listeComptes: BalanceCommuneInfos[];
  propertyCompte: "sd" | "sc";
}) {
  let listeComptesBruts: BalanceCommuneInfos[] = [];
  let listeComptesAmortissements: BalanceCommuneInfos[] = [];
  let totalBrut = 0;
  let totalAmortissements = 0;
  let totalNet = 0;
  if (ligne.comptes!) {
    listeComptesBruts = getListeComptesForComptabilite(
      ligne.comptes.comptesBrut,
      listeComptes,
      propertyCompte
    );
    listeComptesAmortissements = getListeComptesForComptabilite(
      ligne.comptes.comptesAmortissements ?? [],
      listeComptes,
      propertyCompte
    );
    if (
      ligne.comptes.comptesBrutsExclus &&
      ligne.comptes.comptesBrutsExclus.length > 0
    )
      listeComptesBruts = listeComptesBruts.filter(
        (c) => ligne.comptes?.comptesBrutsExclus?.indexOf(c.compte) === -1
      );
    if (
      ligne.comptes.comptesNegatifs &&
      ligne.comptes.comptesNegatifs.length > 0
    )
      listeComptesBruts.forEach((c) => {
        if (ligne.comptes?.comptesNegatifs?.indexOf(c.compte) !== -1) {
          c.sd = c.sd * -1;
        }
      });
  } else if (ligne.categories) {
    ligne.categories.forEach((category) => {
      const categoryComptesBruts = getListeComptesForComptabilite(
        category.comptes.comptesBrut,
        listeComptes
      );
      listeComptesBruts = listeComptesBruts.concat(categoryComptesBruts);
    });
    ligne.categories.forEach((category) => {
      const categoryComptesAmortissements = getListeComptesForComptabilite(
        category.comptes.comptesAmortissements ?? [],
        listeComptes
      );
      listeComptesAmortissements = listeComptesAmortissements.concat(
        categoryComptesAmortissements
      );
    });
    ligne.categories.forEach((category) => {
      if (
        category.comptes.comptesBrutsExclus &&
        category.comptes.comptesBrutsExclus.length > 0
      )
        listeComptesBruts = listeComptesBruts.filter(
          (c) => category.comptes?.comptesBrutsExclus?.indexOf(c.compte) === -1
        );
    });
    ligne.categories.forEach((category) => {
      if (
        category.comptes.comptesNegatifs &&
        category.comptes.comptesNegatifs.length > 0
      )
        listeComptesBruts.forEach((c) => {
          if (category.comptes?.comptesNegatifs?.indexOf(c.compte) !== -1) {
            c.sd = c.sd * -1;
          }
        });
    });
  }

  totalBrut = listeComptesBruts.reduce(
    (acc, curr) => acc + (curr[propertyCompte] ?? 0),
    0
  );
  totalAmortissements = listeComptesAmortissements.reduce(
    (acc, curr) => acc + ((curr["sc"] ? curr["sc"] : curr["sd"]) ?? 0),
    0
  );
  totalNet = totalBrut - totalAmortissements;

  return (
    <div className="d-flex flex-row justify-content-center ligneComptable totalComptable">
      <div style={{ width: "400px", textAlign: "left", fontWeight: "bold" }}>
        TOTAL
      </div>
      <div className="ligneComptableMontant">{totalAmortissements > 0 ? toEuro(totalBrut) : ""}</div>
      <div className="ligneComptableMontant">{totalAmortissements > 0 ? toEuro(totalAmortissements) : ""}</div>
      <div className="ligneComptableMontant">{toEuro(totalNet)}</div>
    </div>
  );
}

export function ModeleComptable({
  modele,
  listeComptes,
  nomenclature,
  propertyCompte,
  includeAmortissements = false
}: {
  modele: ComptabiliteModele;
  listeComptes: BalanceCommuneInfos[];
  nomenclature: any[];
  propertyCompte: "sd" | "sc"; // probably not a good idea. Should be in comptabilite.ts i guess
  includeAmortissements?: boolean;
}) {
  if (listeComptes.length == 0 || !nomenclature || nomenclature.length == 0)
    return <p>Aucune comptabilité trouvée pour l'année sélectionnée</p>;

  return (
    <div className="comptaModele">
      {modele.map((ligne, idx) => {
        return (
          <div key={idx + "modeleChapitre"}>
            <h4>{ligne.label}</h4>
            {ligne.sections.map((section, idxSection) => {
              return (
                <div
                  key={idx + "modeleSection" + idxSection}
                  className="comptaModeleSection"
                >
                  <h5 style={{ textAlign: "left", margin: "0 auto" }}>
                    {section.label}
                  </h5>
                  {includeAmortissements &&
                  <div className="comptaModeleCategory">
                    <div className="d-flex flex-row justify-content-center ligneComptable">
                      <div style={{ width: "400px", textAlign: "left" }}>&nbsp;</div>
                      <div className="ligneComptableMontant"><b>Brut</b></div>
                      <div className="ligneComptableMontant"><b>Amortissement</b></div>
                      <div className="ligneComptableMontant"><b>Net</b></div>
                    </div>
                  </div>}
                  {section.categories &&
                    section.categories.map((category, idxCategory) => {
                      return (
                        <div
                          key={
                            idx + "modeleCategory" + idxSection + idxCategory
                          }
                          className="comptaModeleCategory"
                        >
                          <LigneComptable
                            ligne={category.comptes}
                            listeComptes={listeComptes}
                            label={category.label}
                            propertyCompte={propertyCompte}
                          ></LigneComptable>
                        </div>
                      );
                    })}
                  {section.comptes && (
                    <LigneComptable
                      ligne={section.comptes}
                      listeComptes={listeComptes}
                      label={section.label}
                      propertyCompte={propertyCompte}
                    ></LigneComptable>
                  )}
                  <SectionComptableTotal
                    ligne={section}
                    listeComptes={listeComptes}
                    propertyCompte={propertyCompte}
                  ></SectionComptableTotal>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
