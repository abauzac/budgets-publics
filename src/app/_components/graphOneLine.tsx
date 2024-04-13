import { getTypeChart, getUrlForCollectivite } from "../_utils/utils";

export default function GraphOneLine({
  code,
  collectivite,
  typeChart,
  prefix,
  suffix,
}: {
  code: string;
  collectivite: string;
  typeChart: string;
  prefix?: string;
  suffix?: string;
}) {
  const typeChartFormatted = getTypeChart(typeChart, prefix, suffix)
  const urlFinale = getUrlForCollectivite(collectivite, code, typeChartFormatted);

  return (
    <div className="d-flex justify-content-center">
      <iframe src={urlFinale} style={{maxWidth: '600px', width: '100%'}} height="400" frameBorder="0"></iframe>
    </div>
  );
}
