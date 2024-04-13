import { getTypeCharts, getUrlForCollectivite } from "../_utils/utils";

export type Graph = {
  description: string;
  yAxis: string;
  color: string;
};

export default function GraphMultiLines({
  code,
  collectivite,
  graphs,
  prefix,
  suffix,
}: {
  code: string;
  collectivite: string;
  graphs: Graph[];
  prefix?: string;
  suffix?: string;
}) {
  const graphsFormatted = getTypeCharts(graphs, prefix, suffix)
  const urlFinale = getUrlForCollectivite(collectivite, code, graphsFormatted);

  return (
    <div className="d-flex flex-column align-items-center">
      <iframe src={urlFinale} style={{maxWidth: '600px', width: '100%'}} height="400" frameBorder="0"></iframe>
      <br />
      {graphsFormatted.map((graph, i) => {
        return (
          <div key={btoa(JSON.stringify(graph)) + i}>
            <span
              className="square-legend"
              style={{ backgroundColor: graph.color }}
            ></span>{" "}
            {graph.description}&nbsp;({graph.yAxis})
          </div>
        );
      })}
    </div>
  );
}
