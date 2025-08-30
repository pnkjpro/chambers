// Legal/Government inspired color theme
export const legalTheme = {
  // Primary colors - inspired by legal profession
  primary: {
    50: '#f0f4f8',   // Very light blue-grey
    100: '#d9e2ec',  // Light blue-grey
    200: '#bcccdc',  // Medium light blue-grey
    300: '#9fb3c8',  // Medium blue-grey
    400: '#829ab1',  // Medium dark blue-grey
    500: '#627d98',  // Base blue-grey (main)
    600: '#486581',  // Dark blue-grey
    700: '#334e68',  // Very dark blue-grey
    800: '#243b53',  // Deep blue-grey
    900: '#102a43',  // Darkest blue-grey
  },
  
  // Secondary colors - inspired by legal documents/gold scales
  secondary: {
    50: '#fffdf0',   // Very light gold
    100: '#fef7c3',  // Light gold
    200: '#feee95',  // Medium light gold
    300: '#fde047',  // Medium gold
    400: '#facc15',  // Bright gold
    500: '#eab308',  // Base gold (main)
    600: '#ca8a04',  // Dark gold
    700: '#a16207',  // Very dark gold
    800: '#854d0e',  // Deep gold
    900: '#713f12',  // Darkest gold
  },
  
  // Accent colors - inspired by government/official themes
  accent: {
    justice: '#1e40af',    // Deep blue (justice)
    authority: '#7c2d12',  // Deep brown (authority)
    trust: '#065f46',      // Deep green (trust)
    wisdom: '#581c87',     // Deep purple (wisdom)
  },
  
  // Status colors
  success: '#059669',   // Green
  warning: '#d97706',   // Orange
  error: '#dc2626',     // Red
  info: '#2563eb',      // Blue
  
  // Neutral colors
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Professional gradients
  gradients: {
    primary: 'linear-gradient(135deg, #627d98 0%, #486581 100%)',
    secondary: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
    hero: 'linear-gradient(135deg, #102a43 0%, #334e68 50%, #486581 100%)',
    card: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
  }
};

// CSS custom properties for easy theming
export const themeCSS = `
  :root {
    --color-primary-50: ${legalTheme.primary[50]};
    --color-primary-100: ${legalTheme.primary[100]};
    --color-primary-200: ${legalTheme.primary[200]};
    --color-primary-300: ${legalTheme.primary[300]};
    --color-primary-400: ${legalTheme.primary[400]};
    --color-primary-500: ${legalTheme.primary[500]};
    --color-primary-600: ${legalTheme.primary[600]};
    --color-primary-700: ${legalTheme.primary[700]};
    --color-primary-800: ${legalTheme.primary[800]};
    --color-primary-900: ${legalTheme.primary[900]};
    
    --color-secondary-50: ${legalTheme.secondary[50]};
    --color-secondary-100: ${legalTheme.secondary[100]};
    --color-secondary-200: ${legalTheme.secondary[200]};
    --color-secondary-300: ${legalTheme.secondary[300]};
    --color-secondary-400: ${legalTheme.secondary[400]};
    --color-secondary-500: ${legalTheme.secondary[500]};
    --color-secondary-600: ${legalTheme.secondary[600]};
    --color-secondary-700: ${legalTheme.secondary[700]};
    --color-secondary-800: ${legalTheme.secondary[800]};
    --color-secondary-900: ${legalTheme.secondary[900]};
    
    --color-justice: ${legalTheme.accent.justice};
    --color-authority: ${legalTheme.accent.authority};
    --color-trust: ${legalTheme.accent.trust};
    --color-wisdom: ${legalTheme.accent.wisdom};
    
    --gradient-primary: ${legalTheme.gradients.primary};
    --gradient-secondary: ${legalTheme.gradients.secondary};
    --gradient-hero: ${legalTheme.gradients.hero};
    --gradient-card: ${legalTheme.gradients.card};
  }
`;

export default legalTheme;
