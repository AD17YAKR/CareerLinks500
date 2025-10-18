export const theme = {
  colors: {
    primary: '#16a34a',
    primaryHover: '#15803d',
    primaryLight: 'rgba(22, 163, 74, 0.1)',
    textPrimary: '#1a1a1a',
    textSecondary: '#666666',
    textMuted: '#999999',
    border: '#e5e5e5',
    borderLight: '#f0f0f0',
    bgPrimary: '#ffffff',
    bgSecondary: '#fafafa',
    bgHover: '#f5f5f5',
    success: '#16a34a',
    warning: '#f59e0b',
    error: '#dc2626',
  },
  shadows: {
    default: '0 1px 3px rgba(0, 0, 0, 0.08)',
    hover: '0 4px 16px rgba(0, 0, 0, 0.12)',
    focus: '0 0 0 3px rgba(22, 163, 74, 0.15)',
  },
  radius: '6px',
  radiusLarge: '8px',
}

// Apply theme to CSS variables
export const applyTheme = () => {
  const root = document.documentElement
  
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    root.style.setProperty(`--${cssVar}`, value)
  })
  
  Object.entries(theme.shadows).forEach(([key, value]) => {
    const cssVar = key === 'default' ? 'shadow' : `shadow-${key}`
    root.style.setProperty(`--${cssVar}`, value)
  })
  
  root.style.setProperty('--radius', theme.radius)
  root.style.setProperty('--radius-large', theme.radiusLarge)
}