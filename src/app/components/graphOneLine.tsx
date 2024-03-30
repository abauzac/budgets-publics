import { getUrlForCollectivite } from "../utils/utils";

export default function GraphOneLine({ code, collectivite, typeChart }) {

  const urlFinale = getUrlForCollectivite(collectivite, code, typeChart);

  return (
    <div className="d-flex justify-content-center">
    <iframe src={urlFinale} width="600" height="400" frameBorder="0"></iframe>
  </div>
  );
}
