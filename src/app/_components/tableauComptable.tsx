import { useEffect, useState } from "react";
import {
  getComptesForCommune,
  getNomenclature,
  getUrlForComptaCommune,
  getUrlForComptaDepartement,
  toEuro,
  transformDepCodeToCollectiviteDept,
} from "../_utils/utils";
import { BalanceCommuneInfos } from "../_utils/types";
import { useModal } from "../_contexts/ComptabiliteModalContext";

//https://www.collectivites-locales.gouv.fr/sites/default/files/migration/plaquette_m14_2019.pdf
function ComptaList({
  listeComptes,
  classe,
  nomenclature,
}: {
  listeComptes: BalanceCommuneInfos[];
  classe: string;
  nomenclature: any[];
}) {
  const { handleOpen } = useModal();

  if (!listeComptes || listeComptes.length == 0) return <div>-</div>;

  let comptesForClasse = Object.groupBy(
    listeComptes.filter((c) => c.compte.startsWith(classe)),
    (item) => item.compte.substring(0, 2)
  );

  if (!comptesForClasse) return <div>Error</div>;

  return (
    <div>
      {Object.keys(comptesForClasse).map((sousClasse) => (
        <div key={"sousclass" + sousClasse}>
          <h6 style={{ marginTop: "1em", marginLeft: "1em" }}>
            {sousClasse}{" "}
            {nomenclature.find((m) => m.c == sousClasse)?.lib ??
              "Sous classe inconnue"}
          </h6>
          <table>
            <thead>
              <tr>
                <th style={{ width: "50%" }}>Compte</th>
                <th style={{ width: "25%", textAlign: "right" }}>
                  Solde débiteur
                </th>
                <th style={{ width: "25%", textAlign: "right" }}>
                  Solde créditeur
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {comptesForClasse[sousClasse]?.map((compte) => (
                <tr key={`sousclasse${compte.compte}`}>
                  <td>
                    {nomenclature.find((cm) => cm.c === compte.compte)?.lib ??
                      "Compte inconnu"}{" "}
                    ({compte.compte})
                  </td>
                  <td style={{ textAlign: "right" }}>{toEuro(compte.sd)}</td>
                  <td style={{ textAlign: "right" }}>{toEuro(compte.sc)}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleOpen(e, compte)}
                  >
                    &#x1F6C8;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default function TableauComptable({
  codeCible,
  codeParent = "",
  collectivite = "commune",
  year = 2024,
}: {
  codeCible: string;
  codeParent: string;
  collectivite: "commune" | "departement";
  year: number;
}) {
  const codeDep: string =
    transformDepCodeToCollectiviteDept(codeParent, true) || "";
  const [listeComptes, setListeComptes] = useState<BalanceCommuneInfos[]>([]);
  const [chargement, setChargement] = useState<boolean>(true);
  const [nomenclature, setNomenclature] = useState<any[]>([]);

  async function GetComptes() {
    setChargement(true);
    if (collectivite == "commune") {
      const urlFinale = getUrlForComptaCommune(
        codeDep,
        codeCible.substring(2),
        year
      );
      let comptesCommune: BalanceCommuneInfos[] = await getComptesForCommune(
        urlFinale
      );
      if (comptesCommune.length == 0) {
        setChargement(false);
        return;
      }
      setNomenclature(getNomenclature(comptesCommune[0]));
      comptesCommune.sort((cca, ccb) => cca.compte.localeCompare(ccb.compte));
      setListeComptes(comptesCommune);
    } else if (collectivite == "departement") {
      if (codeCible.length != 3) codeCible = codeCible.padStart(3, "0");

      const urlFinale = getUrlForComptaDepartement(codeCible, year);

      let comptesDepartements: BalanceCommuneInfos[] = await getComptesForCommune(
        urlFinale
      );
      if (comptesDepartements.length == 0) {
        setChargement(false);
        return;
      }
      setNomenclature(getNomenclature(comptesDepartements[0]));
      comptesDepartements.sort((cca, ccb) => cca.compte.localeCompare(ccb.compte));
      setListeComptes(comptesDepartements);
    }
    setChargement(false);
  }

  useEffect(() => {
    if (listeComptes.length == 0) GetComptes();
  }, []);

  useEffect(() => {
    GetComptes();
  }, [year, codeCible]);

  if (chargement) return <div>Chargement</div>;

  if (listeComptes.length == 0)
    return <p>Aucune comptabilité trouvée pour l'année sélectionnée</p>;

  return (
    <div className="comptaTable">
      <details>
        <summary>
          <h5>1 - Comptes de capitaux</h5>
        </summary>
        <ComptaList
          classe="1"
          listeComptes={listeComptes}
          nomenclature={nomenclature}
        ></ComptaList>
      </details>
      <details>
        <summary>
          <h5>2 - Comptes d'immobilisations</h5>
        </summary>
        <ComptaList
          classe="2"
          listeComptes={listeComptes}
          nomenclature={nomenclature}
        ></ComptaList>
      </details>

      <details>
        <summary>
          <h5>3 - Comptes de stocks et en-cours</h5>
        </summary>
        <ComptaList
          classe="3"
          listeComptes={listeComptes}
          nomenclature={nomenclature}
        ></ComptaList>
      </details>

      <details>
        <summary>
          <h5>4 - Comptes de tiers</h5>
        </summary>
        <ComptaList
          classe="4"
          listeComptes={listeComptes}
          nomenclature={nomenclature}
        ></ComptaList>
      </details>

      <details>
        <summary>
          <h5>5 - Comptes financiers</h5>
        </summary>
        <ComptaList
          classe="5"
          listeComptes={listeComptes}
          nomenclature={nomenclature}
        ></ComptaList>
      </details>

      <details>
        <summary>
          <h5>6 - Comptes de charges</h5>
        </summary>
        <ComptaList
          classe="6"
          listeComptes={listeComptes}
          nomenclature={nomenclature}
        ></ComptaList>
      </details>

      <details>
        <summary>
          <h5>7 - Comptes de produits</h5>
        </summary>
        <ComptaList
          classe="7"
          listeComptes={listeComptes}
          nomenclature={nomenclature}
        ></ComptaList>
      </details>
    </div>
  );
}
