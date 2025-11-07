'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { label: 'Welcome', href: '#' },
    { label: 'Segmentations', href: '#', active: true },
    { label: 'Case studies', href: '#' },
    { label: 'Training', href: '#' },
    { label: 'News', href: '#' },
  ];

  return (
    <nav
      className="bg-white border-b border-[var(--primary-outlined-border)] relative"
      style={{
        height: '56px',
        boxShadow: '0px 1px 2px 0px rgba(21,21,21,0.08)'
      }}
    >
      <div className="max-w-[1360px] mx-auto">
        <div className="flex items-center h-[56px] px-10 py-2 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 h-9 absolute left-10">
            <Image
              src="/Assets/Icons/Logo-Black.svg"
              alt="Pathways"
              width={137}
              height={30}
              className="h-full w-auto"
            />
          </Link>

          {/* Nav Items - Centered */}
          <div className="flex items-center gap-6 mx-auto">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex items-center justify-center
                  px-3 py-3 min-h-[40px]
                  rounded-[var(--radius-sm)]
                  font-semibold text-base leading-4
                  transition-colors
                  ${
                    item.active
                      ? 'bg-[var(--primary-plain-hoverbg)] text-[var(--primary-plain-color)]'
                      : hoveredItem === item.label
                      ? 'bg-[var(--primary-plain-hoverbg)] text-[var(--primary-plain-color)]'
                      : 'text-[var(--primary-plain-color)]'
                  }
                `}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
