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
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="border-b border-gray-100" style={{ marginTop: '40px' }}>
      <div className="max-w-[1360px] mx-auto px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Title and Help */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold leading-[1.5] text-[var(--text-primary)]">
              Prevalence map
            </h1>
            <div
              className="relative"
              onMouseEnter={() => setShowHelpTooltip(true)}
              onMouseLeave={() => setShowHelpTooltip(false)}
            >
              <button
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-[var(--radius-sm)] text-sm font-semibold text-[var(--primary-plain-color)] hover:bg-[var(--primary-plain-hoverbg)] transition-colors"
              >
                <Image
                  src="/Assets/Icons/InfoOutlined.svg"
                  alt="Info"
                  width={16}
                  height={16}
                />
                <span>Help interpreting this data</span>
              </button>

              {/* Help Tooltip */}
              {showHelpTooltip && (
                <div
                  className="absolute left-0 top-full pt-2"
                  style={{ zIndex: 9999 }}
                >
                  <div
                    className="rounded-lg shadow-xl p-4 w-[320px] relative"
                    style={{ backgroundColor: '#383633' }}
                  >
                    {/* Arrow */}
                    <div className="absolute left-6 -top-1.5 w-3 h-3 rotate-45" style={{ backgroundColor: '#383633' }}></div>

                    <div className="text-sm text-white mb-4" style={{ lineHeight: '1.6' }}>
                      Pathways surveys offer helpful insights into state segment patterns, but are not designed for exact state-level results.
                      <br /><br />
                      Interpret this data carefully.
                    </div>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setShowHelpTooltip(false);
                      }}
                      className="w-full px-3 py-2 bg-white rounded-md text-sm font-semibold text-[var(--text-primary)] hover:bg-gray-50 transition-colors"
                    >
                      View source data details
                    </button>
                  </div>
                </div>
              )}
            </div>
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
      <SourceDataModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
