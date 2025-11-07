'use client';

import { useState } from 'react';
import VulnerabilityNumberTag from './VulnerabilityNumberTag';

interface ExtendedSegmentCardProps {
  segmentType: 'Rural' | 'Urban';
  vulLevel: '1' | '2' | '3' | '4';
  subLevel?: '1' | '2' | 'None';
  population: string;
  bgColor: string;
  characteristics: string[];
}

export default function ExtendedSegmentCard({
  segmentType,
  vulLevel,
  subLevel = 'None',
  population,
  bgColor,
  characteristics
}: ExtendedSegmentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white border border-[var(--primary-outlined-border)] rounded-lg p-6 cursor-pointer transition-colors ${
        isHovered ? 'bg-[#D9F0FF]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-xl text-black">
            {segmentType}
          </h3>
          <VulnerabilityNumberTag
            vulLevel={vulLevel}
            subLevel={subLevel}
            className="h-8"
            style={{ backgroundColor: bgColor }}
          />
        </div>
        <div className="text-right">
          <div className="flex items-baseline gap-1">
            <span className="font-semibold text-2xl text-[var(--text-primary)]">
              {population}
            </span>
          </div>
          <span className="text-sm text-[var(--text-tertiary)]">of population</span>
        </div>
      </div>

      {/* Characteristics */}
      <div className="space-y-2">
        {characteristics.map((characteristic, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--neutral-600)] flex-shrink-0" />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {characteristic}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
