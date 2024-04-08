
export default function Home() {


  return (
    <>
      <h1>Tableau de bord : comptabilité des collectivités territoriales</h1>
      <p>Retrouvez la comptabilité des communes, départements, régions et collectivités inter-urbaines sur ce site.</p>

      <h2>Les plus grandes communes :</h2>
      
      <ul>
        <li><a href="/budgets/communes?commune=75056">Paris</a></li>
        <li><a href="/budgets/communes?commune=13055">Marseille</a></li>
        <li><a href="/budgets/communes?commune=69123">Lyon</a></li>
        <li><a href="/budgets/communes?commune=31555">Toulouse</a></li>
        <li><a href="/budgets/communes?commune=06088">Nice</a></li>
        <li><a href="/budgets/communes?commune=44109">Nantes</a></li>
        <li><a href="/budgets/communes?commune=34172">Montpellier</a></li>
        <li><a href="/budgets/communes?commune=67482">Strasbourg</a></li>
        <li><a href="/budgets/communes?commune=33063">Bordeaux</a></li>
        <li><a href="/budgets/communes?commune=59350">Lille</a></li>
      </ul>

      <h2>Les plus grands départements :</h2> 
      <ul>
        <li><a href="/budgets/departements?departement=75">Paris</a></li>
        <li><a href="/budgets/departements?departement=13">Bouches-du-Rhône</a></li>
        <li><a href="/budgets/departements?departement=59">Nord</a></li>
        <li><a href="/budgets/departements?departement=69">Rhône</a></li>
        <li><a href="/budgets/departements?departement=92">Hauts-de-Seine</a></li>
        <li><a href="/budgets/departements?departement=93">Seine-Saint-Denis</a></li>
        <li><a href="/budgets/departements?departement=94">Val-de-Marne</a></li>
        <li><a href="/budgets/departements?departement=33">Gironde</a></li>
      </ul>

      <h2>Les plus grandes régions :</h2> 
      <ul>
        <li><a href="/budgets/regions?region=11">Ile-de-France</a></li>
        <li><a href="/budgets/regions?region=84">Auvergne-Rhône-Alpes</a></li>
        <li><a href="/budgets/regions?region=75">Nouvelle-Aquitaine</a></li>
        <li><a href="/budgets/regions?region=76">Occitanie</a></li>
        <li><a href="/budgets/regions?region=32">Hauts-de-France</a></li>
        <li><a href="/budgets/regions?region=93">Provence-Alpes-Côte d'Azur</a></li>
        <li><a href="/budgets/regions?region=44">Grand Est</a></li>
        <li><a href="/budgets/regions?region=52">Pays de la Loire</a></li>
      </ul>

    </>
  );
}
