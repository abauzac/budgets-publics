import { useEffect } from "react";
import { getChartJs } from "../_utils/charts";
import { type Chart } from "chart.js";

export type Graph = {
  description: string;
  yAxis: string;
  color: string;
};

export default function GraphMultiLinesData({
  data,
  graphs,
  prefix = "",
  suffix = "",
}: {
  data: any[];
  graphs: Graph[];
  prefix?: string;
  suffix?: string;
}) {
  const yProperties = graphs.map((g) => prefix + g.yAxis + suffix);
  const idChart = prefix + yProperties.join("_") + suffix;
  let chart: Chart | null = null;
  useEffect(() => {
    if (data && data.length > 0 && graphs) 
      chart = getChartJs(data, idChart, graphs);
    return () => {
      if (chart) chart.destroy();
    };
  }, [prefix, graphs, suffix]);

  if (!data || data.length === 0 || !graphs) {
    return <p>Chargement...</p>;
  }

  return (
    <div
      className="d-flex justify-content-center"
      style={{ position: "relative", width: "100%", height: "400px" }}
    >
      <canvas id={"chartjs" + idChart}></canvas>
    </div>
  );
}
