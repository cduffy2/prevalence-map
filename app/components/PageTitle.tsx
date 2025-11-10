'use client';

import Image from 'next/image';
import { useState } from 'react';
import SourceDataModal from './SourceDataModal';

interface PageTitleProps {
  viewMode: 'stacked' | 'pie';
  onViewModeChange: (mode: 'stacked' | 'pie') => void;
}

export default function PageTitle({ viewMode, onViewModeChange }: PageTitleProps) {
  const [hoveredStackedButton, setHoveredStackedButton] = useState(false);
  const [hoveredPieButton, setHoveredPieButton] = useState(false);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);

  return (
    <div className="border-b border-gray-100" style={{ marginTop: '40px' }}>
      <div className="max-w-[1360px] mx-auto px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Title and Source Data Button */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold leading-[1.5] text-[var(--text-primary)]">
              Prevalence map
            </h1>
            <button
              onClick={() => setIsSourceModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--primary-plain-color)] rounded-[var(--radius-sm)] hover:bg-[var(--primary-plain-hoverbg)] transition-colors"
            >
              <Image
                src="/Assets/Icons/InfoOutlined.svg"
                alt="Info"
                width={20}
                height={20}
              />
              View source data details
            </button>
          </div>

          {/* Right: View Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text-tertiary)]">View:</span>
            <div className="flex border border-[var(--primary-outlined-border)] rounded-[var(--radius-sm)]" style={{ overflow: 'visible' }}>
              <div className="relative">
                <button
                  className={`flex items-center justify-center px-3 py-2 min-h-[32px] transition-colors ${
                    viewMode === 'stacked'
                      ? 'bg-[var(--primary-200)] text-[var(--text-link-hover)]'
                      : 'text-[var(--primary-outlined-color)] hover:bg-gray-50'
                  }`}
                  onClick={() => onViewModeChange('stacked')}
                  onMouseEnter={() => setHoveredStackedButton(true)}
                  onMouseLeave={() => setHoveredStackedButton(false)}
                  aria-label="Stacked bar chart view"
                >
                  <Image
                    src="/Assets/Icons/Stacked-bar-chart.svg"
                    alt="Stacked bar chart"
                    width={20}
                    height={20}
                  />
                </button>

                {/* Stacked bar chart tooltip */}
                {hoveredStackedButton && (
                  <div
                    className="absolute left-1/2 bottom-full mb-2 transform -translate-x-1/2 rounded-[var(--radius-sm)] shadow-lg p-3 whitespace-nowrap"
                    style={{
                      backgroundColor: '#383633',
                      zIndex: 9999,
                      pointerEvents: 'none'
                    }}
                  >
                    <div className="text-xs text-white">
                      Stacked bar charts
                    </div>
                    {/* Arrow */}
                    <div className="absolute left-1/2 -bottom-2 w-4 h-4 -translate-x-1/2 rotate-45" style={{ backgroundColor: '#383633' }}></div>
                  </div>
                )}
              </div>

              <div className="w-px bg-[var(--primary-outlined-border)]" />

              <div className="relative">
                <button
                  className={`flex items-center justify-center px-3 py-2 min-h-[32px] transition-colors ${
                    viewMode === 'pie'
                      ? 'bg-[var(--primary-200)] text-[var(--text-link-hover)]'
                      : 'text-[var(--primary-outlined-color)] hover:bg-gray-50'
                  }`}
                  onClick={() => onViewModeChange('pie')}
                  onMouseEnter={() => setHoveredPieButton(true)}
                  onMouseLeave={() => setHoveredPieButton(false)}
                  aria-label="Pie chart view"
                >
                  <Image
                    src="/Assets/Icons/Pie-chart.svg"
                    alt="Pie chart"
                    width={20}
                    height={20}
                  />
                </button>

                {/* Pie chart tooltip */}
                {hoveredPieButton && (
                  <div
                    className="absolute left-1/2 bottom-full mb-2 transform -translate-x-1/2 rounded-[var(--radius-sm)] shadow-lg p-3 whitespace-nowrap"
                    style={{
                      backgroundColor: '#383633',
                      zIndex: 9999,
                      pointerEvents: 'none'
                    }}
                  >
                    <div className="text-xs text-white">
                      Pie charts
                    </div>
                    {/* Arrow */}
                    <div className="absolute left-1/2 -bottom-2 w-4 h-4 -translate-x-1/2 rotate-45" style={{ backgroundColor: '#383633' }}></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Source Data Modal */}
      <SourceDataModal isOpen={isSourceModalOpen} onClose={() => setIsSourceModalOpen(false)} />
    </div>
  );
}
