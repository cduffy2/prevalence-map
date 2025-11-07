'use client';

import { useState } from 'react';
import Image from 'next/image';

interface IllustratedSegmentCardProps {
  segmentName: string;
  population: string;
  vulnerabilityLevel: 'Most vulnerable' | 'More vulnerable' | 'Less vulnerable' | 'Least vulnerable';
  imagePath: string;
}

export default function IllustratedSegmentCard({
  segmentName,
  population,
  vulnerabilityLevel,
  imagePath
}: IllustratedSegmentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Map vulnerability level to colors with direct hex values
  const getVulnerabilityColors = () => {
    switch (vulnerabilityLevel) {
      case 'Most vulnerable':
        return { bg: '#FFD6D8', text: '#690133' };
      case 'More vulnerable':
        return { bg: '#F7DBFF', text: '#6F22A8' };
      case 'Less vulnerable':
        return { bg: '#D9F0FF', text: '#001E5E' };
      case 'Least vulnerable':
        return { bg: '#C9F2DC', text: '#003D1B' };
    }
  };

  const vulColors = getVulnerabilityColors();

  return (
    <div
      className="rounded-[var(--radius-lg)] cursor-pointer"
      style={{
        height: '180px',
        width: '253px',
        backgroundColor: isHovered ? '#E5F0F8' : 'white',
        border: '1px solid #97c3f0',
        outline: isHovered ? '1px solid #026ACC' : 'none',
        outlineOffset: '0px',
        padding: '16px',
        boxSizing: 'border-box',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full justify-between">
        {/* Top section: Text + Image */}
        <div className="flex items-start justify-between w-full">
          {/* Text */}
          <div className="flex flex-col">
            <p className="font-semibold text-[20px] leading-[1.55] text-[var(--text-primary)] whitespace-nowrap">
              {segmentName}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold text-[18px] leading-[1.66] text-[var(--text-primary)]">
                {population}
              </span>
              <span className="font-normal text-[14px] leading-[1.42] text-[var(--text-tertiary)] whitespace-nowrap">
                of population
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="shrink-0 overflow-hidden" style={{ width: '88px', height: '88px' }}>
            <Image
              src={imagePath}
              alt={segmentName}
              width={88}
              height={88}
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom section: Vulnerability tag */}
        <div className="flex items-start">
          <div
            className="px-2 py-0 rounded-[24px]"
            style={{
              backgroundColor: vulColors.bg,
              color: vulColors.text
            }}
          >
            <p className="font-semibold text-[16px] leading-[1.5] whitespace-nowrap">
              {vulnerabilityLevel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
