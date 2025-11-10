'use client';

import Link from 'next/link';
import Image from 'next/image';
import VulnerabilityNumberTag from './VulnerabilityNumberTag';

export default function AnalysePopulationSegments() {
  const segments = [
    { type: 'Rural', level: '4' as const, subLevel: 'None' as const, pop: '15%', value: 59, bgColor: '#FFD6D8' },
    { type: 'Rural', level: '3' as const, subLevel: '1' as const, pop: '15%', value: 43, bgColor: '#F7DBFF' },
    { type: 'Rural', level: '3' as const, subLevel: '2' as const, pop: '22%', value: 63, bgColor: '#F7DBFF' },
    { type: 'Rural', level: '2' as const, subLevel: 'None' as const, pop: '15%', value: 31, bgColor: '#D9F0FF' },
    { type: 'Urban', level: '4' as const, subLevel: 'None' as const, pop: '14%', value: 38, bgColor: '#FFD6D8' },
    { type: 'Urban', level: '3' as const, subLevel: 'None' as const, pop: '16%', value: 14, bgColor: '#F7DBFF' },
    { type: 'Urban', level: '2' as const, subLevel: 'None' as const, pop: '2%', value: 16, bgColor: '#D9F0FF' },
    { type: 'Urban', level: '1' as const, subLevel: 'None' as const, pop: '1%', value: 6, bgColor: '#C9F2DC' }
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Title and Description */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold leading-[1.5] text-[var(--text-primary)]">
          Dive deeper into the data
        </h2>
        <p className="text-base font-normal leading-[1.5] text-[var(--text-tertiary)]">
          Compare segments side-by-side or explore geographic distribution
        </p>
      </div>

      {/* Two Cards Side by Side */}
      <div className="flex gap-4">
        {/* Left Card: Compare segments */}
        <div className="flex-1 bg-white border border-[var(--primary-outlined-border)] rounded-[var(--radius-lg)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pl-4 pr-0 py-0 bg-white">
            <h3 className="text-xl font-semibold leading-[1.55] text-[var(--text-secondary)]">
              Compare segments
            </h3>
            <Link
              href="/compare-segments"
              className="flex items-center gap-3 px-6 h-12 text-base font-semibold leading-4 text-[var(--primary-plain-color)] hover:bg-[#D9F0FF] transition-all rounded-[var(--radius-sm)]"
            >
              <span>Compare now</span>
              <div className="w-7 h-7 flex items-center justify-center">
                <Image
                  src="/Assets/Icons/_Button_/ArrowForwardFilled.svg"
                  alt=""
                  width={28}
                  height={28}
                />
              </div>
            </Link>
          </div>

          {/* Content */}
          <div className="px-4 py-6">
            <p className="text-base font-semibold leading-[1.5] text-[var(--text-tertiary)] mb-3">
              Zero dose for any child
            </p>

            {/* Segment Rows */}
            <div className="space-y-3 relative">
              {/* Median line */}
              <div
                className="absolute w-0.5 bg-[var(--text-tertiary)]"
                style={{
                  left: 'calc(120px + 16px + 224px * 0.31)',
                  top: '-8px',
                  bottom: '-8px',
                  zIndex: 10
                }}
              />

              {segments.map((segment, index) => (
                <div key={index} className="flex items-center gap-4 h-8">
                  {/* Left: Segment info */}
                  <div className="flex items-center gap-1" style={{ minWidth: '120px' }}>
                    <span className="text-base font-normal leading-[1.5] text-[var(--text-secondary)]">
                      {segment.type}
                    </span>
                    <VulnerabilityNumberTag
                      vulLevel={segment.level}
                      subLevel={segment.subLevel}
                      className="h-6"
                      style={{ backgroundColor: segment.bgColor }}
                    />
                    <span className="text-sm font-normal leading-[1.42] text-[var(--text-tertiary)]">
                      · {segment.pop}
                    </span>
                  </div>

                  {/* Middle: Progress bar */}
                  <div className="flex-1 flex items-center gap-1" style={{ minWidth: '224px' }}>
                    <div className="flex-1 h-6 relative">
                      <div
                        className="absolute inset-0 border border-[var(--neutral-outlined-border)] rounded-sm"
                      />
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-[var(--data-categorical-1-main)] rounded-sm"
                        style={{ width: `${segment.value}%` }}
                      />
                    </div>
                  </div>

                  {/* Right: Percentage */}
                  <div className="flex items-center gap-2" style={{ minWidth: '46px' }}>
                    <span className="text-sm font-semibold leading-[1.42] text-[var(--text-secondary)] text-right" style={{ minWidth: '38px' }}>
                      {segment.value}%
                    </span>
                    <div className="w-2 h-2">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <circle cx="4" cy="4" r="4" fill="var(--data-categorical-1-main)" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Explore prevalence */}
        <div className="flex-1 bg-white border border-[var(--primary-outlined-border)] rounded-[var(--radius-lg)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pl-4 pr-0 py-0 bg-white">
            <h3 className="text-xl font-semibold leading-[1.55] text-[var(--text-secondary)]">
              Explore prevalence
            </h3>
            <Link
              href="/"
              className="flex items-center gap-3 px-6 h-12 text-base font-semibold leading-4 text-[var(--primary-plain-color)] hover:bg-[#D9F0FF] transition-all rounded-[var(--radius-sm)]"
            >
              <span>Explore map</span>
              <div className="w-7 h-7 flex items-center justify-center">
                <Image
                  src="/Assets/Icons/_Button_/ArrowForwardFilled.svg"
                  alt=""
                  width={28}
                  height={28}
                />
              </div>
            </Link>
          </div>

          {/* Content: Pie Chart Placeholder */}
          <div className="p-10 flex flex-col items-center">
            <div className="text-center mb-4">
              <p className="text-base font-semibold leading-[1.5] text-[var(--text-tertiary)]">
                17,522,552
              </p>
              <p className="text-sm font-normal leading-[1.42] text-[var(--text-tertiary)]">
                total population of women (18-49) with an U5 child
              </p>
            </div>

            {/* Pie Chart - Using existing implementation from senegal-overview */}
            <div className="w-[285px] h-[285px] bg-gray-100 rounded-full flex items-center justify-center">
              <p className="text-sm text-gray-500">Pie Chart Visualization</p>
            </div>

            {/* Legend */}
            <div className="mt-8 space-y-2">
              <p className="text-sm font-semibold text-center text-[var(--text-tertiary)]">
                Vulnerability levels
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ backgroundColor: '#FFD6D8' }}>
                  <span className="text-base font-semibold leading-[1.5]" style={{ color: '#690133' }}>4. Most</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ backgroundColor: '#F7DBFF' }}>
                  <span className="text-base font-semibold leading-[1.5]" style={{ color: '#6F22A8' }}>3. More</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ backgroundColor: '#D9F0FF' }}>
                  <span className="text-base font-semibold leading-[1.5]" style={{ color: '#001E5E' }}>2. Less</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ backgroundColor: '#C9F2DC' }}>
                  <span className="text-base font-semibold leading-[1.5]" style={{ color: '#003D1B' }}>1. Least</span>
                </div>
              </div>

              <p className="text-sm font-semibold text-center text-[var(--text-tertiary)] pt-4">
                Area type
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4" style={{ backgroundColor: '#A6D854' }}></div>
                  <span className="text-sm font-normal leading-[1.42] text-[var(--text-tertiary)]">Rural</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4" style={{ backgroundColor: '#B3B3B3' }}></div>
                  <span className="text-sm font-normal leading-[1.42] text-[var(--text-tertiary)]">Urban</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--background-level1)] border border-[var(--primary-outlined-border)] rounded-[var(--radius-sm)]">
        <div className="flex items-center gap-2">
          <Image
            src="/Assets/Icons/WarningFilled.svg"
            alt="Warning"
            width={24}
            height={24}
          />
          <p className="text-base font-normal leading-[1.5] text-[var(--text-secondary)]">
            The segmentation is nationally representative <span className="font-semibold text-[#1F1E1C]">only</span>, including women aged 18-19 with a child under 5
          </p>
        </div>
        <Link
          href="/source-data"
          className="flex items-center gap-1.5 px-2 py-1.5 text-sm font-semibold leading-[14px] text-[var(--primary-plain-color)] hover:bg-[var(--primary-plain-hoverbg)] transition-colors rounded-[var(--radius-sm)] whitespace-nowrap"
        >
          View source data details
        </Link>
      </div>
    </div>
  );
}
