'use client';

import Image from 'next/image';

interface DataInterpretationNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  onViewDetails: () => void;
}

export default function DataInterpretationNotification({
  isVisible,
  onClose,
  onViewDetails
}: DataInterpretationNotificationProps) {
  if (!isVisible) return null;

  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-[#FFF4E6] border border-[#FFE0B2] rounded-[var(--radius-sm)]">
      {/* Warning Icon */}
      <Image
        src="/Assets/Icons/WarningFilled.svg"
        alt="Warning"
        width={24}
        height={24}
        className="flex-shrink-0 mt-0.5"
      />

      {/* Content */}
      <div className="flex-1">
        <p className="text-base text-[var(--text-secondary)]" style={{ lineHeight: '1.5' }}>
          Pathways surveys offer helpful insights into state segment patterns, but are not designed for exact state-level results. Interpret this data carefully.{' '}
          <button
            onClick={onViewDetails}
            className="text-[var(--primary-plain-color)] font-semibold hover:underline cursor-pointer"
          >
            View source data details
          </button>
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-[#FFD699] transition-colors"
        aria-label="Close notification"
      >
        <Image
          src="/Assets/Icons/Close.svg"
          alt="Close"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}
