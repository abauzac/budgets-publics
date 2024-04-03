import { getUrlForCollectivite } from "../_utils/utils";

export default function GraphOneLine({ code, collectivite, typeChart }: { code: string, collectivite: string, typeChart: string }) {

  const urlFinale = getUrlForCollectivite(collectivite, code, typeChart);

  return (
    <div className="d-flex justify-content-center">
    <iframe src={urlFinale} width="600" height="400" frameBorder="0"></iframe>
  </div>
  );
}
