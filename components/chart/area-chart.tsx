"use client";

import React, { useMemo, useRef, useEffect } from "react";
import * as d3 from "d3";

interface DataPoint {
  date: Date;
  value: number;
}

const sampleData: DataPoint[] = [
  { date: new Date("2026-04-01"), value: 30 },
  { date: new Date("2026-04-02"), value: 45 },
  { date: new Date("2026-04-03"), value: 28 },
  { date: new Date("2026-04-04"), value: 60 },
  { date: new Date("2026-04-05"), value: 50 },
  { date: new Date("2026-04-06"), value: 75 },
  { date: new Date("2026-04-07"), value: 68 },
];

export default function AreaChart({
  data = sampleData,
  width = 700,
  height = 400,
}) {
  const svgRef = useRef(null);

  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  const parsedData = useMemo(() => {
    return data.map((d) => ({
      date: new Date(d.date),
      value: d.value,
    }));
  }, [data]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime().domain([0, 500]).range([0, 500]);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(10));
  }, [parsedData, width, height]);

  return <svg ref={svgRef}></svg>;
}
