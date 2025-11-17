export interface SegmentMetadata {
  segmentId: string;
  segmentType: 'Rural' | 'Urban';
  vulLevel: '1' | '2' | '3' | '4';
  subLevel: '1' | '2' | 'None';
  displayName: string;
  vulnerabilityLabel: 'Least vulnerable' | 'Less vulnerable' | 'More vulnerable' | 'Most vulnerable';
  population: string;
  characteristics: string[];
  bgColor: string;
}

export const segmentMetadata: Record<string, SegmentMetadata> = {
  'Rural-4': {
    segmentId: 'Rural-4',
    segmentType: 'Rural',
    vulLevel: '4',
    subLevel: 'None',
    displayName: 'Rural 4 most vulnerable',
    vulnerabilityLabel: 'Most vulnerable',
    population: '9%',
    characteristics: ['Poorest', 'Rigid gender norms', 'Highest child care burden'],
    bgColor: '#f2a0ac'
  },
  'Rural-3.1': {
    segmentId: 'Rural-3.1',
    segmentType: 'Rural',
    vulLevel: '3',
    subLevel: '1',
    displayName: 'Rural 3.1 more vulnerable',
    vulnerabilityLabel: 'More vulnerable',
    population: '9%',
    characteristics: ['Limited education', 'Traditional family structures', 'High fertility rates'],
    bgColor: '#b5a4ea'
  },
  'Rural-3.2': {
    segmentId: 'Rural-3.2',
    segmentType: 'Rural',
    vulLevel: '3',
    subLevel: '2',
    displayName: 'Rural 3.2 more vulnerable',
    vulnerabilityLabel: 'More vulnerable',
    population: '9%',
    characteristics: ['Agricultural workers', 'Seasonal employment', 'Limited healthcare access'],
    bgColor: '#b5a4ea'
  },
  'Rural-2': {
    segmentId: 'Rural-2',
    segmentType: 'Rural',
    vulLevel: '2',
    subLevel: 'None',
    displayName: 'Rural 2 less vulnerable',
    vulnerabilityLabel: 'Less vulnerable',
    population: '9%',
    characteristics: ['Moderate income', 'Basic education', 'Access to local services'],
    bgColor: '#76b5e5'
  },
  'Urban-4': {
    segmentId: 'Urban-4',
    segmentType: 'Urban',
    vulLevel: '4',
    subLevel: 'None',
    displayName: 'Urban 4 most vulnerable',
    vulnerabilityLabel: 'Most vulnerable',
    population: '9%',
    characteristics: ['Urban poor', 'Informal settlements', 'Limited employment opportunities'],
    bgColor: '#f2a0ac'
  },
  'Urban-3': {
    segmentId: 'Urban-3',
    segmentType: 'Urban',
    vulLevel: '3',
    subLevel: 'None',
    displayName: 'Urban 3 more vulnerable',
    vulnerabilityLabel: 'More vulnerable',
    population: '9%',
    characteristics: ['Low income households', 'Overcrowded housing', 'Unstable employment'],
    bgColor: '#b5a4ea'
  },
  'Urban-2': {
    segmentId: 'Urban-2',
    segmentType: 'Urban',
    vulLevel: '2',
    subLevel: 'None',
    displayName: 'Urban 2 less vulnerable',
    vulnerabilityLabel: 'Less vulnerable',
    population: '12%',
    characteristics: ['Working class', 'Stable housing', 'Access to services'],
    bgColor: '#76b5e5'
  },
  'Urban-1': {
    segmentId: 'Urban-1',
    segmentType: 'Urban',
    vulLevel: '1',
    subLevel: 'None',
    displayName: 'Urban 1 least vulnerable',
    vulnerabilityLabel: 'Least vulnerable',
    population: '25%',
    characteristics: ['Higher education', 'Professional employment', 'Better health outcomes'],
    bgColor: '#71d6db'
  }
};

// Helper function to get metadata for a segment
export function getSegmentMetadata(segmentType: 'Rural' | 'Urban', vulLevel: string, subLevel?: string): SegmentMetadata | undefined {
  const key = subLevel && subLevel !== 'None'
    ? `${segmentType}-${vulLevel}.${subLevel}`
    : `${segmentType}-${vulLevel}`;
  return segmentMetadata[key];
}
