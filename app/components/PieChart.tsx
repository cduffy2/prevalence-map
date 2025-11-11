'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Button from '@mui/joy/Button';
import ExportModal from './ExportModal';

export interface SegmentData {
  'Urban-1': number;
  'Urban-2': number;
  'Urban-3.1': number;
  'Urban-3.2': number;
  'Urban-4': number;
  'Rural-1': number;
  'Rural-2': number;
  'Rural-2.1': number;
  'Rural-3': number;
  'Rural-4': number;
}

interface DistrictData {
  name: string;
  segments: SegmentData;
  population: number;
}

interface PieChartProps {
  districts: DistrictData[];
  populationType: 'both' | 'urban' | 'rural';
  onPopulationTypeChange: (type: 'both' | 'urban' | 'rural') => void;
  onDistrictRemove: (districtName: string) => void;
}

const segmentColors: Record<keyof SegmentData, string> = {
  'Urban-1': '#86efac',    // Light green (Level 1)
  'Urban-2': '#7dd3fc',    // Light blue/cyan (Level 2)
  'Urban-3.1': '#f0abfc',  // Light pink/magenta (Level 3)
  'Urban-3.2': '#f0abfc',  // Same purple as Urban-3.1 with diagonal stripes (Level 3)
  'Urban-4': '#fda4af',    // Coral/salmon pink (Level 4)
  'Rural-1': '#86efac',    // Light green (Level 1)
  'Rural-2': '#7dd3fc',    // Light blue/cyan (Level 2)
  'Rural-2.1': '#7dd3fc',  // Same blue as Rural-2 with cross-hatch (Level 2)
  'Rural-3': '#86efac',    // Light green (Level 3)
  'Rural-4': '#fda4af',    // Coral/salmon pink (Level 4)
};

import { senegalDistricts } from '../../lib/districtData';

export default function PieChart({ districts, populationType, onPopulationTypeChange, onDistrictRemove }: PieChartProps) {
  const [hoveredSegment, setHoveredSegment] = useState<{ district: string; segment: keyof SegmentData } | null>(null);
  const [hoveredRemoveButton, setHoveredRemoveButton] = useState<string | null>(null);
  const [hoveredPieChart, setHoveredPieChart] = useState<string | null>(null);
  const [hoveredDistrictTitle, setHoveredDistrictTitle] = useState<string | null>(null);
  const [hoveredOverviewArc, setHoveredOverviewArc] = useState<{ district: string; type: 'urban' | 'rural' } | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const filteredSegments = useMemo(() => {
    const allSegments: (keyof SegmentData)[] = [
      'Urban-1', 'Urban-2', 'Urban-3.1', 'Urban-3.2', 'Urban-4',
      'Rural-1', 'Rural-2', 'Rural-2.1', 'Rural-3', 'Rural-4'
    ];

    if (populationType === 'urban') {
      return allSegments.filter(s => s.startsWith('Urban'));
    } else if (populationType === 'rural') {
      return allSegments.filter(s => s.startsWith('Rural'));
    }
    return allSegments;
  }, [populationType]);

  const calculateUrbanRuralSplit = (district: DistrictData) => {
    const urbanTotal = Object.entries(district.segments)
      .filter(([key]) => key.startsWith('Urban'))
      .reduce((sum, [, val]) => sum + val, 0);
    const ruralTotal = Object.entries(district.segments)
      .filter(([key]) => key.startsWith('Rural'))
      .reduce((sum, [, val]) => sum + val, 0);
    const total = urbanTotal + ruralTotal;
    return {
      urbanPercent: total > 0 ? (urbanTotal / total) * 100 : 0,
      ruralPercent: total > 0 ? (ruralTotal / total) * 100 : 0,
    };
  };

  const calculateDistrictPercentage = (district: DistrictData) => {
    if (populationType === 'both') {
      const totalPopulation = senegalDistricts.reduce((sum, d) => sum + d.population, 0);
      return totalPopulation > 0 ? (district.population / totalPopulation) * 100 : 0;
    } else if (populationType === 'urban') {
      const getUrbanPopulation = (d: DistrictData) => {
        const urbanTotal = Object.entries(d.segments)
          .filter(([key]) => key.startsWith('Urban'))
          .reduce((sum, [, val]) => sum + val, 0);
        return (urbanTotal / 100) * d.population;
      };
      const totalUrbanPopulation = senegalDistricts.reduce((sum, d) => sum + getUrbanPopulation(d), 0);
      const districtUrbanPopulation = getUrbanPopulation(district);
      return totalUrbanPopulation > 0 ? (districtUrbanPopulation / totalUrbanPopulation) * 100 : 0;
    } else {
      const getRuralPopulation = (d: DistrictData) => {
        const ruralTotal = Object.entries(d.segments)
          .filter(([key]) => key.startsWith('Rural'))
          .reduce((sum, [, val]) => sum + val, 0);
        return (ruralTotal / 100) * d.population;
      };
      const totalRuralPopulation = senegalDistricts.reduce((sum, d) => sum + getRuralPopulation(d), 0);
      const districtRuralPopulation = getRuralPopulation(district);
      return totalRuralPopulation > 0 ? (districtRuralPopulation / totalRuralPopulation) * 100 : 0;
    }
  };

  const calculateAllPercentages = (district: DistrictData) => {
    // Total population percentage
    const totalPopulation = senegalDistricts.reduce((sum, d) => sum + d.population, 0);
    const totalPercent = totalPopulation > 0 ? (district.population / totalPopulation) * 100 : 0;

    // Urban population percentage
    const getUrbanPopulation = (d: DistrictData) => {
      const urbanTotal = Object.entries(d.segments)
        .filter(([key]) => key.startsWith('Urban'))
        .reduce((sum, [, val]) => sum + val, 0);
      return (urbanTotal / 100) * d.population;
    };
    const totalUrbanPopulation = senegalDistricts.reduce((sum, d) => sum + getUrbanPopulation(d), 0);
    const districtUrbanPopulation = getUrbanPopulation(district);
    const urbanPercent = totalUrbanPopulation > 0 ? (districtUrbanPopulation / totalUrbanPopulation) * 100 : 0;

    // Rural population percentage
    const getRuralPopulation = (d: DistrictData) => {
      const ruralTotal = Object.entries(d.segments)
        .filter(([key]) => key.startsWith('Rural'))
        .reduce((sum, [, val]) => sum + val, 0);
      return (ruralTotal / 100) * d.population;
    };
    const totalRuralPopulation = senegalDistricts.reduce((sum, d) => sum + getRuralPopulation(d), 0);
    const districtRuralPopulation = getRuralPopulation(district);
    const ruralPercent = totalRuralPopulation > 0 ? (districtRuralPopulation / totalRuralPopulation) * 100 : 0;

    return { totalPercent, urbanPercent, ruralPercent };
  };

  // Helper function to generate SVG pie slice path
  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', x, y,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Helper to create arc path (for urban/rural overview)
  const describeArcPath = (x: number, y: number, radius: number, startAngle: number, endAngle: number, thickness: number) => {
    const outerStart = polarToCartesian(x, y, radius, endAngle);
    const outerEnd = polarToCartesian(x, y, radius, startAngle);
    const innerStart = polarToCartesian(x, y, radius - thickness, endAngle);
    const innerEnd = polarToCartesian(x, y, radius - thickness, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', outerStart.x, outerStart.y,
      'A', radius, radius, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
      'L', innerEnd.x, innerEnd.y,
      'A', radius - thickness, radius - thickness, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      'Z'
    ].join(' ');
  };

  return (
    <div className="flex flex-col h-full">
      {/* SVG Patterns */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {/* Diagonal stripes pattern for Urban-3.2 */}
          <pattern id="pie-diagonal-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="#f0abfc" />
            <line x1="0" y1="0" x2="0" y2="8" stroke="#c084fc" strokeWidth="4" />
          </pattern>

          {/* Cross-hatch pattern for Rural-2.1 */}
          <pattern id="pie-cross-hatch" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#7dd3fc" />
            <path d="M0,0 L8,8 M8,0 L0,8" stroke="#0284c7" strokeWidth="1.5" />
          </pattern>
        </defs>
      </svg>

      {/* Filters Section */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--primary-outlined-border)]">
        {/* Left: Population type filter */}
        <div className="flex border border-[var(--primary-outlined-border)] rounded-[var(--radius-sm)] overflow-hidden">
          <button
            onClick={() => onPopulationTypeChange('both')}
            className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
              populationType === 'both'
                ? 'bg-[var(--primary-200)] text-[var(--text-link-hover)]'
                : 'text-[var(--primary-outlined-color)] hover:bg-[var(--primary-plain-hoverbg)]'
            }`}>
            Both
          </button>
          <div className="w-px bg-[var(--primary-outlined-border)]" />
          <button
            onClick={() => onPopulationTypeChange('urban')}
            className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
              populationType === 'urban'
                ? 'bg-[var(--primary-200)] text-[var(--text-link-hover)]'
                : 'text-[var(--primary-outlined-color)] hover:bg-[var(--primary-plain-hoverbg)]'
            }`}>
            Urban
          </button>
          <div className="w-px bg-[var(--primary-outlined-border)]" />
          <button
            onClick={() => onPopulationTypeChange('rural')}
            className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
              populationType === 'rural'
                ? 'bg-[var(--primary-200)] text-[var(--text-link-hover)]'
                : 'text-[var(--primary-outlined-color)] hover:bg-[var(--primary-plain-hoverbg)]'
            }`}>
            Rural
          </button>
        </div>

        {/* Right: Export button */}
        <Button
          variant="plain"
          color="primary"
          onClick={() => setIsExportModalOpen(true)}
          endDecorator={
            <Image
              src="/Assets/Icons/Share view.svg"
              alt="Export"
              width={20}
              height={20}
            />
          }
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            px: 1.5,
            py: 0.75,
          }}
        >
          Export
        </Button>
      </div>

      {/* Pie Charts Grid */}
      <div className="flex-1 overflow-auto p-4" style={{ minHeight: 0, overflowX: 'visible', overflowY: 'auto' }}>
        <div className="grid grid-cols-3 gap-4" style={{ overflow: 'visible' }}>
          {districts.map((district, idx) => {
            const { urbanPercent, ruralPercent } = calculateUrbanRuralSplit(district);
            const districtPercent = calculateDistrictPercentage(district);

            // Calculate pie slices
            const total = filteredSegments.reduce((sum, seg) => sum + district.segments[seg], 0);
            let currentAngle = 0;
            const slices = filteredSegments.map(segment => {
              const value = district.segments[segment];
              const percent = total > 0 ? (value / total) * 100 : 0;
              const angle = (value / total) * 360;
              const slice = {
                segment,
                value,
                percent,
                startAngle: currentAngle,
                endAngle: currentAngle + angle
              };
              currentAngle += angle;
              return slice;
            }).filter(s => s.value > 0);

            return (
              <div
                key={idx}
                className="flex flex-col items-center"
                onMouseEnter={() => setHoveredPieChart(district.name)}
                onMouseLeave={() => setHoveredPieChart(null)}
              >
                {/* Title with percentage and remove button */}
                <div className="flex items-center justify-center w-full px-2 py-2 relative">
                  <div
                    className="flex items-center gap-1.5 relative"
                    onMouseEnter={() => setHoveredDistrictTitle(district.name)}
                    onMouseLeave={() => setHoveredDistrictTitle(null)}
                  >
                    <Image
                      src="/Assets/Icons/InfoOutlined.svg"
                      alt="Info"
                      width={16}
                      height={16}
                    />
                    <span className="text-sm font-semibold text-[var(--text-tertiary)]">
                      {district.name} ({Math.round(districtPercent)}%)
                    </span>

                    {/* Tooltip */}
                    {hoveredDistrictTitle === district.name && (() => {
                      const { totalPercent, urbanPercent, ruralPercent } = calculateAllPercentages(district);
                      let tooltipText = '';
                      let percentage = 0;

                      if (populationType === 'both') {
                        percentage = totalPercent;
                        tooltipText = 'total population';
                      } else if (populationType === 'urban') {
                        percentage = urbanPercent;
                        tooltipText = 'overall urban population';
                      } else {
                        percentage = ruralPercent;
                        tooltipText = 'overall rural population';
                      }

                      return (
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-50 rounded-[var(--radius-sm)] shadow-lg p-3 whitespace-nowrap" style={{ backgroundColor: '#383633', pointerEvents: 'none' }}>
                          <div className="text-xs text-white">
                            {Math.round(percentage)}% of the <span className="font-semibold" style={{ color: '#FFFFFF' }}>{tooltipText}</span>
                          </div>
                          {/* Arrow */}
                          <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 rotate-45" style={{ backgroundColor: '#383633' }}></div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Remove button - only show on hover - positioned absolutely on the right */}
                  <div className="absolute right-2 top-2 w-6 h-6">
                    {hoveredPieChart === district.name && (
                      <>
                        <button
                          onClick={() => onDistrictRemove(district.name)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                          aria-label={`Remove ${district.name}`}
                          onMouseEnter={() => setHoveredRemoveButton(district.name)}
                          onMouseLeave={() => setHoveredRemoveButton(null)}
                        >
                          <Image
                            src="/Assets/Icons/close_alt.svg"
                            alt="Remove"
                            width={16}
                            height={16}
                          />
                        </button>

                        {/* Remove button tooltip */}
                        {hoveredRemoveButton === district.name && (
                          <div
                            className="absolute right-0 top-full mt-1 rounded-[var(--radius-sm)] shadow-lg p-3 whitespace-nowrap"
                            style={{
                              backgroundColor: '#383633',
                              zIndex: 9999,
                              pointerEvents: 'none'
                            }}
                          >
                            <div className="text-xs text-white">
                              Remove from view
                            </div>
                            {/* Arrow */}
                            <div className="absolute right-3 -top-2 w-4 h-4 rotate-45" style={{ backgroundColor: '#383633' }}></div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="relative" style={{ width: '214px', height: '214px', overflow: 'visible' }}>
                  <svg width="214" height="214" viewBox="0 0 214 214">
                    {/* Inner pie slices */}
                    <g transform="translate(107, 107)">
                      {slices.map((slice, i) => {
                        const fill = slice.segment === 'Urban-3.2'
                          ? 'url(#pie-diagonal-stripes)'
                          : slice.segment === 'Rural-2.1'
                          ? 'url(#pie-cross-hatch)'
                          : segmentColors[slice.segment];

                        const path = describeArc(0, 0, 96, slice.startAngle, slice.endAngle);
                        const isHovered = hoveredSegment?.district === district.name && hoveredSegment?.segment === slice.segment;

                        // Calculate label position
                        const midAngle = (slice.startAngle + slice.endAngle) / 2;
                        const labelRadius = 60;
                        const labelPos = polarToCartesian(0, 0, labelRadius, midAngle);

                        return (
                          <g key={i}>
                            <path
                              d={path}
                              fill={fill}
                              stroke="white"
                              strokeWidth="2"
                              style={{
                                cursor: 'pointer',
                                filter: isHovered ? 'brightness(0.9)' : 'none',
                                stroke: isHovered ? '#0b6bcb' : 'white',
                                strokeWidth: isHovered ? 3 : 2
                              }}
                              onMouseEnter={() => setHoveredSegment({ district: district.name, segment: slice.segment })}
                              onMouseLeave={() => setHoveredSegment(null)}
                            />

                            {/* Label */}
                            {slice.percent >= 8 && (
                              <text
                                x={labelPos.x}
                                y={labelPos.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-xs pointer-events-none"
                                fill="var(--text-primary)"
                              >
                                <tspan x={labelPos.x} dy="-0.3em" className="font-semibold">{slice.segment.replace('Urban-', 'U').replace('Rural-', 'R')}</tspan>
                                <tspan x={labelPos.x} dy="1.2em" className="text-[10px]">{Math.round(slice.percent)}%</tspan>
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>

                    {/* Urban/Rural overview arcs - only show when 'both' is selected */}
                    {populationType === 'both' && (
                      <g transform="translate(107, 107)">
                        {/* Rural arc (outer, orange) */}
                        <path
                          d={describeArcPath(0, 0, 106, 0, (ruralPercent / 100) * 360, 6)}
                          fill="#fb923c"
                          opacity="0.85"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredOverviewArc({ district: district.name, type: 'rural' })}
                          onMouseLeave={() => {
                            setHoveredOverviewArc(null);
                            setCursorPosition(null);
                          }}
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                            if (svgRect) {
                              setCursorPosition({
                                x: e.clientX - svgRect.left,
                                y: e.clientY - svgRect.top
                              });
                            }
                          }}
                        />
                        {/* Urban arc (inner part, grey) */}
                        <path
                          d={describeArcPath(0, 0, 106, (ruralPercent / 100) * 360, 360, 6)}
                          fill="#9ca3af"
                          opacity="0.85"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredOverviewArc({ district: district.name, type: 'urban' })}
                          onMouseLeave={() => {
                            setHoveredOverviewArc(null);
                            setCursorPosition(null);
                          }}
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                            if (svgRect) {
                              setCursorPosition({
                                x: e.clientX - svgRect.left,
                                y: e.clientY - svgRect.top
                              });
                            }
                          }}
                        />
                      </g>
                    )}
                  </svg>

                  {/* Tooltip - render outside SVG for proper z-index */}
                  {slices.map((slice, i) => {
                    const isHovered = hoveredSegment?.district === district.name && hoveredSegment?.segment === slice.segment;
                    if (!isHovered) return null;

                    const midAngle = (slice.startAngle + slice.endAngle) / 2;
                    const labelRadius = 60;
                    const labelPos = polarToCartesian(0, 0, labelRadius, midAngle);

                    // Convert SVG coordinates to absolute positioning
                    const tooltipX = 107 + labelPos.x;
                    const tooltipY = 107 + labelPos.y - 60; // Position above the label

                    return (
                      <div
                        key={`tooltip-${i}`}
                        className="absolute rounded-[var(--radius-sm)] shadow-lg p-3 whitespace-nowrap"
                        style={{
                          backgroundColor: '#383633',
                          zIndex: 9999,
                          pointerEvents: 'none',
                          left: `${tooltipX}px`,
                          top: `${tooltipY}px`,
                          transform: 'translateX(-50%)'
                        }}
                      >
                        <div className="text-xs text-white">
                          {slice.segment} · {Math.round(slice.percent)}% of women with a child under 5
                        </div>
                        {/* Arrow */}
                        <div className="absolute left-1/2 -bottom-1 w-4 h-4 -translate-x-1/2 rotate-45" style={{ backgroundColor: '#383633' }}></div>
                      </div>
                    );
                  })}

                  {/* Tooltip for overview arcs */}
                  {hoveredOverviewArc?.district === district.name && cursorPosition && (() => {
                    const { urbanPercent: urbanSplit, ruralPercent: ruralSplit } = calculateUrbanRuralSplit(district);
                    const isUrban = hoveredOverviewArc.type === 'urban';
                    const percentage = isUrban ? urbanSplit : ruralSplit;
                    const tooltipText = isUrban ? 'urban' : 'rural';

                    // Position tooltip near cursor with offset
                    return (
                      <div
                        className="absolute rounded-[var(--radius-sm)] shadow-lg p-3 whitespace-nowrap"
                        style={{
                          backgroundColor: '#383633',
                          zIndex: 9999,
                          pointerEvents: 'none',
                          left: `${cursorPosition.x + 10}px`,
                          top: `${cursorPosition.y + 10}px`
                        }}
                      >
                        <div className="text-xs text-white">
                          <span className="font-semibold" style={{ color: '#FFFFFF' }}>{Math.round(percentage)}% {tooltipText}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="border-t border-[var(--primary-outlined-border)] px-4 py-3">
        <div className="flex gap-12">
          {/* Urban segments */}
          {(populationType === 'both' || populationType === 'urban') && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-4 bg-gray-300 rounded"></div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Urban segments</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-sm" style={{ background: segmentColors['Urban-1'] }}></div>
                  <span className="text-sm text-[var(--text-tertiary)]">Urban-1</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-sm" style={{ background: segmentColors['Urban-2'] }}></div>
                  <span className="text-sm text-[var(--text-tertiary)]">Urban-2</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-sm" style={{ background: segmentColors['Urban-3.1'] }}></div>
                  <span className="text-sm text-[var(--text-tertiary)]">Urban-3.1</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="16" height="16" className="rounded-sm">
                    <rect width="16" height="16" fill="url(#pie-diagonal-stripes)" />
                  </svg>
                  <span className="text-sm text-[var(--text-tertiary)]">Urban-3.2</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-sm" style={{ background: segmentColors['Urban-4'] }}></div>
                  <span className="text-sm text-[var(--text-tertiary)]">Urban-4</span>
                </div>
              </div>
            </div>
          )}

          {/* Rural segments */}
          {(populationType === 'both' || populationType === 'rural') && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-4 bg-orange-400 rounded"></div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Rural segments</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-sm" style={{ background: segmentColors['Rural-1'] }}></div>
                  <span className="text-sm text-[var(--text-tertiary)]">Rural-1</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-sm" style={{ background: segmentColors['Rural-2'] }}></div>
                  <span className="text-sm text-[var(--text-tertiary)]">Rural-2</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="16" height="16" className="rounded-sm">
                    <rect width="16" height="16" fill="url(#pie-cross-hatch)" />
                  </svg>
                  <span className="text-sm text-[var(--text-tertiary)]">Rural-2.1</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-sm" style={{ background: segmentColors['Rural-3'] }}></div>
                  <span className="text-sm text-[var(--text-tertiary)]">Rural-3</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-sm" style={{ background: segmentColors['Rural-4'] }}></div>
                  <span className="text-sm text-[var(--text-tertiary)]">Rural-4</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </div>
  );
}
