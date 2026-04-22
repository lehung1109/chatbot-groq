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

    const x = d3
      .scaleTime()
      .domain(d3.extent(parsedData, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(parsedData, (d) => d.value) as number])
      .nice()
      .range([innerHeight, 0]);

    const areaGenerator = d3
      .area<DataPoint>()
      .x((d) => x(d.date))
      .y0(innerHeight)
      .y1((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    const lineGenerator = d3
      .line<DataPoint>()
      .x((d) => x(d.date))
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(parsedData)
      .attr("fill", "rgba(59, 130, 246, 0.25)")
      .attr("d", areaGenerator);

    g.append("path")
      .datum(parsedData)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(7));

    g.append("g").call(d3.axisLeft(y));

    g.selectAll(".dot")
      .data(parsedData)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.value))
      .attr("r", 4)
      .attr("fill", "#3b82f6");

    // create overlay
    const overlay = g
      .append("rect")
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .attr("opacity", 0);
    const hoverLine = g
      .append("line")
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 1)
      .attr("pointer-events", "none")
      .attr("opacity", 0);

    overlay.on("mouseenter", () => {
      hoverLine.attr("opacity", 1);
    });

    overlay.on("mouseleave", () => {
      hoverLine.attr("opacity", 0);
    });

    overlay.on("mousemove", (event) => {
      const coors = d3.pointer(event);

      const domainX = x.invert(coors[0]);

      const indexData = d3
        .bisector((d: DataPoint) => d.date)
        .center(parsedData, domainX);

      const cx = x(parsedData[indexData].date);

      hoverLine.attr("x1", cx).attr("x2", cx);
    });
  }, [parsedData, width, height]);

  return <svg ref={svgRef}></svg>;
}
