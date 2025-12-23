import {
  urlDataCommunesIdentifiers,
  urlDataDepartementsIdentifiers,
  urlDataEconomieTemplate,
  urlDataGroupementFiscalitePropreIdentifiers,
  urlDataRegionsIdentifiers,
} from "../_utils/charts";

export default function APropos() {
  return (
    <>
      <h1>A propos</h1>
      <p>
        Ce site web est un tableau de bord des finances locales en France. Il
        permet de visualiser les données de comptabilité des collectivités
        locales (communes, départements, régions) en France.
      </p>
      <p>
        Des bugs peuvent subsister, n'hésitez pas à ouvrir un ticket ou à
        suggérer des améliorations sur&nbsp;
        <a href="https://github.com/abauzac/budgets-publics">GitHub</a>.
      </p>
      <h2>Sources des données</h2>
      <p>
        Les données sont issues de la base de données du Ministère de l'économie
        :
      </p>
      <ul>
        <li>
          Communes :{" "}
          <ul>
            {urlDataCommunesIdentifiers.map((id) => {
              const url = urlDataEconomieTemplate
                .replace("[IDENTIFIER]", id)
                .replace("/records", "/information")
                .replace(
                  "api/explore/v2.1/catalog/datasets",
                  "explore/dataset"
                );

              return (
                <li key={id}>
                  <a href={url}>{id.replaceAll("-", " ")}</a>
                </li>
              );
            })}
          </ul>
          et{" "}
          <ul>
            <li>
              <a href="https://data.economie.gouv.fr/explore/dataset/balances-comptables-des-communes-en-2023/information/">
                Balance comptable des communes
              </a>
            </li>
          </ul>
        </li>
        <li>
          Groupement à fiscalité propre :
          <ul>
            {urlDataGroupementFiscalitePropreIdentifiers.map((id) => {
              const url = urlDataEconomieTemplate
                .replace("[IDENTIFIER]", id)
                .replace("/records", "/information")
                .replace(
                  "api/explore/v2.1/catalog/datasets",
                  "explore/dataset"
                );
              return (
                <li key={id}>
                  <a href={url}>{id.replaceAll("-", " ")}</a>
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          Départements :{" "}
          <ul>
            {urlDataDepartementsIdentifiers.map((id) => {
              const url = urlDataEconomieTemplate
                .replace("[IDENTIFIER]", id)
                .replace("/records", "/information")
                .replace(
                  "api/explore/v2.1/catalog/datasets",
                  "explore/dataset"
                );
              return (
                <li key={id}>
                  <a href={url}>{id.replaceAll("-", " ")}</a>
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          Régions :{" "}
          <ul>
            <li>
              {urlDataRegionsIdentifiers.map((id) => {
                const url = urlDataEconomieTemplate
                  .replace("[IDENTIFIER]", id)
                  .replace("/records", "/information")
                  .replace(
                    "api/explore/v2.1/catalog/datasets",
                    "explore/dataset"
                  );
                return (
                  <li key={id}>
                    <a href={url}>{id.replaceAll("-", " ")}</a>
                  </li>
                );
              })}
            </li>
          </ul>
        </li>
        
      </ul>
      <hr />
      <p>
        <a href="https://abauzac.github.io/budgets-publics/">
          Tableau de bord des collectivités
        </a>{" "}
        by{" "}
        <a href="https://www.linkedin.com/in/amaury-bauzac-08829717/">
          Amaury Bauzac
        </a>{" "}
        is licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
          style={{ display: "inline-block" }}
        >
          CC BY 4.0
        </a>
      </p>
    </>
  );
}
