'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { geoMercator, geoPath } from 'd3-geo';
import { zoom, zoomIdentity } from 'd3-zoom';
import Image from 'next/image';

interface Region {
  type: string;
  properties: {
    NAME_1: string;
    [key: string]: unknown;
  };
  geometry: unknown;
}

interface GeoJSONData {
  type: string;
  features: Region[];
}

interface InteractiveMapProps {
  onDistrictSelect: (districtName: string) => void;
  selectedDistricts: string[];
  onSelectAll: () => void;
  onClearAll: () => void;
  totalDistrictsCount: number;
}

export default function InteractiveMap({ onDistrictSelect, selectedDistricts, onSelectAll, onClearAll, totalDistrictsCount }: InteractiveMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Load GeoJSON data
  useEffect(() => {
    fetch('/senegal-level1.json')
      .then((response) => response.json())
      .then((data: GeoJSONData) => {
        setGeoData(data);
      })
      .catch((error) => console.error('Error loading map data:', error));
  }, []);

  // Render map
  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 502;
    const height = 310;

    // Clear existing content
    svg.selectAll('*').remove();

    // Create a group for zoom/pan
    const g = svg.append('g');

    // Set up projection
    const projection = geoMercator().fitSize([width, height], geoData as unknown as GeoJSON.GeoJSON);
    const pathGenerator = geoPath().projection(projection);

    // Draw regions
    g.selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('d', (d) => pathGenerator(d as unknown as GeoJSON.Feature) || '')
      .attr('fill', (d) => {
        const isSelected = selectedDistricts.includes(d.properties.NAME_1);
        return isSelected ? '#a3bffa' : '#e8eef5';
      })
      .attr('stroke', '#0b6bcb')
      .attr('stroke-width', 1)
      .attr('class', 'region-path')
      .style('cursor', 'pointer')
      .on('mouseenter', function () {
        d3.select(this).attr('fill', '#c7dff7');
      })
      .on('mouseleave', function (event, d) {
        const isSelected = selectedDistricts.includes(d.properties.NAME_1);
        d3.select(this).attr('fill', isSelected ? '#a3bffa' : '#e8eef5');
      })
      .on('click', function (event, d) {
        onDistrictSelect(d.properties.NAME_1);
      });

    // Set up zoom behavior
    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    zoomBehaviorRef.current = zoomBehavior;
    svg.call(zoomBehavior);
  }, [geoData, selectedDistricts, onDistrictSelect]);

  const handleZoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleBy, 1.3);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleBy, 0.7);
    }
  };

  const handleReset = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.transform, zoomIdentity);
    }
  };

  const allSelected = selectedDistricts.length === totalDistrictsCount;

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        width={502}
        height={310}
        className="mx-auto"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />

      {/* Select All / Clear All Button */}
      <div className="absolute left-0 top-0">
        <button
          onClick={allSelected ? onClearAll : onSelectAll}
          className="px-3 py-1.5 bg-white rounded-[var(--radius-sm)] text-sm font-semibold text-[var(--primary-plain-color)] hover:bg-[var(--primary-plain-hoverbg)] transition-colors shadow-sm"
        >
          {allSelected ? 'Clear all' : 'Select all'}
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute right-0 top-0 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-white border-b border-[#cdd7e1] flex items-center justify-center hover:bg-[var(--primary-plain-hoverbg)] transition-colors"
          aria-label="Zoom in"
        >
          <Image
            src="/Assets/Icons/Zoom in.svg"
            alt="Zoom in"
            width={20}
            height={20}
          />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-white border-b border-[#cdd7e1] flex items-center justify-center hover:bg-[var(--primary-plain-hoverbg)] transition-colors"
          aria-label="Zoom out"
        >
          <Image
            src="/Assets/Icons/Zoom out.svg"
            alt="Zoom out"
            width={20}
            height={20}
          />
        </button>
        <button
          onClick={handleReset}
          className="w-8 h-8 bg-white flex items-center justify-center hover:bg-[var(--primary-plain-hoverbg)] transition-colors"
          aria-label="Reset zoom"
        >
          <Image
            src="/Assets/Icons/Reset.svg"
            alt="Reset"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
}
