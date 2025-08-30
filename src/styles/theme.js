// Sophisticated Legal/Professional color theme
export const legalTheme = {
  // Primary colors - sophisticated navy inspired by prestigious law firms
  primary: {
    50: '#f8fafc',   // Pure white with hint of blue
    100: '#f1f5f9',  // Very light slate
    200: '#e2e8f0',  // Light slate
    300: '#cbd5e1',  // Medium light slate
    400: '#94a3b8',  // Medium slate
    500: '#64748b',  // Base slate
    600: '#475569',  // Dark slate
    700: '#334155',  // Very dark slate
    800: '#1e293b',  // Deep slate
    900: '#0f172a',  // Darkest slate
  },
  
  // Elite navy - inspired by top-tier law firms
  navy: {
    50: '#f0f4ff',   // Very light navy
    100: '#e0e7ff',  // Light navy
    200: '#c7d2fe',  // Medium light navy
    300: '#a5b4fc',  // Medium navy
    400: '#818cf8',  // Bright navy
    500: '#6366f1',  // Base navy
    600: '#4f46e5',  // Dark navy
    700: '#4338ca',  // Very dark navy
    800: '#3730a3',  // Deep navy
    900: '#1e1b4b',  // Darkest navy
  },
  
  // Luxury gold - inspired by legal excellence
  gold: {
    50: '#fffef7',   // Cream white
    100: '#fefcbf',  // Very light gold
    200: '#fef08a',  // Light gold
    300: '#fde047',  // Medium gold
    400: '#facc15',  // Bright gold
    500: '#eab308',  // Base gold
    600: '#ca8a04',  // Dark gold
    700: '#a16207',  // Very dark gold
    800: '#854d0e',  // Deep gold
    900: '#713f12',  // Darkest gold
  },
  
  // Professional accent colors
  accent: {
    prestige: '#1e1b4b',   // Deep navy (prestige)
    excellence: '#7c2d12', // Deep burgundy (excellence)
    integrity: '#064e3b',  // Deep emerald (integrity)
    wisdom: '#581c87',     // Deep purple (wisdom)
    luxury: '#92400e',     // Deep amber (luxury)
  },
  
  // Status colors - refined for professional use
  success: '#10b981',   // Emerald
  warning: '#f59e0b',   // Amber
  error: '#ef4444',     // Red
  info: '#3b82f6',      // Blue
  
  // Sophisticated neutral palette
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Premium gradients for modern appeal
  gradients: {
    primary: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4f46e5 100%)',
    secondary: 'linear-gradient(135deg, #eab308 0%, #f59e0b 50%, #d97706 100%)',
    hero: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
    card: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
    glass: 'linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
    elegant: 'linear-gradient(135deg, #fafafa 0%, #f1f5f9 50%, #e2e8f0 100%)',
  },
  
  // Shadow system for depth
  shadows: {
    soft: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    elegant: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
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
