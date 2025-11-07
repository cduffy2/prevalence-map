/**
 * Brand Color Tokens and Theme Definitions
 *
 * This file contains:
 * 1. Vanilla MUI Brand Color Tokens (standard MUI Joy color palette)
 * 2. Pathways 2025 Brand Color Tokens (custom brand colors with PW prefix)
 * 3. Vulnerability Color Scales (Most, More, Less vulnerable)
 * 4. Data Visualization Colors (Categorical, Segments, Strata)
 * 5. Light MUI Theme Definition
 * 6. Pathways 2025 Theme Definition
 */

// ============================================================================
// VANILLA MUI BRAND COLOR TOKENS
// ============================================================================

export const vanillaMuiBrandColors = {
  // Primary (Blue) - Standard MUI Joy palette
  primary: {
    50: '#EDF5FD',
    100: '#E3EFFB',
    200: '#C7DFF7',
    300: '#97C3F0',
    400: '#4393E4',
    500: '#0B6BCB',
    600: '#185EA5',
    700: '#12467B',
    800: '#0A2744',
    900: '#051423',
  },

  // Secondary (Yellow/Gold) - Standard MUI Joy palette
  secondary: {
    100: '#FFEDBB',
    500: '#FFD95D',
  },

  // Neutral (Gray) - Standard MUI Joy palette
  neutral: {
    50: '#FBFCFE',
    100: '#F0F4F8',
    200: '#DDE7EE',
    300: '#CDD7E1',
    400: '#9FA6AD',
    500: '#636B74',
    600: '#555E68',
    700: '#32383E',
    800: '#171A1C',
    900: '#0B0D0E',
  },

  // Danger (Red) - Standard MUI Joy palette
  danger: {
    50: '#FAE6E6',
    100: '#FAD4D4',
    200: '#FABBBB',
    300: '#FAA0A0',
    400: '#FA6464',
    500: '#D41111',
    600: '#AD0E0E',
    700: '#800A0A',
    800: '#4D0606',
    900: '#1F0202',
  },

  // Success (Green) - Standard MUI Joy palette
  success: {
    50: '#F6FEF6',
    100: '#E3FBE3',
    200: '#C7F7C7',
    300: '#A1E8A1',
    400: '#51BC51',
    500: '#1F7A1F',
    600: '#136C13',
    700: '#0A470A',
    800: '#042F04',
    900: '#021D02',
  },

  // Warning (Orange/Yellow) - Standard MUI Joy palette
  warning: {
    50: '#FEFAF6',
    100: '#FDF0E1',
    200: '#FCE1C2',
    300: '#F3C896',
    400: '#EA9A3E',
    500: '#9A5B13',
    600: '#72430D',
    700: '#492B08',
    800: '#2E1B05',
    900: '#1D1002',
  },
} as const;

// ============================================================================
// PATHWAYS 2025 BRAND COLOR TOKENS
// ============================================================================

export const pathways2025BrandColors = {
  // Primary (Blue) - Pathways custom palette
  primary: {
    50: '#E5F0F8',
    100: '#D9F0FF',
    200: '#C2E6FF',
    300: '#9CD7FF',
    400: '#4EB9F2',
    500: '#04A1E6',
    600: '#026ACC',
    700: '#0038AE',
    800: '#001E5E',
    900: '#000C24',
  },

  // Secondary (Yellow/Gold) - Pathways custom palette
  secondary: {
    100: '#FFEDBB',
    500: '#FFD95D',
  },

  // Neutral (Gray) - Pathways custom palette
  neutral: {
    50: '#FFFFFC',
    100: '#FCFCF6',
    200: '#E5E5DC',
    300: '#DCDACD',
    400: '#BBBAA6',
    500: '#999888',
    600: '#4A4743',  // Tertiary text
    700: '#383633',  // Secondary text
    800: '#1F1E1C',  // Primary text
    900: '#0D0C0C',
  },

  // Danger (Red) - Pathways custom palette
  danger: {
    50: '#FACDCD',
    100: '#FFE4DC',
    200: '#FA7A7A',
    300: '#EB5959',
    400: '#E33232',
    500: '#D41111',
    600: '#AD0E0E',
    700: '#800A0A',
    800: '#4D0606',
    900: '#1F0202',
  },

  // Success (Green) - Pathways custom palette
  success: {
    50: '#E8F7DF',
    100: '#D6F5C4',
    200: '#C2F0A8',
    300: '#A5EB7F',
    400: '#87EB50',
    500: '#59E00A',
    600: '#45AD08',
    700: '#2D7A00',
    800: '#1A4700',
    900: '#112E00',
  },

  // Warning (Orange/Yellow) - Pathways custom palette
  warning: {
    50: '#FFE9C4',
    100: '#FFDEA6',
    200: '#FFD58C',
    300: '#FFCB73',
    400: '#FFBE4D',
    500: '#FFAB1A',
    600: '#CC8100',
    700: '#996100',
    800: '#664100',
    900: '#332000',
  },
} as const;

// ============================================================================
// VULNERABILITY COLOR SCALES (Pathways 2025)
// ============================================================================

export const vulnerabilityColors = {
  // Most Vulnerable (Pink/Red) - Highest vulnerability level
  most: {
    50: '#F6E8E9',
    100: '#FFD6D8',
    200: '#FFC2C5',
    300: '#FF9FA4',      // Light variant
    400: '#FF858B',      // Alt variant
    500: '#FE4656',      // Main color
    600: '#C92440',
    700: '#A01D42',
    800: '#690133',      // Dark variant
    900: '#3A011C',
  },

  // More Vulnerable (Purple) - Mid-high vulnerability level
  more: {
    50: '#F1E6F4',
    100: '#F7DBFF',
    200: '#F0C4FF',
    300: '#EBAEFF',      // Light variant
    400: '#E594FF',      // Alt variant
    500: '#C254FA',      // Main color
    600: '#9130C9',
    700: '#7E28B8',
    800: '#6F22A8',      // Dark variant
    900: '#290445',
  },

  // Less Vulnerable (Blue) - Lower vulnerability level
  less: {
    50: '#E5F0F8',
    100: '#D9F0FF',
    200: '#C2E6FF',
    300: '#9CD7FF',      // Light variant
    400: '#4EB9F2',      // Alt variant
    500: '#04A1E6',      // Main color
    600: '#026ACC',
    700: '#0038AE',
    800: '#001E5E',      // Dark variant
    900: '#000C24',
  },
} as const;

// ============================================================================
// DATA VISUALIZATION COLORS (Pathways 2025)
// ============================================================================

export const dataVisualizationColors = {
  // Categorical data colors (10-color palette for charts)
  categorical: [
    {
      id: 1,
      main: '#88C1FD',
      darkened: '#5E97D3',
      name: 'Blue',
    },
    {
      id: 2,
      main: '#AF73C8',
      darkened: '#71438A',
      name: 'Purple',
    },
    {
      id: 3,
      main: '#66C2A5',
      darkened: '#4A9A83',
      name: 'Teal',
    },
    {
      id: 4,
      main: '#FB8686',
      darkened: '#C45A5A',
      name: 'Red',
    },
    {
      id: 5,
      main: '#FFD92F',
      darkened: '#D1B125',
      name: 'Yellow',
    },
    {
      id: 6,
      main: '#8DA0CB',
      darkened: '#677BA1',
      name: 'Blue-Gray',
    },
    {
      id: 7,
      main: '#E8A651',
      darkened: '#AA7632',
      name: 'Orange',
    },
    {
      id: 8,
      main: '#E78AC3',
      darkened: '#B9699C',
      name: 'Pink',
    },
    {
      id: 9,
      main: '#A6D854',
      darkened: '#739E2C',
      name: 'Green',
    },
    {
      id: 10,
      main: '#B3B3B3',
      darkened: '#8C8C8C',
      name: 'Gray',
    },
  ],

  // Strata colors (geographical stratification)
  strata: {
    rural: '#E8A651',  // Orange for rural areas
  },

  // Segment colors (population segments)
  segment: {
    urban: '#B3B3B3',  // Gray for urban areas
  },
} as const;

// ============================================================================
// LIGHT MUI THEME (Vanilla MUI)
// ============================================================================

export const lightMuiTheme = {
  palette: {
    mode: 'light' as const,

    // Primary colors
    primary: {
      ...vanillaMuiBrandColors.primary,
      main: vanillaMuiBrandColors.primary[500],
      light: vanillaMuiBrandColors.primary[300],
      dark: vanillaMuiBrandColors.primary[700],
      contrastText: '#fff',
    },

    // Secondary colors
    secondary: {
      ...vanillaMuiBrandColors.secondary,
      main: vanillaMuiBrandColors.secondary[500],
      light: vanillaMuiBrandColors.secondary[100],
      contrastText: '#000',
    },

    // Neutral/Gray colors
    neutral: {
      ...vanillaMuiBrandColors.neutral,
      main: vanillaMuiBrandColors.neutral[500],
      light: vanillaMuiBrandColors.neutral[100],
      dark: vanillaMuiBrandColors.neutral[800],
    },

    // Semantic colors
    error: {
      ...vanillaMuiBrandColors.danger,
      main: vanillaMuiBrandColors.danger[500],
      light: vanillaMuiBrandColors.danger[300],
      dark: vanillaMuiBrandColors.danger[700],
      contrastText: '#fff',
    },

    success: {
      ...vanillaMuiBrandColors.success,
      main: vanillaMuiBrandColors.success[500],
      light: vanillaMuiBrandColors.success[300],
      dark: vanillaMuiBrandColors.success[700],
      contrastText: '#fff',
    },

    warning: {
      ...vanillaMuiBrandColors.warning,
      main: vanillaMuiBrandColors.warning[500],
      light: vanillaMuiBrandColors.warning[300],
      dark: vanillaMuiBrandColors.warning[700],
      contrastText: '#fff',
    },

    // Background colors
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
      surface: vanillaMuiBrandColors.neutral[50],
      level1: vanillaMuiBrandColors.neutral[100],
    },

    // Text colors
    text: {
      primary: vanillaMuiBrandColors.neutral[800],    // Primary text
      secondary: vanillaMuiBrandColors.neutral[700],  // Secondary text
      tertiary: vanillaMuiBrandColors.neutral[600],   // Tertiary text
      disabled: vanillaMuiBrandColors.neutral[400],
      icon: vanillaMuiBrandColors.neutral[500],
      link: '#026ACC',
      linkHover: '#0038AE',
    },

    // Divider
    divider: 'rgba(99, 107, 116, 0.16)',

    // Common
    common: {
      black: '#000000',
      white: '#FFFFFF',
      pageBackground: '#FCFCF6',
    },
  },
} as const;

// ============================================================================
// PATHWAYS 2025 THEME
// ============================================================================

export const pathways2025Theme = {
  palette: {
    mode: 'light' as const,

    // Primary colors (Pathways brand blue)
    primary: {
      ...pathways2025BrandColors.primary,
      main: pathways2025BrandColors.primary[500],
      light: pathways2025BrandColors.primary[300],
      dark: pathways2025BrandColors.primary[700],
      contrastText: '#fff',
    },

    // Secondary colors
    secondary: {
      ...pathways2025BrandColors.secondary,
      main: pathways2025BrandColors.secondary[500],
      light: pathways2025BrandColors.secondary[100],
      contrastText: '#000',
    },

    // Neutral/Gray colors (Pathways custom neutrals)
    neutral: {
      ...pathways2025BrandColors.neutral,
      main: pathways2025BrandColors.neutral[500],
      light: pathways2025BrandColors.neutral[100],
      dark: pathways2025BrandColors.neutral[800],
    },

    // Semantic colors (Pathways custom)
    error: {
      ...pathways2025BrandColors.danger,
      main: pathways2025BrandColors.danger[500],
      light: pathways2025BrandColors.danger[300],
      dark: pathways2025BrandColors.danger[700],
      contrastText: '#fff',
    },

    success: {
      ...pathways2025BrandColors.success,
      main: pathways2025BrandColors.success[500],
      light: pathways2025BrandColors.success[300],
      dark: pathways2025BrandColors.success[700],
      contrastText: '#fff',
    },

    warning: {
      ...pathways2025BrandColors.warning,
      main: pathways2025BrandColors.warning[500],
      light: pathways2025BrandColors.warning[300],
      dark: pathways2025BrandColors.warning[700],
      contrastText: '#000',
    },

    // Vulnerability colors (custom to Pathways)
    vulnerability: {
      most: {
        ...vulnerabilityColors.most,
        main: vulnerabilityColors.most[500],
        light: vulnerabilityColors.most[300],
        dark: vulnerabilityColors.most[800],
        contrastText: '#fff',
      },
      more: {
        ...vulnerabilityColors.more,
        main: vulnerabilityColors.more[500],
        light: vulnerabilityColors.more[300],
        dark: vulnerabilityColors.more[800],
        contrastText: '#fff',
      },
      less: {
        ...vulnerabilityColors.less,
        main: vulnerabilityColors.less[500],
        light: vulnerabilityColors.less[300],
        dark: vulnerabilityColors.less[800],
        contrastText: '#fff',
      },
    },

    // Data visualization colors
    data: {
      categorical: dataVisualizationColors.categorical,
      strata: dataVisualizationColors.strata,
      segment: dataVisualizationColors.segment,
    },

    // Background colors
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
      surface: pathways2025BrandColors.neutral[50],
      level1: pathways2025BrandColors.neutral[100],
      pageBackground: pathways2025BrandColors.neutral[100],
    },

    // Text colors (Pathways specific assignments)
    text: {
      primary: pathways2025BrandColors.neutral[800],    // Primary text - #1F1E1C
      secondary: pathways2025BrandColors.neutral[700],  // Secondary text - #383633
      tertiary: pathways2025BrandColors.neutral[600],   // Tertiary text - #4A4743
      disabled: pathways2025BrandColors.neutral[400],
      icon: '#666666',
      link: '#026ACC',
      linkHover: '#0038AE',
    },

    // Divider
    divider: 'rgba(99, 107, 116, 0.16)',

    // Common
    common: {
      black: '#000000',
      white: '#FFFFFF',
      pageBackground: pathways2025BrandColors.neutral[100],
    },
  },
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type VanillaMuiBrandColors = typeof vanillaMuiBrandColors;
export type Pathways2025BrandColors = typeof pathways2025BrandColors;
export type VulnerabilityColors = typeof vulnerabilityColors;
export type DataVisualizationColors = typeof dataVisualizationColors;
export type LightMuiTheme = typeof lightMuiTheme;
export type Pathways2025Theme = typeof pathways2025Theme;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get a color value from the Vanilla MUI palette
 */
export function getVanillaMuiColor(
  color: keyof typeof vanillaMuiBrandColors,
  shade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
): string {
  const colorPalette = vanillaMuiBrandColors[color];
  return (colorPalette as any)[shade] as string;
}

/**
 * Get a color value from the Pathways 2025 palette
 */
export function getPathways2025Color(
  color: keyof typeof pathways2025BrandColors,
  shade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
): string {
  const colorPalette = pathways2025BrandColors[color];
  return (colorPalette as any)[shade] as string;
}

/**
 * Get a vulnerability color
 */
export function getVulnerabilityColor(
  level: keyof typeof vulnerabilityColors,
  shade: keyof typeof vulnerabilityColors.most
): string {
  return vulnerabilityColors[level][shade];
}

/**
 * Get a categorical data color by index (1-10)
 */
export function getCategoricalColor(index: number, darkened = false): string {
  const colorData = dataVisualizationColors.categorical.find((c) => c.id === index);
  if (!colorData) {
    throw new Error(`Invalid categorical color index: ${index}. Must be 1-10.`);
  }
  return darkened ? colorData.darkened : colorData.main;
}

/**
 * Get all categorical colors as an array
 */
export function getAllCategoricalColors(darkened = false): string[] {
  return dataVisualizationColors.categorical.map((c) =>
    darkened ? c.darkened : c.main
  );
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert hex color to RGBA with alpha
 */
export function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : hex;
}

/**
 * Generate a color scale for maps/visualizations
 * @param level - Vulnerability level
 * @param steps - Number of steps in the scale
 */
export function generateVulnerabilityScale(
  level: keyof typeof vulnerabilityColors,
  steps = 5
): string[] {
  const colors = vulnerabilityColors[level];
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
  const stepSize = Math.floor(shades.length / steps);
  const scale: string[] = [];

  for (let i = 0; i < steps; i++) {
    const shadeIndex = Math.min(i * stepSize, shades.length - 1);
    const shade = shades[shadeIndex];
    scale.push(colors[shade]);
  }

  return scale;
}
