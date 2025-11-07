'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'fr'>('en');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const segmentations = [
    { label: 'Kenya', href: '#' },
    { label: 'Ethiopia', href: '#' },
    { label: 'Bihar, India', href: '#' },
    { label: 'Senegal', href: '#' },
    { label: 'Northern Nigeria', href: '#' },
  ];

  const quickLinks = [
    { label: 'Contact us', href: '#', internal: true },
    { label: 'Knowledge base', href: '#', external: true },
    { label: 'Feedback survey', href: '#', external: true },
  ];

  const caseStudies = [
    { label: 'Lagos, Nigeria', href: '#' },
    { label: 'Kano State, Nigeria', href: '#' },
  ];

  const socialLinks = [
    { label: 'LinkedIn', href: '#', icon: '/Assets/Icons/Logo-White.svg' },
    { label: 'Youtube', href: '#', icon: '/Assets/Icons/Logo-White.svg' },
    { label: 'Bluesky', href: '#', icon: '/Assets/Icons/Logo-White.svg' },
  ];

  const policies = [
    { label: 'Privacy policy', href: '#' },
    { label: 'Cookie policy', href: '#' },
    { label: 'Terms of use', href: '#' },
  ];

  return (
    <footer className="bg-[var(--primary-solid-activebg)] text-white">
      <div className="max-w-[1360px] mx-auto px-10 py-10">
        {/* Top Section */}
        <div className="flex flex-col gap-10 mb-10">
          {/* Logo and Language Selector */}
          <div className="flex items-start justify-between relative">
            <Link href="/" className="flex items-center">
              <Image
                src="/Assets/Icons/Logo-White.svg"
                alt="Pathways"
                width={183}
                height={40}
              />
            </Link>

            {/* Centered "Led by" text */}
            <div className="absolute left-1/2 top-2 -translate-x-1/2 flex items-baseline gap-1.5 text-base">
              <span className="text-[var(--text-tertiary-inverse)] font-normal">
                Pathways is led by
              </span>
              <Link
                href="#"
                className="text-[var(--text-tertiary-inverse)] text-sm underline-offset-4 hover:underline inline-flex items-center gap-1"
              >
                Sonder Collective
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12 4L4 12M12 4H6M12 4V10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <span className="text-[var(--text-tertiary-inverse)] font-normal">
                and funded by the
              </span>
              <Link
                href="#"
                className="text-[var(--text-tertiary-inverse)] text-sm underline-offset-4 hover:underline inline-flex items-center gap-1"
              >
                Gates Foundation
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12 4L4 12M12 4H6M12 4V10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <span className="text-[var(--text-tertiary-inverse)] font-normal">.</span>
            </div>

            {/* Language Selector */}
            <div className="flex border border-[var(--primary-outlined-border)] rounded-[var(--radius-sm)] overflow-hidden">
              <button
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedLanguage === 'en'
                    ? 'bg-[var(--primary-200)] text-[var(--text-link-hover)]'
                    : 'text-[var(--text-tertiary-inverse)]'
                }`}
                onClick={() => setSelectedLanguage('en')}
              >
                English
              </button>
              <div className="w-px bg-[var(--primary-outlined-border)]" />
              <button
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedLanguage === 'fr'
                    ? 'bg-[var(--primary-200)] text-[var(--text-link-hover)]'
                    : 'text-[var(--text-tertiary-inverse)]'
                }`}
                onClick={() => setSelectedLanguage('fr')}
              >
                Français
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--divider)]" />

          {/* Links Section */}
          <div className="flex justify-between">
            {/* Segmentations */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary-inverse)]">
                Segmentations
              </h3>
              {segmentations.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-base text-[var(--text-secondary-inverse)] hover:underline underline-offset-4 ${
                    hoveredLink === link.label ? 'underline' : ''
                  }`}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary-inverse)]">
                Quick links
              </h3>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-base text-[var(--text-secondary-inverse)] hover:underline underline-offset-4 inline-flex items-center gap-1 ${
                    hoveredLink === link.label ? 'underline' : ''
                  }`}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  {link.external && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M12 4L4 12M12 4H6M12 4V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>
              ))}
            </div>

            {/* Case Studies */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary-inverse)]">
                Case studies
              </h3>
              {caseStudies.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-base text-[var(--text-secondary-inverse)] hover:underline underline-offset-4 ${
                    hoveredLink === link.label ? 'underline' : ''
                  }`}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Follow Us */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary-inverse)]">
                Follow us
              </h3>
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`flex items-center gap-2 text-base text-[var(--text-secondary-inverse)] hover:underline underline-offset-4 ${
                      hoveredLink === link.label ? 'underline' : ''
                    }`}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <div className="w-6 h-6">
                      {/* Social icon placeholder - would use actual icons */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="var(--text-secondary-inverse)" />
                      </svg>
                    </div>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-10 items-center">
          {/* Divider */}
          <div className="h-px bg-[var(--divider)] w-full" />

          {/* Copyright and Policies */}
          <div className="flex items-center justify-between w-full">
            <p className="text-base text-[var(--text-secondary-inverse)]">
              © 2025 withpathways.org · CC BY 4.0
            </p>
            <div className="flex items-center gap-4">
              {policies.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-base text-[var(--text-secondary-inverse)] hover:underline underline-offset-4 ${
                    hoveredLink === link.label ? 'underline' : ''
                  }`}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
