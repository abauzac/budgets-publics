import {  getUrlForCollectivite } from "../_utils/utils";

export default function GraphMultiLines({ code, collectivite, graphs }: { code: string, collectivite: string, graphs: any[] }) {
  const urlFinale = getUrlForCollectivite(collectivite, code, graphs);

  return (
    <div className="d-flex flex-column align-items-center">
      <iframe src={urlFinale} width="600" height="400" frameBorder="0"></iframe>
      <br/>
      {graphs.map((graph,i) => {
        return (
          <div key={btoa(JSON.stringify(graph))+i}>
            <span className="square-legend" style={{backgroundColor: graph.color}}></span> {graph.description}&nbsp;({graph.yAxis})
          </div>
        );
      })}
  </div>
  );
}
