'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SourceDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SourceDataModal({ isOpen, onClose }: SourceDataModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      setIsAnimating(true);
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[10000] transition-all duration-300"
      style={{
        backgroundColor: 'rgba(0, 12, 36, 0.85)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)'
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-[640px] w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 ease-out"
        style={{
          transform: isAnimating ? 'translateY(0)' : 'translateY(100px)',
          opacity: isAnimating ? 1 : 0
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Source data details
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <Image
              src="/Assets/Icons/close_alt.svg"
              alt="Close"
              width={20}
              height={20}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-5">
            {/* Data source */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-tertiary)] mb-1.5">
                Data source
              </h3>
              <p className="text-base text-[var(--text-primary)]">
                DHS 2022
              </p>
            </div>

            {/* Created in */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-tertiary)] mb-1.5">
                Created in
              </h3>
              <p className="text-base text-[var(--text-primary)]">
                September 2022
              </p>
            </div>

            {/* Sample population */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-tertiary)] mb-1.5">
                Sample population
              </h3>
              <p className="text-base text-[var(--text-primary)]">
                Women aged 18-49 with a U5 child(ren)
              </p>
            </div>

            {/* Sample size */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-tertiary)] mb-1.5">
                Sample size
              </h3>
              <p className="text-base text-[var(--text-primary)]">
                7,245
              </p>
            </div>

            {/* Geographic coverage */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-tertiary)] mb-1.5">
                Geographic coverage
              </h3>
              <p className="text-base text-[var(--text-primary)]">
                14 districts
              </p>
            </div>

            {/* Sample approach */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-tertiary)] mb-1.5">
                Sample approach
              </h3>
              <p className="text-base text-[var(--text-primary)]" style={{ lineHeight: '1.6' }}>
                One-stage sampling. Households are selected directly from Local Government Areas (LGAs). Households are chosen from a complete list within each LGA with a known chance of selection. Data is weighted to reflect the national population, accounting for selection and response rate differences.
              </p>
            </div>

            {/* Representativeness */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-tertiary)] mb-1.5">
                Representativeness
              </h3>
              <p className="text-base text-[var(--text-primary)]">
                Nationally representative only
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-semibold text-[var(--text-primary)] hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
