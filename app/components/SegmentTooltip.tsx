'use client';

import { SegmentMetadata } from '@/lib/segmentMetadata';
import Image from 'next/image';

interface SegmentTooltipProps {
  segment: SegmentMetadata;
  isVisible: boolean;
  position: { x: number; y: number };
}

export default function SegmentTooltip({ segment, isVisible, position }: SegmentTooltipProps) {
  if (!isVisible) return null;

  // Get border color based on vulnerability level
  const getBorderColor = (vulLevel: string) => {
    switch (vulLevel) {
      case '4': return '#fe4656'; // Most vulnerable
      case '3': return '#c254fa'; // More vulnerable
      case '2': return '#04a1e6'; // Less vulnerable
      case '1': return '#00be48'; // Least vulnerable
      default: return '#04a1e6';
    }
  };

  const borderColor = getBorderColor(segment.vulLevel);

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, 0)',
        marginTop: '12px', // Gap between tooltip and element
      }}
    >
      {/* Arrow pointing up */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          top: '-8px',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: `8px solid ${borderColor}`,
        }}
      />

      <div
        className="bg-white rounded-lg shadow-lg p-4"
        style={{
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: borderColor,
          maxWidth: '480px'
        }}
      >
        <div className="flex items-center gap-4">
          {/* Illustration - 106x106px */}
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: '106px',
              height: '106px',
            }}
          >
            <Image
              src={`/Assets/illustrations/${segment.segmentId}.png`}
              alt={segment.displayName}
              width={106}
              height={106}
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Segment name and population on same line */}
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="font-semibold text-base text-[var(--text-primary)]">
                {segment.displayName}
              </h3>
              <span className="text-sm text-[var(--text-tertiary)]">
                <span className="font-semibold">{segment.population}</span> of population
              </span>
            </div>

            {/* Characteristics tags - MUI neutral chips with 24px border radius */}
            <div className="flex flex-wrap gap-2">
              {segment.characteristics.map((characteristic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs"
                  style={{
                    backgroundColor: '#e5e5dc',
                    color: '#383633',
                    border: 'none',
                    borderRadius: '24px',
                    fontWeight: 600
                  }}
                >
                  {characteristic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
