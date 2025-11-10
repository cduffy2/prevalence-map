'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import SecondaryNav from './components/SecondaryNav';
import PageTitle from './components/PageTitle';
import InteractiveMap from './components/InteractiveMap';
import EmptyState from './components/EmptyState';
import StackedBarChart from './components/StackedBarChart';
import PieChart from './components/PieChart';
import GeographicalSearchDropdown from './components/GeographicalSearchDropdown';
import SourceDataModal from './components/SourceDataModal';
import Footer from './components/Footer';
import { getDistrictByName, senegalDistricts, type DistrictData } from '../lib/districtData';

export default function Home() {
  const [selectedDistricts, setSelectedDistricts] = useState<DistrictData[]>([]);
  const [populationType, setPopulationType] = useState<'both' | 'urban' | 'rural'>('both');
  const [viewMode, setViewMode] = useState<'stacked' | 'pie'>('stacked');
  const [showNotification, setShowNotification] = useState(true);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);

  const handleDistrictSelect = (districtName: string) => {
    const district = getDistrictByName(districtName);
    if (!district) return;

    setSelectedDistricts(prev => {
      // Check if already selected
      const isSelected = prev.some(d => d.name === district.name);
      if (isSelected) {
        // Remove if already selected
        return prev.filter(d => d.name !== district.name);
      } else {
        // Add district (no limit)
        return [...prev, district];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedDistricts(senegalDistricts);
  };

  const handleClearAll = () => {
    setSelectedDistricts([]);
  };

  const handleDistrictRemove = (districtName: string) => {
    setSelectedDistricts(prev => prev.filter(d => d.name !== districtName));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Navbar />

      {/* Secondary Navigation */}
      <SecondaryNav />

      {/* Page Title Section */}
      <PageTitle viewMode={viewMode} onViewModeChange={setViewMode} />

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-[1360px] mx-auto px-10" style={{ paddingTop: '0px', paddingBottom: '40px' }}>
          <div className="flex items-stretch">
            {/* Left Container - Map */}
            <div className="w-[550px] bg-white border border-[var(--primary-outlined-border)] rounded-l-lg flex flex-col" style={{ minHeight: '584px' }}>
              {/* Search Dropdown */}
              <div className="border-b border-[var(--primary-outlined-border)] p-1">
                <GeographicalSearchDropdown
                  districts={senegalDistricts.map(d => d.name)}
                  selectedDistricts={selectedDistricts.map(d => d.name)}
                  onDistrictToggle={handleDistrictSelect}
                />
              </div>

              {/* Map */}
              <div className="flex-1 p-6">
                <InteractiveMap
                  onDistrictSelect={handleDistrictSelect}
                  selectedDistricts={selectedDistricts.map(d => d.name)}
                  onSelectAll={handleSelectAll}
                  onClearAll={handleClearAll}
                  totalDistrictsCount={senegalDistricts.length}
                />
              </div>
            </div>

            {/* Right Container - Charts or Empty State */}
            <div className="flex-1 bg-white border-t border-r border-b border-[var(--primary-outlined-border)] rounded-r-lg" style={{ minHeight: '584px' }}>
              {selectedDistricts.length === 0 ? (
                <EmptyState />
              ) : viewMode === 'stacked' ? (
                <StackedBarChart
                  districts={selectedDistricts}
                  populationType={populationType}
                  onPopulationTypeChange={setPopulationType}
                  onDistrictRemove={handleDistrictRemove}
                  showNotification={showNotification}
                  onCloseNotification={() => setShowNotification(false)}
                  onViewSourceData={() => setIsSourceModalOpen(true)}
                />
              ) : (
                <PieChart
                  districts={selectedDistricts}
                  populationType={populationType}
                  onPopulationTypeChange={setPopulationType}
                  onDistrictRemove={handleDistrictRemove}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Source Data Modal */}
      <SourceDataModal isOpen={isSourceModalOpen} onClose={() => setIsSourceModalOpen(false)} />
    </div>
  );
}
