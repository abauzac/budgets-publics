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
        Les données sont issues de la base de données du Ministère de l'économie
        :
      </p>
      <ul>
        <li>
          Communes :{" "}
          <a href="https://data.economie.gouv.fr/explore/dataset/comptes-individuels-des-communes-fichier-global-a-compter-de-2000/table/">
            Comptes individuels des communes
          </a>{" "}
          et{" "}
          <a href="https://data.economie.gouv.fr/explore/dataset/balances-comptables-des-communes-en-2023/information/">
            Balance comptable des communes
          </a>
        </li>
        <li>
          Départements :{" "}
          <a href="https://data.economie.gouv.fr/explore/dataset/comptes-individuels-des-departements-et-des-collectivites-territoriales-uniques0/table/">
            Comptes individuels des départements & collectivités territoriales
            uniques
          </a>
        </li>
        <li>
          Régions :{" "}
          <a href="https://data.economie.gouv.fr/explore/dataset/comptes-individuels-des-regions-fichier-global/table/">
            Comptes individuels des régions
          </a>
        </li>
        <li>
          Collectivités :{" "}
          <a href="https://data.economie.gouv.fr/explore/dataset/comptes-individuels-des-groupements-a-fiscalite-propre-fichier-global-a-compter-/table/">
            Comptes individuels des groupements à fiscalité propre
          </a>
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
