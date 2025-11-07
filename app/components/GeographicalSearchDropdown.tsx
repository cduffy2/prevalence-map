'use client';

import { useState, useRef, useEffect } from 'react';

interface GeographicalSearchDropdownProps {
  districts: string[];
  selectedDistricts: string[];
  onDistrictToggle: (districtName: string) => void;
}

export default function GeographicalSearchDropdown({
  districts,
  selectedDistricts,
  onDistrictToggle
}: GeographicalSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter districts based on search query
  const filteredDistricts = districts.filter(district =>
    district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function to highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return <span>{text}</span>;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="font-bold">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Search Input Field */}
      <div className="bg-[#fbfcfe] rounded-md px-3 py-2 flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="6" stroke="var(--primary-plain-color)" strokeWidth="2"/>
          <path d="M20 20L17 17" stroke="var(--primary-plain-color)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder="Search geographic areas"
          className="flex-1 text-base text-[var(--primary-plain-color)] outline-none bg-transparent placeholder:opacity-60"
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M7 10l5 5 5-5" stroke="var(--primary-plain-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--primary-outlined-border)] rounded-[var(--radius-sm)] shadow-lg z-50 max-h-[400px] overflow-hidden flex flex-col">
          {/* District list */}
          <div className="overflow-y-auto flex-1">
            {filteredDistricts.length > 0 ? (
              filteredDistricts.map((district) => {
                const isSelected = selectedDistricts.includes(district);
                return (
                  <label
                    key={district}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onDistrictToggle(district)}
                      className="w-4 h-4 rounded border-[var(--primary-outlined-border)] text-[var(--primary-plain-color)] focus:ring-[var(--primary-plain-color)] cursor-pointer"
                    />
                    <span className="text-sm text-[var(--text-primary)] select-none">
                      {highlightMatch(district, searchQuery)}
                    </span>
                  </label>
                );
              })
            ) : (
              <div className="px-3 py-8 text-center text-sm text-[var(--text-tertiary)]">
                No districts found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
