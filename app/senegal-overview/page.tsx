'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import SecondaryNav from '../components/SecondaryNav';
import Footer from '../components/Footer';
import IllustratedSegmentCard from '../components/IllustratedSegmentCard';
import VulnerabilityNumberTag from '../components/VulnerabilityNumberTag';

export default function SenegalOverview() {
  const [showNavCards, setShowNavCards] = useState(false);
  const segmentCardsRef = useRef<HTMLDivElement>(null);

  const illustratedSegmentData = [
    {
      segmentName: 'Rural-4',
      population: '15%',
      vulnerabilityLevel: 'Most vulnerable' as const,
      imagePath: '/Assets/illustrations/Rural-4.png'
    },
    {
      segmentName: 'Urban-4',
      population: '10%',
      vulnerabilityLevel: 'Most vulnerable' as const,
      imagePath: '/Assets/illustrations/Urban-4.png'
    },
    {
      segmentName: 'Urban-3',
      population: '10%',
      vulnerabilityLevel: 'More vulnerable' as const,
      imagePath: '/Assets/illustrations/Urban-3.png'
    },
    {
      segmentName: 'Rural-3.1',
      population: '16%',
      vulnerabilityLevel: 'More vulnerable' as const,
      imagePath: '/Assets/illustrations/Rural-3.1.png'
    },
    {
      segmentName: 'Rural-3.2',
      population: '15%',
      vulnerabilityLevel: 'More vulnerable' as const,
      imagePath: '/Assets/illustrations/Rural-3.2.png'
    },
    {
      segmentName: 'Urban-2',
      population: '15%',
      vulnerabilityLevel: 'Less vulnerable' as const,
      imagePath: '/Assets/illustrations/Urban-2.png'
    },
    {
      segmentName: 'Rural-2',
      population: '22%',
      vulnerabilityLevel: 'Less vulnerable' as const,
      imagePath: '/Assets/illustrations/Rural-2.png'
    },
    {
      segmentName: 'Urban-1',
      population: '6%',
      vulnerabilityLevel: 'Least vulnerable' as const,
      imagePath: '/Assets/illustrations/Urban-1.png'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (segmentCardsRef.current) {
        const rect = segmentCardsRef.current.getBoundingClientRect();
        // Show nav cards when segment cards scroll completely out of view
        setShowNavCards(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background-page-background)]">
      {/* Top Navigation */}
      <Navbar />

      {/* Secondary Navigation */}
      <SecondaryNav activePage="senegal-overview" showSegmentCards={showNavCards} />

      {/* Main Content */}
      <main className="flex-1" style={{ marginTop: '40px' }}>
        <div className="max-w-[1060px] mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            {/* Title and Description */}
            <div className="flex flex-col gap-1 mb-6">
              <h1 className="text-[30px] font-bold leading-[1.33] text-[var(--text-primary)]">
                Understand health vulnerabilities across Senegal
              </h1>
              <p className="text-[18px] font-normal leading-[1.55] text-[var(--text-tertiary)] max-w-[800px]">
                A comprehensive analysis of 9 distinct population segments, capturing the diversity of health needs and vulnerabilities across rural and urban communities throughout the country.
              </p>
            </div>

            {/* Stats Cards Row */}
            <div className="flex items-start justify-between w-full">
              {/* Card 1: 8 segments */}
              <div className="flex items-center gap-2 pr-2">
                <div className="w-16 h-16 shrink-0 bg-[#f1e6f4] rounded-[var(--radius-sm)] flex items-center justify-center p-2">
                  <Image
                    src="/Assets/Icons/Segments icon.svg"
                    alt="Segments"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold leading-[1.5] text-[var(--text-primary)]">8</span>
                    <span className="text-base font-normal leading-[1.5] text-[var(--text-tertiary)]">segments</span>
                  </div>
                  <p className="text-sm font-semibold leading-[1.42] text-[var(--text-tertiary)]">
                    3 urban, 5 rural
                  </p>
                </div>
              </div>

              {/* Card 2: 14,526 respondents */}
              <div className="flex items-center gap-2 pr-2">
                <div className="w-16 h-16 shrink-0 bg-[#f1e6f4] rounded-[var(--radius-sm)] flex items-center justify-center p-2">
                  <Image
                    src="/Assets/Icons/People.svg"
                    alt="People"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold leading-[1.5] text-[var(--text-primary)]">14,526</span>
                    <span className="text-base font-normal leading-[1.5] text-[var(--text-tertiary)]">respondents</span>
                  </div>
                  <p className="text-sm font-semibold leading-[1.42] text-[var(--text-tertiary)]">
                    DHS survey, 2022
                  </p>
                </div>
              </div>

              {/* Card 3: 33% urban */}
              <div className="flex items-center gap-2 pr-2">
                <div className="w-16 h-16 shrink-0 rounded-[var(--radius-sm)]" style={{ backgroundColor: 'rgba(232,166,81,0.2)' }} />
                <div className="flex flex-col justify-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold leading-[1.5] text-[var(--text-primary)]">33%</span>
                    <div className="flex items-center gap-1">
                      <span className="text-base font-normal leading-[1.5] text-[var(--text-tertiary)]">urban</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6.67" stroke="#636B74" strokeWidth="1.33" />
                        <path d="M8 6.67v4" stroke="#636B74" strokeWidth="1.33" strokeLinecap="round" />
                        <circle cx="8" cy="4.67" r="0.67" fill="#636B74" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm font-semibold leading-[1.42] text-[var(--text-tertiary)]">
                    across 3 segments
                  </p>
                </div>
              </div>

              {/* Card 4: 67% rural */}
              <div className="flex items-center gap-2 pr-2">
                <div className="w-16 h-16 shrink-0 rounded-[var(--radius-sm)]" style={{ backgroundColor: 'rgba(179,179,179,0.2)' }} />
                <div className="flex flex-col justify-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold leading-[1.5] text-[var(--text-primary)]">67%</span>
                    <div className="flex items-center gap-1">
                      <span className="text-base font-normal leading-[1.5] text-[var(--text-tertiary)]">rural</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6.67" stroke="#636B74" strokeWidth="1.33" />
                        <path d="M8 6.67v4" stroke="#636B74" strokeWidth="1.33" strokeLinecap="round" />
                        <circle cx="8" cy="4.67" r="0.67" fill="#636B74" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm font-semibold leading-[1.42] text-[var(--text-tertiary)]">
                    across 5 segments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Segment Cards Section */}
          <div ref={segmentCardsRef} className="mb-16">
            <div className="flex flex-col gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] leading-[1.5]">
                8 distinct population groups
              </h2>
              <p className="text-base font-normal text-[var(--text-tertiary)] leading-[1.5]" style={{ maxWidth: '723px' }}>
                Each segment represents a unique combination of behaviours and vulnerabilities across rural and urban environments
              </p>
            </div>

            <div className="flex flex-wrap" style={{ gap: '16px', width: '1060px' }}>
              {illustratedSegmentData.map((segment, index) => (
                <IllustratedSegmentCard
                  key={`${segment.segmentName}-${index}`}
                  {...segment}
                />
              ))}
            </div>
          </div>

          {/* Dive deeper into the data section */}
          <div className="mb-16">
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="text-[24px] font-semibold leading-[1.5] text-[var(--text-primary)]">
                Dive deeper into the data
              </h2>
              <p className="text-[16px] font-normal leading-[1.5] text-[var(--text-tertiary)]">
                Compare segments side-by-side or explore geographic distribution
              </p>
            </div>

            {/* Two cards side by side */}
            <div className="flex gap-4 mb-4">
              {/* Left Card: Compare segments */}
              <div className="flex-1 bg-white border border-[var(--primary-outlined-border)] rounded-[var(--radius-lg)] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between pl-6 pr-0 border-b border-[var(--primary-outlined-border)]" style={{ height: '48px', backgroundColor: 'var(--level-1)' }}>
                  <h3 className="text-[20px] font-semibold leading-[1.4] text-[var(--text-primary)]">
                    Compare segments
                  </h3>
                  <Link href="/compare-segments" className="flex items-center gap-1 px-6 h-full text-[14px] font-semibold leading-[1.42] text-[var(--primary-plain-color)] hover:bg-[#D9F0FF] transition-all">
                    <span>Compare now</span>
                    <Image
                      src="/Assets/Icons/_Button_/ArrowForwardFilled.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>

                {/* Content: Horizontal bar chart */}
                <div className="p-6">
                  <p className="text-[14px] font-semibold leading-[1.42] text-[var(--text-tertiary)] mb-4">
                    Zero dose for any child
                  </p>

                  {/* Bar chart rows */}
                  <div className="space-y-2 relative">
                    {/* Median line - extends through all rows */}
                    <div
                      className="absolute w-0.5 bg-[var(--text-tertiary)]"
                      style={{
                        left: 'calc(105px + 8px + 31%)',
                        top: '-16px',
                        bottom: '-8px',
                        zIndex: 10
                      }}
                    >
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-[var(--text-tertiary)] whitespace-nowrap">
                        Median
                      </div>
                    </div>

                    {[
                      { type: 'Rural', level: '4' as const, subLevel: 'None' as const, pop: '15%', value: 59, bgColor: '#FFD6D8' },
                      { type: 'Rural', level: '3' as const, subLevel: '1' as const, pop: '16%', value: 43, bgColor: '#F7DBFF' },
                      { type: 'Rural', level: '3' as const, subLevel: '2' as const, pop: '15%', value: 63, bgColor: '#F7DBFF' },
                      { type: 'Rural', level: '2' as const, subLevel: 'None' as const, pop: '22%', value: 31, bgColor: '#D9F0FF' },
                      { type: 'Urban', level: '4' as const, subLevel: 'None' as const, pop: '10%', value: 38, bgColor: '#FFD6D8' },
                      { type: 'Urban', level: '3' as const, subLevel: 'None' as const, pop: '10%', value: 14, bgColor: '#F7DBFF' },
                      { type: 'Urban', level: '2' as const, subLevel: 'None' as const, pop: '15%', value: 16, bgColor: '#D9F0FF' },
                      { type: 'Urban', level: '1' as const, subLevel: 'None' as const, pop: '6%', value: 6, bgColor: '#C9F2DC' }
                    ].map((segment, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {/* Segment name with icon and population */}
                        <div className="flex items-center gap-1.5" style={{ minWidth: '105px' }}>
                          <span className="text-[14px] font-semibold leading-[1.42] text-[var(--text-primary)]">
                            {segment.type}
                          </span>
                          <VulnerabilityNumberTag
                            vulLevel={segment.level}
                            subLevel={segment.subLevel}
                            className="h-5"
                            style={{ backgroundColor: segment.bgColor }}
                          />
                          <span className="text-[12px] font-normal leading-[1.33] text-[var(--text-tertiary)]">
                            {segment.pop}
                          </span>
                        </div>

                        {/* Bar chart */}
                        <div className="flex-1 relative h-5">
                          <div className="absolute inset-0 rounded-sm" style={{ backgroundColor: '#F5F5F5' }}></div>
                          <div
                            className="absolute left-0 top-0 bottom-0 rounded-sm"
                            style={{
                              width: `${segment.value}%`,
                              backgroundColor: '#9ED4FF'
                            }}
                          ></div>
                        </div>

                        {/* Percentage value */}
                        <span className="text-[14px] font-semibold leading-[1.42] text-[var(--text-primary)]" style={{ minWidth: '32px', textAlign: 'right' }}>
                          {segment.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Card: Explore prevalence */}
              <div className="flex-1 bg-white border border-[var(--primary-outlined-border)] rounded-[var(--radius-lg)] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between pl-6 pr-0 border-b border-[var(--primary-outlined-border)]" style={{ height: '48px', backgroundColor: 'var(--level-1)' }}>
                  <h3 className="text-[20px] font-semibold leading-[1.4] text-[var(--text-primary)]">
                    Explore prevalence
                  </h3>
                  <Link href="/" className="flex items-center gap-1 px-6 h-full text-[14px] font-semibold leading-[1.42] text-[var(--primary-plain-color)] hover:bg-[#D9F0FF] transition-all">
                    <span>Explore map</span>
                    <Image
                      src="/Assets/Icons/_Button_/ArrowForwardFilled.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>

                {/* Content: Pie chart */}
                <div className="p-6 flex flex-col items-center">
                  <div className="text-center mb-4">
                    <p className="text-[16px] font-semibold leading-[1.5] text-[var(--text-primary)]">
                      17,522,552
                    </p>
                    <p className="text-[14px] font-normal leading-[1.42] text-[var(--text-tertiary)]">
                      total population of women (18-49) with an U5 child
                    </p>
                  </div>

                  {/* Pie Chart SVG */}
                  <div className="relative" style={{ width: '280px', height: '280px' }}>
                    <svg width="280" height="280" viewBox="0 0 280 280">
                      <defs>
                        {/* Diagonal line pattern for R3.1 */}
                        <pattern id="diagonalPattern" patternUnits="userSpaceOnUse" width="8" height="8">
                          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" stroke="white" strokeWidth="2" />
                        </pattern>
                        {/* Crosshatch pattern for R3.2 */}
                        <pattern id="crosshatchPattern" patternUnits="userSpaceOnUse" width="8" height="8">
                          <path d="M0,0 l8,8 M-2,6 l4,4 M6,-2 l4,4" stroke="white" strokeWidth="1.5" />
                          <path d="M0,8 l8,-8 M-2,2 l4,-4 M6,10 l4,-4" stroke="white" strokeWidth="1.5" />
                        </pattern>
                      </defs>
                      <g transform="translate(140, 140)">
                        {/* Outer ring - Urban/Rural split */}
                        {(() => {
                          const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
                            const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
                            return {
                              x: centerX + (radius * Math.cos(angleInRadians)),
                              y: centerY + (radius * Math.sin(angleInRadians))
                            };
                          };

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

                          // Rural: 68% (R-4: 15%, R-3.1: 16%, R-3.2: 15%, R-2: 22% = 68%)
                          // Urban: 32% (U-4: 10%, U-3: 10%, U-2: 15%, U-1: 6% - but we'll use remainder)
                          const ruralPercent = 68;
                          const urbanPercent = 32;

                          return (
                            <>
                              {/* Rural arc (orange) */}
                              <path
                                d={describeArcPath(0, 0, 130, 0, (ruralPercent / 100) * 360, 8)}
                                fill="#E8A651"
                                opacity="1"
                              />
                              {/* Urban arc (gray) */}
                              <path
                                d={describeArcPath(0, 0, 130, (ruralPercent / 100) * 360, 360, 8)}
                                fill="#9CA3AF"
                                opacity="1"
                              />
                            </>
                          );
                        })()}

                        {/* Inner pie slices for 8 segments */}
                        {(() => {
                          const segments = [
                            { name: 'R4', value: 15, color: '#FF858B', isRural: true },
                            { name: 'U4', value: 14, color: '#FF9FA4', isRural: false },
                            { name: 'U3', value: 16, color: '#EBAEFF', isRural: false },
                            { name: 'R3.1', value: 15, color: '#E594FF', isRural: true, pattern: 'diagonal' },
                            { name: 'R3.2', value: 22, color: '#E594FF', isRural: true, pattern: 'crosshatch' },
                            { name: 'U2', value: 2, color: '#9CD7FF', isRural: false },
                            { name: 'R2', value: 15, color: '#9CD7FF', isRural: true },
                            { name: 'U1', value: 1, color: '#81F3BC', isRural: false }
                          ];
                          const total = segments.reduce((sum, s) => sum + s.value, 0);
                          let currentAngle = 0;

                          const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
                            const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
                            return {
                              x: centerX + (radius * Math.cos(angleInRadians)),
                              y: centerY + (radius * Math.sin(angleInRadians))
                            };
                          };

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

                          return segments.map((segment, i) => {
                            const angle = (segment.value / total) * 360;
                            const startAngle = currentAngle;
                            const endAngle = currentAngle + angle;
                            const midAngle = (startAngle + endAngle) / 2;

                            const path = describeArc(0, 0, 110, startAngle, endAngle);

                            // Label position
                            const labelRadius = 70;
                            const labelPos = polarToCartesian(0, 0, labelRadius, midAngle);

                            // For small segments, use leader line
                            const isSmallSegment = segment.value < 10;
                            const edgePos = polarToCartesian(0, 0, 110, midAngle);
                            const leaderEndRadius = 135;
                            const leaderEndPos = polarToCartesian(0, 0, leaderEndRadius, midAngle);

                            currentAngle += angle;

                            return (
                              <g key={i}>
                                <path
                                  d={path}
                                  fill={segment.color}
                                  stroke="white"
                                  strokeWidth="2"
                                />
                                {segment.pattern && (
                                  <path
                                    d={path}
                                    fill={segment.pattern === 'diagonal' ? 'url(#diagonalPattern)' : 'url(#crosshatchPattern)'}
                                    stroke="white"
                                    strokeWidth="2"
                                  />
                                )}
                                {/* Label */}
                                {!isSmallSegment && (
                                  <>
                                    {/* Background rect for text on patterned segments */}
                                    {segment.pattern && (
                                      <rect
                                        x={labelPos.x - 22}
                                        y={labelPos.y - 12}
                                        width="44"
                                        height="24"
                                        rx="4"
                                        fill={segment.color}
                                        opacity="0.9"
                                      />
                                    )}
                                    <text
                                      x={labelPos.x}
                                      y={labelPos.y}
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                      className="text-xs pointer-events-none"
                                      fill="var(--text-primary)"
                                    >
                                      <tspan x={labelPos.x} dy="-0.3em" className="font-semibold text-[13px]">{segment.name}</tspan>
                                      <tspan x={labelPos.x} dy="1.2em" className="text-[11px]">{segment.value}%</tspan>
                                    </text>
                                  </>
                                )}
                                {/* Leader line for small segments */}
                                {isSmallSegment && (
                                  <>
                                    <line
                                      x1={edgePos.x}
                                      y1={edgePos.y}
                                      x2={leaderEndPos.x}
                                      y2={leaderEndPos.y}
                                      stroke="var(--text-tertiary)"
                                      strokeWidth="1"
                                    />
                                    <text
                                      x={leaderEndPos.x}
                                      y={leaderEndPos.y}
                                      textAnchor={leaderEndPos.x > 0 ? 'start' : 'end'}
                                      dominantBaseline="middle"
                                      className="text-xs pointer-events-none"
                                      fill="var(--text-primary)"
                                    >
                                      <tspan className="font-semibold text-[11px]">{segment.name} {segment.value}%</tspan>
                                    </text>
                                  </>
                                )}
                              </g>
                            );
                          });
                        })()}
                      </g>
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="mt-6">
                    <p className="text-[14px] font-semibold text-center mb-3" style={{ color: '#666666' }}>Vulnerability levels</p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ backgroundColor: '#FFD6D8' }}>
                        <span className="text-[13px] font-semibold" style={{ color: '#690133' }}>4. Most</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ backgroundColor: '#F7DBFF' }}>
                        <span className="text-[13px] font-semibold" style={{ color: '#6F22A8' }}>3. More</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ backgroundColor: '#D9F0FF' }}>
                        <span className="text-[13px] font-semibold" style={{ color: '#001E5E' }}>2. Less</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ backgroundColor: '#C9F2DC' }}>
                        <span className="text-[13px] font-semibold" style={{ color: '#003D1B' }}>1. Least</span>
                      </div>
                    </div>

                    <p className="text-[14px] font-semibold text-center mb-2" style={{ color: '#666666' }}>Area type</p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#E8A651' }}></div>
                        <span className="text-[12px] text-[var(--text-tertiary)]">Rural</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#9CA3AF' }}></div>
                        <span className="text-[12px] text-[var(--text-tertiary)]">Urban</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning banner */}
            <div className="flex items-center gap-3 px-4 rounded-[var(--radius-sm)] border border-[var(--primary-outlined-border)]" style={{ backgroundColor: 'var(--level-1)', height: '48px' }}>
              <Image
                src="/Assets/Icons/WarningFilled.svg"
                alt="Warning"
                width={20}
                height={20}
                className="shrink-0"
              />
              <div className="flex-1 flex items-center justify-between gap-4">
                <p className="text-[14px] font-normal leading-[1.42] text-[var(--text-primary)]">
                  The segmentation is nationally representative only, including women aged 18-19 with a child under 5
                </p>
                <Link href="/source-data" className="flex items-center gap-1 px-3 h-8 text-[14px] font-semibold leading-[1.42] text-[var(--primary-plain-color)] hover:bg-[#D9F0FF] transition-all whitespace-nowrap rounded">
                  <span>View source data details</span>
                  <Image
                    src="/Assets/Icons/_Button_/ArrowForwardFilled.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Key Findings Section */}
          <div className="mb-16">
            <h2 className="text-[24px] font-semibold leading-[1.5] text-[var(--text-primary)] mb-3">
              Key findings
            </h2>
            <p className="text-[16px] font-normal leading-[1.55] text-[var(--text-tertiary)] mb-6" style={{ maxWidth: '800px' }}>
              In Senegal, understanding health vulnerabilities provides insight into the complex interplay of socioeconomic factors, healthcare access, and disease burden. The country faces diverse health challenges affecting different population segments in unique ways.
            </p>

            {/* Single card with grid of findings */}
            <div className="p-6 bg-white border border-[var(--primary-outlined-border)] rounded-[var(--radius-lg)]">
              <div className="grid grid-cols-2 gap-6">
                {/* Finding 1 */}
                <div className="flex items-start gap-3">
                  <Image
                    src="/Assets/Icons/_Button_/ArrowForwardFilled.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="shrink-0 mt-1"
                    style={{ filter: 'invert(36%) sepia(93%) saturate(1068%) hue-rotate(182deg) brightness(94%) contrast(92%)' }}
                  />
                  <div>
                    <h3 className="text-[18px] font-semibold leading-[1.55] text-[var(--text-primary)] mb-2">
                      Urban-rural divide drives segmentation
                    </h3>
                    <p className="text-[16px] font-normal leading-[1.55] text-[var(--text-tertiary)]" style={{ fontFamily: 'var(--font-noto-serif)' }}>
                      Senegal's 8 vulnerability-based segments are primarily differentiated by geography, with 4 urban segments (smaller populations) and 4 rural segments (larger populations), despite less than 40% residing in urban areas.
                    </p>
                  </div>
                </div>

                {/* Finding 2 */}
                <div className="flex items-start gap-3">
                  <Image
                    src="/Assets/Icons/_Button_/ArrowForwardFilled.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="shrink-0 mt-1"
                    style={{ filter: 'invert(36%) sepia(93%) saturate(1068%) hue-rotate(182deg) brightness(94%) contrast(92%)' }}
                  />
                  <div>
                    <h3 className="text-[18px] font-semibold leading-[1.55] text-[var(--text-primary)] mb-2">
                      Greater urban heterogeneity
                    </h3>
                    <p className="text-[16px] font-normal leading-[1.55] text-[var(--text-tertiary)]" style={{ fontFamily: 'var(--font-noto-serif)' }}>
                      Urban regions display much greater differences in behaviors and health outcomes between segments compared to rural regions, where populations show more homogeneous characteristics.
                    </p>
                  </div>
                </div>

                {/* Finding 3 */}
                <div className="flex items-start gap-3">
                  <Image
                    src="/Assets/Icons/_Button_/ArrowForwardFilled.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="shrink-0 mt-1"
                    style={{ filter: 'invert(36%) sepia(93%) saturate(1068%) hue-rotate(182deg) brightness(94%) contrast(92%)' }}
                  />
                  <div>
                    <h3 className="text-[18px] font-semibold leading-[1.55] text-[var(--text-primary)] mb-2">
                      Rural populations face highest vulnerability
                    </h3>
                    <p className="text-[16px] font-normal leading-[1.55] text-[var(--text-tertiary)]" style={{ fontFamily: 'var(--font-noto-serif)' }}>
                      The most vulnerable segment is rural (Senegal R4, representing ~12% of the population), while only one urban segment (Senegal U1) achieves the least vulnerable classification, with no rural segments reaching this level.
                    </p>
                  </div>
                </div>

                {/* Finding 4 */}
                <div className="flex items-start gap-3">
                  <Image
                    src="/Assets/Icons/_Button_/ArrowForwardFilled.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="shrink-0 mt-1"
                    style={{ filter: 'invert(36%) sepia(93%) saturate(1068%) hue-rotate(182deg) brightness(94%) contrast(92%)' }}
                  />
                  <div>
                    <h3 className="text-[18px] font-semibold leading-[1.55] text-[var(--text-primary)] mb-2">
                      Urban advantage in health outcomes
                    </h3>
                    <p className="text-[16px] font-normal leading-[1.55] text-[var(--text-tertiary)]" style={{ fontFamily: 'var(--font-noto-serif)' }}>
                      Over 80% of the urban population across three segments falls into less or least vulnerable categories, demonstrating significantly better health outcomes in urban areas compared to rural ones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-4">Segmentation data</h2>
            {/* Will add segmentation data visualization here */}
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-4">Health outcomes and vulnerability factors</h2>
            {/* Will add vulnerability factors visualization here */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
