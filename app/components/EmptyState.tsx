'use client';

import Image from 'next/image';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg">
      <div className="flex flex-col items-center justify-center text-center max-w-md">
        <Image
          src="/Assets/Icons/Geography.svg"
          alt="Geography"
          width={167}
          height={117}
          className="mb-6"
        />
        <p className="text-lg leading-[1.66] text-[var(--text-primary)] font-semibold text-center">
          Use the map or list on the left to compare population distribution across counties
        </p>
      </div>
    </div>
  );
}
