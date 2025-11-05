import { useEffect } from "react";
import { getChartJs } from "../_utils/charts";
import { type Chart } from "chart.js";

export default function GraphOneLineData({
  data,
  dataProperty,
  prefix = "",
  suffix = "",
}: {
  data: any[];
  dataProperty: string;
  prefix?: string;
  suffix?: string;
}) {
  let chart: Chart | null = null;
  useEffect(() => {
    if (data && data.length > 0 && dataProperty) 
      chart = getChartJs(data, prefix + dataProperty + suffix);
    return () => {
      if (chart) chart.destroy();
    };
  }, [data, prefix, dataProperty, suffix]);

  if (!data || data.length === 0 || !dataProperty) {
    return <p>Chargement...</p>;
  }

  return (
    <div
      className="d-flex justify-content-center"
      style={{ position: "relative", width: "100%", height: "400px" }}
    >
      <canvas id={"chartjs" + prefix + dataProperty + suffix}></canvas>
    </div>
  );
}
