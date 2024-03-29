export enum TypeDataSet {
  Commune = "comptes-individuels-des-communes-fichier-global-a-compter-de-2000",
  Departement = "TODO",
  Region = "TODO",
}

export function getCommuneQueryConfig(
  dataset: TypeDataSet,
  codeDep: string,
  communeName: string
) {
  return {
    dataset: dataset,
    options: {
      "refine.dep": codeDep,
      "refine.icom": communeName.toLowerCase(),
    },
  };
}
