import { SegmentData } from '../app/components/StackedBarChart';

export interface DistrictData {
  name: string;
  segments: SegmentData;
  population: number;
}

// Generate realistic dummy data for Senegal districts
function generateSegmentData(): SegmentData {
  // Generate percentages that sum to 100
  const raw = {
    'Urban-1': Math.random() * 15 + 5,
    'Urban-2': Math.random() * 10 + 3,
    'Urban-3.1': Math.random() * 8 + 2,
    'Urban-3.2': Math.random() * 5 + 1,
    'Urban-4': Math.random() * 8 + 2,
    'Rural-1': Math.random() * 15 + 10,
    'Rural-2': Math.random() * 12 + 5,
    'Rural-2.1': Math.random() * 8 + 3,
    'Rural-3': Math.random() * 12 + 5,
    'Rural-4': Math.random() * 10 + 5,
  };

  // Normalize to sum to 100
  const total = Object.values(raw).reduce((a, b) => a + b, 0);
  const normalized: SegmentData = {} as SegmentData;
  for (const [key, value] of Object.entries(raw)) {
    normalized[key as keyof SegmentData] = (value / total) * 100;
  }

  return normalized;
}

// Senegal administrative regions (Level 1 divisions)
export const senegalDistricts: DistrictData[] = [
  { name: 'Dakar', segments: generateSegmentData(), population: 3732000 },
  { name: 'Thiès', segments: generateSegmentData(), population: 1967000 },
  { name: 'Diourbel', segments: generateSegmentData(), population: 1677000 },
  { name: 'Fatick', segments: generateSegmentData(), population: 810000 },
  { name: 'Kaolack', segments: generateSegmentData(), population: 1012000 },
  { name: 'Kolda', segments: generateSegmentData(), population: 744000 },
  { name: 'Louga', segments: generateSegmentData(), population: 960000 },
  { name: 'Matam', segments: generateSegmentData(), population: 627000 },
  { name: 'Saint-Louis', segments: generateSegmentData(), population: 1034000 },
  { name: 'Sédhiou', segments: generateSegmentData(), population: 532000 },
  { name: 'Tambacounda', segments: generateSegmentData(), population: 707000 },
  { name: 'Kaffrine', segments: generateSegmentData(), population: 594000 },
  { name: 'Kédougou', segments: generateSegmentData(), population: 185000 },
  { name: 'Ziguinchor', segments: generateSegmentData(), population: 617000 },
];

// Helper to get district by name
export function getDistrictByName(name: string): DistrictData | undefined {
  return senegalDistricts.find(d => d.name.toLowerCase() === name.toLowerCase());
}
