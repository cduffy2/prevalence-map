'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@mui/joy/Button';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ExportFormat = 'png' | 'csv' | null;
type ChartType = 'stacked' | 'pie' | null;

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('png');
  const [selectedChartType, setSelectedChartType] = useState<ChartType>('stacked');

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger animation
      setTimeout(() => setIsAnimating(true), 10);
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      setTimeout(() => {
        setShouldRender(false);
        // Reset to step 1 when fully closed
        setStep(1);
        setSelectedFormat('png');
        setSelectedChartType('stacked');
      }, 300);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleFormatSelect = (format: ExportFormat) => {
    setSelectedFormat(format);
  };

  const handleExport = () => {
    if (selectedFormat === 'png') {
      // Move to step 2 for PNG selection
      setStep(2);
    } else if (selectedFormat === 'csv') {
      // For CSV, just close the modal (simulate download)
      handleClose();
    }
  };

  const handleExportImage = () => {
    // Simulate export
    handleClose();
  };

  const handleCancel = () => {
    // Go back to step 1
    setStep(1);
    setSelectedFormat('png');
  };

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[10000] transition-all duration-300"
      style={{
        backgroundColor: 'rgba(0, 12, 36, 0.85)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)'
      }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl mx-4 overflow-hidden flex flex-col transition-all duration-300 ease-out"
        style={{
          width: step === 1 ? '480px' : '640px',
          transform: isAnimating ? 'translateY(0)' : 'translateY(40px)',
          opacity: isAnimating ? 1 : 0
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {step === 1 ? (
          <>
            {/* Step 1: Format Selection */}
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Select a format to export
              </h2>
              <button
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <Image
                  src="/Assets/Icons/Close.svg"
                  alt="Close"
                  width={20}
                  height={20}
                />
              </button>
            </div>

            {/* Format options */}
            <div className="px-6 pb-6">
              <div className="space-y-5">
                {/* PNG option */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="png"
                    checked={selectedFormat === 'png'}
                    onChange={() => handleFormatSelect('png')}
                    className="mt-1"
                    style={{
                      width: '20px',
                      height: '20px',
                      accentColor: 'var(--primary-plain-color)'
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-[var(--text-primary)]">PNG</span>
                      <span className="text-base text-[var(--text-tertiary)]">
                        · best for high-quality images in presentations
                      </span>
                    </div>
                  </div>
                </label>

                {/* CSV option */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={selectedFormat === 'csv'}
                    onChange={() => handleFormatSelect('csv')}
                    className="mt-1"
                    style={{
                      width: '20px',
                      height: '20px',
                      accentColor: 'var(--primary-plain-color)'
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-[var(--text-primary)]">CSV</span>
                      <span className="text-base text-[var(--text-tertiary)]">
                        · raw data for further analysis
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <Button
                variant="solid"
                color="primary"
                fullWidth
                onClick={handleExport}
                disabled={!selectedFormat}
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Export
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: PNG Chart Type Selection */}
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Export png
              </h2>
              <button
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <Image
                  src="/Assets/Icons/Close.svg"
                  alt="Close"
                  width={20}
                  height={20}
                />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <p className="text-base text-[var(--text-primary)] mb-4">
                Select how you&apos;d like the data to display in your image:
              </p>

              <div className="flex gap-4">
                {/* Stacked bar charts option */}
                <div
                  className={`flex-1 border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedChartType === 'stacked'
                      ? 'border-[var(--primary-plain-color)] bg-[var(--primary-plain-hoverbg)]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedChartType('stacked')}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="radio"
                      name="chartType"
                      value="stacked"
                      checked={selectedChartType === 'stacked'}
                      onChange={() => setSelectedChartType('stacked')}
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: 'var(--primary-plain-color)'
                      }}
                    />
                    <span className="text-base font-semibold text-[var(--text-primary)]">
                      Stacked bar charts
                    </span>
                  </div>

                  {/* Preview of stacked bars */}
                  <div className="space-y-3 pl-2">
                    {[
                      { label: 'District #1 (12%)', colors: ['#86efac', '#7dd3fc', '#f0abfc', '#fda4af'] },
                      { label: 'District #2 (25%)', colors: ['#86efac', '#7dd3fc', '#f0abfc', '#fda4af'] },
                      { label: 'District #3 (11%)', colors: ['#86efac', '#7dd3fc', '#f0abfc', '#fda4af'] },
                      { label: 'District #4 (9%)', colors: ['#86efac', '#7dd3fc', '#f0abfc', '#fda4af'] },
                      { label: 'District #5 (21%)', colors: ['#86efac', '#7dd3fc', '#f0abfc', '#fda4af'] },
                    ].map((district, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-tertiary)] w-28">{district.label}</span>
                        <div className="flex-1 h-5 flex rounded-sm overflow-hidden border border-gray-200">
                          {district.colors.map((color, colorIdx) => (
                            <div
                              key={colorIdx}
                              style={{
                                backgroundColor: color,
                                width: `${100 / district.colors.length}%`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pie charts option */}
                <div
                  className={`flex-1 border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedChartType === 'pie'
                      ? 'border-[var(--primary-plain-color)] bg-[var(--primary-plain-hoverbg)]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedChartType('pie')}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="radio"
                      name="chartType"
                      value="pie"
                      checked={selectedChartType === 'pie'}
                      onChange={() => setSelectedChartType('pie')}
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: 'var(--primary-plain-color)'
                      }}
                    />
                    <span className="text-base font-semibold text-[var(--text-primary)]">
                      Pie charts
                    </span>
                  </div>

                  {/* Simplified pie chart preview */}
                  <div className="flex justify-center items-center h-48">
                    <div className="relative w-40 h-40">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="#86efac" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#7dd3fc"
                          strokeWidth="80"
                          strokeDasharray="75 25"
                          strokeDashoffset="0"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#f0abfc"
                          strokeWidth="80"
                          strokeDasharray="50 50"
                          strokeDashoffset="-75"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#fda4af"
                          strokeWidth="80"
                          strokeDasharray="25 75"
                          strokeDashoffset="-125"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-[var(--text-primary)]">District #1</div>
                          <div className="text-xs text-[var(--text-tertiary)]">(12%)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleCancel}
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                color="primary"
                fullWidth
                onClick={handleExportImage}
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Export image
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
