

import Communes from "../../_components/commune";
import Departement from "../../_components/departement";
import Region from "../../_components/region";
import Collectivite from "../../_components/collectivite";
import { Suspense } from "react";

export async function generateStaticParams() {
  return [
    { type: "communes" },
    { type: "departements" },
    { type: "regions" },
    { type: "collectivites" },
  ];
}

export default function Type({ params }: { params: { type: string } }) {
  const type = params.type;
  
  return (
    <Suspense>
      {type === "communes" && <Communes />}
      {type === "departements" && <Departement />}
      {type === "regions" && <Region />}
      {type === "collectivites" && <Collectivite />}
    </Suspense>
  );
}
