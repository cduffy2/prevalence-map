'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Button from '@mui/joy/Button';
import ExportModal from './ExportModal';
import DataInterpretationNotification from './DataInterpretationNotification';

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

interface StackedBarChartProps {
  districts: DistrictData[];
  populationType: 'both' | 'urban' | 'rural';
  onPopulationTypeChange: (type: 'both' | 'urban' | 'rural') => void;
  onDistrictRemove: (districtName: string) => void;
  showNotification?: boolean;
  onCloseNotification?: () => void;
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

export default function StackedBarChart({
  districts,
  populationType,
  onPopulationTypeChange,
  onDistrictRemove,
  showNotification = false,
  onCloseNotification
}: StackedBarChartProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<{ district: string; segment: keyof SegmentData | 'urban-overview' | 'rural-overview' } | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [hoveredRemoveButton, setHoveredRemoveButton] = useState<string | null>(null);
  const [showPopulationShare, setShowPopulationShare] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Determine which districts to display
  const displayedDistricts = useMemo(() => {
    if (showPopulationShare) {
      // Show all 14 districts when toggle is ON, with selected districts at the top in their original order
      const selectedNames = districts.map(d => d.name);
      // Keep selected districts in their original order
      const selected = districts;
      // Get unselected districts from senegalDistricts
      const unselected = senegalDistricts.filter(d => !selectedNames.includes(d.name));
      return [...selected, ...unselected];
    } else {
      // Show only selected districts when toggle is OFF
      return districts;
    }
  }, [showPopulationShare, districts]);

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

  const calculateSegmentWidth = (district: DistrictData, segment: keyof SegmentData) => {
    const total = filteredSegments.reduce((sum, seg) => sum + district.segments[seg], 0);
    return total > 0 ? (district.segments[segment] / total) * 100 : 0;
  };

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
      // District's share of total population (using ALL districts)
      const totalPopulation = senegalDistricts.reduce((sum, d) => sum + d.population, 0);
      return totalPopulation > 0 ? (district.population / totalPopulation) * 100 : 0;
    } else if (populationType === 'urban') {
      // District's share of total urban population (using ALL districts)
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
      // District's share of total rural population (using ALL districts)
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
    // Total population (using ALL districts)
    const totalPopulation = senegalDistricts.reduce((sum, d) => sum + d.population, 0);
    const totalPercent = totalPopulation > 0 ? (district.population / totalPopulation) * 100 : 0;

    // Urban population (using ALL districts)
    const getUrbanPopulation = (d: DistrictData) => {
      const urbanTotal = Object.entries(d.segments)
        .filter(([key]) => key.startsWith('Urban'))
        .reduce((sum, [, val]) => sum + val, 0);
      return (urbanTotal / 100) * d.population;
    };
    const totalUrbanPopulation = senegalDistricts.reduce((sum, d) => sum + getUrbanPopulation(d), 0);
    const districtUrbanPopulation = getUrbanPopulation(district);
    const urbanPercent = totalUrbanPopulation > 0 ? (districtUrbanPopulation / totalUrbanPopulation) * 100 : 0;

    // Rural population (using ALL districts)
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

  return (
    <div className="flex flex-col h-full">
      {/* SVG Patterns */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {/* Diagonal stripes pattern for Urban-3.2 - using same pink/magenta as Urban-3.1 */}
          <pattern id="diagonal-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="#f0abfc" />
            <line x1="0" y1="0" x2="0" y2="8" stroke="#c084fc" strokeWidth="4" />
          </pattern>

          {/* Cross-hatch pattern for Rural-2.1 - using same blue as Rural-2 */}
          <pattern id="cross-hatch" width="8" height="8" patternUnits="userSpaceOnUse">
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

        {/* Center: Population share toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--text-tertiary)]">
            Bar height shows district&apos;s <span className="font-semibold">
              {populationType === 'both' ? 'population' : populationType === 'urban' ? 'urban' : 'rural'}
            </span> share
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={showPopulationShare}
              onChange={(e) => setShowPopulationShare(e.target.checked)}
            />
            <div className={`w-11 h-6 rounded-full relative transition-colors ${showPopulationShare ? 'bg-[var(--primary-plain-color)]' : 'bg-gray-200'}`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${showPopulationShare ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
            </div>
          </label>
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

      {/* Chart Area */}
      <div className="flex-1 overflow-auto" style={{ minHeight: 0, overflowX: 'visible' }}>
        <div className="px-4 py-4" style={{ overflow: 'visible' }}>
          {/* Notification */}
          {showNotification && onCloseNotification && (
            <div className="mb-4">
              <DataInterpretationNotification
                isVisible={showNotification}
                onClose={onCloseNotification}
              />
            </div>
          )}

          {/* Y-axis scale */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-32 flex-shrink-0"></div>
            <div className="relative" style={{ width: 'calc(100% - 176px)' }}>
              <div className="flex justify-between text-xs text-[var(--text-tertiary)] mb-2">
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(val => (
                  <span key={val} className="w-4 text-center">{val}</span>
                ))}
              </div>
            </div>
            <div className="w-8 flex-shrink-0"></div>
          </div>

          {/* Bars */}
          <div className="flex flex-col" style={{ gap: showPopulationShare ? '2px' : '16px' }}>
            {displayedDistricts.map((district, idx) => {
              const { urbanPercent, ruralPercent } = calculateUrbanRuralSplit(district);
              const isDistrictHovered = hoveredDistrict === district.name || hoveredBar === district.name;
              const isSelected = districts.some(d => d.name === district.name);
              const opacity = showPopulationShare && !isSelected ? 0.3 : 1;
              const districtPercentage = calculateDistrictPercentage(district);

              // Calculate bar height with minimum of 16px and maximum of 200px
              let barHeight = 40; // Default height when toggle is OFF
              if (showPopulationShare) {
                const minHeight = 16;
                const maxHeight = 200;

                // Use logarithmic scaling to make small differences more perceptible
                const normalizedPercent = districtPercentage / 100; // 0 to 1

                // Use log10 scaling with base adjustment for better perception
                const logMin = Math.log10(0.01 + 0.01); // log of 1%
                const logMax = Math.log10(1 + 0.01); // log of 100%
                const logValue = Math.log10(normalizedPercent + 0.01);
                const scaledValue = (logValue - logMin) / (logMax - logMin);

                // Map to height range
                barHeight = minHeight + (scaledValue * (maxHeight - minHeight));
              }
              const barHeightScale = barHeight / 40;

              return (
                <div
                  key={idx}
                  className="flex items-start gap-2"
                  onMouseEnter={() => setHoveredBar(district.name)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{ opacity, paddingLeft: '16px' }}
                >
                  {/* District name and percentage */}
                  <div
                    className="w-32 flex-shrink-0 pt-1 relative text-right flex items-start gap-1.5 justify-end"
                    onMouseEnter={() => setHoveredDistrict(district.name)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                  >
                    <Image
                      src="/Assets/Icons/InfoOutlined.svg"
                      alt="Info"
                      width={16}
                      height={16}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{district.name}</div>
                      <div className="text-xs text-[var(--text-tertiary)]">
                        ({Math.round(calculateDistrictPercentage(district))}%)
                      </div>
                    </div>

                    {/* Tooltip */}
                    {hoveredDistrict === district.name && (() => {
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
                        <div className="absolute left-0 top-full mt-1 z-50 rounded-[var(--radius-sm)] shadow-lg p-3" style={{ backgroundColor: '#383633', pointerEvents: 'none' }}>
                          <div className="text-xs text-white">
                            {Math.round(percentage)}% of the <span className="font-semibold" style={{ color: '#FFFFFF' }}>{tooltipText}</span>
                          </div>
                          {/* Arrow */}
                          <div className="absolute left-6 -top-2 w-4 h-4 rotate-45" style={{ backgroundColor: '#383633' }}></div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Bars container */}
                  <div className="flex-1 flex flex-col">
                    {/* Urban/Rural overview bar (8px height) - only show when 'both' is selected and toggle is OFF */}
                    {populationType === 'both' && !showPopulationShare && (
                      <div className="w-full flex relative" style={{ height: '8px', minHeight: '8px' }}>
                      {/* Urban bar */}
                      <div
                        className="cursor-pointer relative"
                        style={{
                          width: `${urbanPercent}%`,
                          backgroundColor: '#9ca3af',
                          height: '8px',
                          minWidth: urbanPercent > 0 ? '2px' : '0',
                          flexShrink: 0,
                          boxSizing: 'border-box',
                          border: hoveredSegment?.district === district.name && hoveredSegment?.segment === 'urban-overview' ? '2px solid #0b6bcb' : 'none',
                        }}
                        onMouseEnter={() => setHoveredSegment({ district: district.name, segment: 'urban-overview' })}
                        onMouseLeave={() => setHoveredSegment(null)}
                      >
                        {/* Urban tooltip */}
                        {hoveredSegment?.district === district.name && hoveredSegment?.segment === 'urban-overview' && (
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 rounded-[var(--radius-sm)] shadow-lg p-3 whitespace-nowrap" style={{ backgroundColor: '#383633', pointerEvents: 'none' }}>
                            <div className="text-xs text-white">
                              <span className="font-semibold">{Math.round(urbanPercent)}%</span> urban
                            </div>
                            {/* Arrow */}
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45" style={{ backgroundColor: '#383633' }}></div>
                          </div>
                        )}
                      </div>
                      {/* Rural bar */}
                      <div
                        className="cursor-pointer relative"
                        style={{
                          width: `${ruralPercent}%`,
                          backgroundColor: '#fb923c',
                          height: '8px',
                          minWidth: ruralPercent > 0 ? '2px' : '0',
                          flexShrink: 0,
                          boxSizing: 'border-box',
                          border: hoveredSegment?.district === district.name && hoveredSegment?.segment === 'rural-overview' ? '2px solid #0b6bcb' : 'none',
                        }}
                        onMouseEnter={() => setHoveredSegment({ district: district.name, segment: 'rural-overview' })}
                        onMouseLeave={() => setHoveredSegment(null)}
                      >
                        {/* Rural tooltip */}
                        {hoveredSegment?.district === district.name && hoveredSegment?.segment === 'rural-overview' && (
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 rounded-[var(--radius-sm)] shadow-lg p-3 whitespace-nowrap" style={{ backgroundColor: '#383633', pointerEvents: 'none' }}>
                            <div className="text-xs text-white">
                              <span className="font-semibold">{Math.round(ruralPercent)}%</span> rural
                            </div>
                            {/* Arrow */}
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45" style={{ backgroundColor: '#383633' }}></div>
                          </div>
                        )}
                      </div>
                      </div>
                    )}

                    {/* Detailed segment stacked bar with gridlines */}
                    <div className="relative" style={{ height: showPopulationShare ? `${barHeight}px` : '48px' }}>
                      {/* Background gridlines */}
                      <div className="absolute inset-0 flex">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="flex-1 border-r border-dashed border-gray-200"></div>
                        ))}
                      </div>

                      {/* Y-axis line */}
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>

                      {/* Stacked segments */}
                      <div className="absolute inset-0 flex">
                        <div className="flex w-full h-full">
                          {filteredSegments.map((segment, segIdx) => {
                            const width = calculateSegmentWidth(district, segment);
                            if (width === 0) return null;

                            const fill = segment === 'Urban-3.2'
                              ? 'url(#diagonal-stripes)'
                              : segment === 'Rural-2.1'
                              ? 'url(#cross-hatch)'
                              : segmentColors[segment];

                            const isLastSegment = segIdx === filteredSegments.length - 1;
                            const isHovered = hoveredSegment?.district === district.name && hoveredSegment?.segment === segment;

                            return (
                              <div
                                key={segment}
                                style={{
                                  width: `${width}%`,
                                  background: fill.startsWith('url') ? undefined : fill,
                                  boxSizing: 'border-box',
                                  border: isHovered ? '2px solid #0b6bcb' : 'none',
                                  borderRight: !isLastSegment ? '1px solid white' : 'none'
                                }}
                                className={`h-full relative cursor-pointer ${fill.startsWith('url') ? 'bg-pattern' : ''}`}
                                onMouseEnter={() => setHoveredSegment({ district: district.name, segment })}
                                onMouseLeave={() => setHoveredSegment(null)}
                              >
                                {fill.startsWith('url') && (
                                  <svg width="100%" height="100%" style={{ display: 'block', pointerEvents: 'none' }}>
                                    <rect width="100%" height="100%" fill={fill} />
                                  </svg>
                                )}

                                {/* Segment Tooltip */}
                                {isHovered && (
                                  <div
                                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 rounded-[var(--radius-sm)] shadow-lg p-3 whitespace-nowrap"
                                    style={{
                                      backgroundColor: '#383633',
                                      zIndex: 9999,
                                      pointerEvents: 'none'
                                    }}
                                  >
                                    <div className="text-xs text-white">
                                      {segment} · {Math.round(district.segments[segment])}% of women with a child under 5
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute left-1/2 -bottom-1 w-4 h-4 -translate-x-1/2 rotate-45" style={{ backgroundColor: '#383633' }}></div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remove icon - only show when district or bar is hovered */}
                  <div className="w-8 flex-shrink-0 flex items-start pt-1 relative">
                    {isDistrictHovered && (
                      <button
                        onClick={() => onDistrictRemove(district.name)}
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                        aria-label={`Remove ${district.name}`}
                        onMouseEnter={() => setHoveredRemoveButton(district.name)}
                        onMouseLeave={() => setHoveredRemoveButton(null)}
                      >
                        <Image
                          src="/Assets/Icons/close_alt.svg"
                          alt="Remove"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}

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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="border-t border-[var(--primary-outlined-border)] px-4 py-3">
        <div className="flex gap-12">
          {/* Urban segments - only show when 'both' or 'urban' is selected */}
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
                    <rect width="16" height="16" fill="url(#diagonal-stripes)" />
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

          {/* Rural segments - only show when 'both' or 'rural' is selected */}
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
                    <rect width="16" height="16" fill="url(#cross-hatch)" />
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
