import Link from 'next/link'

export default function Home() {


  return (
    <>
      <h1>Tableau de bord : comptabilité des collectivités territoriales</h1>
      <p>Retrouvez la comptabilité des communes, départements, régions et collectivités inter-urbaines sur ce site.</p>

      <h2>Les plus grandes communes :</h2>
      
      <ul>
        <li><Link href="/budgets/communes?commune=75056">Paris</Link></li>
        <li><Link href="/budgets/communes?commune=13055">Marseille</Link></li>
        <li><Link href="/budgets/communes?commune=69123">Lyon</Link></li>
        <li><Link href="/budgets/communes?commune=31555">Toulouse</Link></li>
        <li><Link href="/budgets/communes?commune=06088">Nice</Link></li>
        <li><Link href="/budgets/communes?commune=44109">Nantes</Link></li>
        <li><Link href="/budgets/communes?commune=34172">Montpellier</Link></li>
        <li><Link href="/budgets/communes?commune=67482">Strasbourg</Link></li>
        <li><Link href="/budgets/communes?commune=33063">Bordeaux</Link></li>
        <li><Link href="/budgets/communes?commune=59350">Lille</Link></li>
      </ul>

      <h2>Les plus grands départements :</h2> 
      <ul>
        <li><Link href="/budgets/departements?departement=75">Paris</Link></li>
        <li><Link href="/budgets/departements?departement=13">Bouches-du-Rhône</Link></li>
        <li><Link href="/budgets/departements?departement=59">Nord</Link></li>
        <li><Link href="/budgets/departements?departement=69">Rhône</Link></li>
        <li><Link href="/budgets/departements?departement=92">Hauts-de-Seine</Link></li>
        <li><Link href="/budgets/departements?departement=93">Seine-Saint-Denis</Link></li>
        <li><Link href="/budgets/departements?departement=94">Val-de-Marne</Link></li>
        <li><Link href="/budgets/departements?departement=33">Gironde</Link></li>
      </ul>

      <h2>Les plus grandes régions :</h2> 
      <ul>
        <li><Link href="/budgets/regions?region=11">Ile-de-France</Link></li>
        <li><Link href="/budgets/regions?region=84">Auvergne-Rhône-Alpes</Link></li>
        <li><Link href="/budgets/regions?region=75">Nouvelle-Aquitaine</Link></li>
        <li><Link href="/budgets/regions?region=76">Occitanie</Link></li>
        <li><Link href="/budgets/regions?region=32">Hauts-de-France</Link></li>
        <li><Link href="/budgets/regions?region=93">Provence-Alpes-Côte d'Azur</Link></li>
        <li><Link href="/budgets/regions?region=44">Grand Est</Link></li>
        <li><Link href="/budgets/regions?region=52">Pays de la Loire</Link></li>
      </ul>

    </>
  );
}
