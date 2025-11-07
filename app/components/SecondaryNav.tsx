'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import VulnerabilityNumberTag from './VulnerabilityNumberTag';

interface SecondaryNavProps {
  activePage?: 'senegal-overview' | 'compare-segments' | 'prevalence-map' | 'typing-tools' | 'additional-resources';
  showSegmentCards?: boolean;
}

export default function SecondaryNav({ activePage = 'prevalence-map', showSegmentCards = true }: SecondaryNavProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Line 1: Main navigation tabs
  const line1NavItems = [
    { label: 'Senegal overview', href: '/senegal-overview', icon: '/Assets/Icons/senegal.svg', hasIcon: true, page: 'senegal-overview' as const },
    { label: 'Compare segments', href: '#', page: 'compare-segments' as const },
    { label: 'Prevalence map', href: '/', page: 'prevalence-map' as const },
    { label: 'Typing tools', href: '#', page: 'typing-tools' as const },
    { label: 'Additional resources', href: '#', page: 'additional-resources' as const },
  ];

  // Line 2: Segment cards with vulnerability levels
  const segmentCards = [
    { segmentType: 'Rural', vulLevel: '4' as const, subLevel: 'None' as const, population: '9%', bgColor: '#f2a0ac' },
    { segmentType: 'Rural', vulLevel: '3' as const, subLevel: '1' as const, population: '9%', bgColor: '#b5a4ea' },
    { segmentType: 'Rural', vulLevel: '3' as const, subLevel: '2' as const, population: '9%', bgColor: '#b5a4ea' },
    { segmentType: 'Rural', vulLevel: '2' as const, subLevel: 'None' as const, population: '9%', bgColor: '#76b5e5' },
    { segmentType: 'Urban', vulLevel: '4' as const, subLevel: 'None' as const, population: '9%', bgColor: '#f2a0ac' },
    { segmentType: 'Urban', vulLevel: '3' as const, subLevel: 'None' as const, population: '9%', bgColor: '#b5a4ea' },
    { segmentType: 'Urban', vulLevel: '2' as const, subLevel: 'None' as const, population: '12%', bgColor: '#76b5e5' },
    { segmentType: 'Urban', vulLevel: '1' as const, subLevel: 'None' as const, population: '25%', bgColor: '#71d6db' },
  ];

  return (
    <nav
      className="bg-white border-b border-transparent sticky top-0 z-50"
      style={{
        boxShadow: '0px 1px 2px 0px rgba(21,21,21,0.08)'
      }}
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Line 1: Main Navigation Tabs */}
        <div className="flex items-start justify-center gap-4 px-7 py-3">
          {line1NavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`
                flex items-center justify-center gap-1.5
                px-3 py-3 h-10
                rounded-[var(--radius-sm)]
                font-semibold text-base leading-4
                transition-colors
                ${
                  item.page === activePage
                    ? 'bg-[var(--primary-plain-hoverbg)] text-[var(--primary-plain-color)]'
                    : hoveredItem === item.label
                    ? 'bg-[var(--primary-plain-hoverbg)] text-[var(--primary-plain-color)]'
                    : 'text-[var(--primary-plain-color)]'
                }
              `}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.hasIcon && (
                <div className="w-5 h-5 rounded-full border border-[var(--primary-600)] overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.icon!}
                    alt=""
                    width={20}
                    height={20}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Line 2: Segment Cards - Conditionally shown */}
        {showSegmentCards && (
          <div className="flex items-center justify-center gap-4 px-7 pb-4">
            {segmentCards.map((segment, index) => (
            <div
              key={`${segment.segmentType}-${segment.vulLevel}-${index}`}
              className={`border border-[var(--primary-outlined-border)] rounded-[var(--radius-sm)] px-4 py-2 transition-colors cursor-pointer ${
                hoveredCard === index ? 'bg-[#D9F0FF]' : 'bg-white'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col items-start justify-center">
                {/* Segment name with number icon */}
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-base leading-6 text-black whitespace-nowrap">
                    {segment.segmentType}
                  </p>
                  <VulnerabilityNumberTag
                    vulLevel={segment.vulLevel}
                    subLevel={segment.subLevel}
                    className="h-6"
                    style={{ backgroundColor: segment.bgColor }}
                  />
                </div>
                {/* Population percentage */}
                <div className="flex items-baseline gap-1 text-[var(--text-tertiary)] whitespace-nowrap">
                  <span className="font-semibold text-base leading-6">
                    {segment.population}
                  </span>
                  <span className="font-normal text-sm leading-[1.42]">
                    of pop.
                  </span>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
