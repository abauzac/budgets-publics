import { useEffect, useState } from "react";
import {
  getComptesForCommune,
  getUrlForComptaCommune,
  transformDepCodeToCollectiviteDept,
} from "../_utils/utils";
import { BalanceCommuneInfos, BalanceCommuneResponse } from "../_utils/types";
import comptesM14 from "../../../public/json/m14.json";

//https://www.collectivites-locales.gouv.fr/sites/default/files/migration/plaquette_m14_2019.pdf
function ComptaList({
  listeComptes,
  classe,
}: {
  listeComptes: BalanceCommuneInfos[];
  classe: string;
}) {
  if (!listeComptes) return <div>-</div>;

  let comptesForClasse = Object.groupBy(
    listeComptes.filter((c) => c.compte.startsWith(classe)),
    (item) => item.compte.substring(0, 2)
  );

  if (!comptesForClasse) return <div>Error</div>;

  return (
    <div>
      {Object.keys(comptesForClasse).map((sousClasse) => (
        <>
          <h6 style={{marginTop: "1em", marginLeft: "1em"}}>
            {sousClasse} {comptesM14.find((m) => m.c == sousClasse)?.lib ??
              "Sous classe inconnue"}
          </h6>
          <table>
            <thead>
              <th style={{ width: "50%" }}>Compte</th>
              <th style={{ width: "25%", textAlign: "right" }}>Débit</th>
              <th style={{ width: "25%", textAlign: "right" }}>Crédit</th>
            </thead>
            <tbody>
              {comptesForClasse[sousClasse]?.map((compte) => (
                <tr key={`sousclasse${compte.compte}`}>
                  <td>
                    {compte.compteLib} ({compte.compte})
                  </td>
                  <td style={{textAlign: "right"}}>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(compte.sd)}
                  </td>
                  <td style={{textAlign: "right"}}>{new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(compte.sc)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ))}
    </div>
  );
}

export default function TableauComptable({
  codeCible,
  codeParent,
  collectivite,
  year,
}: {
  codeCible: string;
  codeParent: string;
  collectivite: string;
  year: number;
}) {
  const codeDep: string =
    transformDepCodeToCollectiviteDept(codeParent, true) || "";
  const urlFinale = getUrlForComptaCommune(
    codeDep,
    codeCible.substring(2),
    year
  );
  const [listeComptes, setListeComptes] = useState<BalanceCommuneInfos[]>([]);
  const [chargement, setChargement] = useState<boolean>(true);

  async function GetComptes() {
    setChargement(true)
    let comptesCommune: BalanceCommuneInfos[] = await getComptesForCommune(
      urlFinale
    );
    comptesCommune.forEach((c) => {
      (c as BalanceCommuneInfos).compteLib =
        comptesM14.find((cm) => cm.c === c.compte)?.lib ?? "Compte inconnu";
    });
    comptesCommune.sort((cca, ccb) => cca.compte.localeCompare(ccb.compte));
    setListeComptes(comptesCommune);
    setChargement(false);
  }


  useEffect(() => {
    if (listeComptes.length == 0) GetComptes();
  }, []);

  useEffect(()=>{
    GetComptes()
  }, [year, codeCible])

  if (chargement) return <div>Chargement</div>;

  if(listeComptes.length == 0)
    return <p>Aucune comptabilité trouvée pour l'année sélectionnée</p>

  return (
    <div className="comptaTable">
      <details >
        <summary><h5>1 - Comptes de capitaux</h5></summary>
        <ComptaList classe="1" listeComptes={listeComptes}></ComptaList>
      </details>
      <details >
        <summary><h5>2 - Comptes d'immobilisations</h5></summary>
        <ComptaList classe="2" listeComptes={listeComptes}></ComptaList>
      </details>

      <details>
        <summary><h5>3 - Comptes de stocks et en-cours</h5></summary>
        <ComptaList classe="3" listeComptes={listeComptes}></ComptaList>
      </details>

      <details>
        <summary><h5>4 - Comptes de tiers</h5></summary>
        <ComptaList classe="4" listeComptes={listeComptes}></ComptaList>
      </details>

      <details >
        <summary><h5>5 - Comptes financiers</h5></summary>
        <ComptaList classe="5" listeComptes={listeComptes}></ComptaList>
      </details>

      <details >
        <summary><h5>6 - Comptes de charges</h5></summary>
        <ComptaList classe="6" listeComptes={listeComptes}></ComptaList>
      </details>

      <details >
        <summary><h5>7 - Comptes de produits</h5></summary>
        <ComptaList classe="7" listeComptes={listeComptes}></ComptaList>
      </details>

    </div>
  );
}
