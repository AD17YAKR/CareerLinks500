export const theme = {
  colors: {
    primary: '#16a34a',
    primaryHover: '#15803d',
    textPrimary: '#000000',
    textSecondary: '#666666',
    textMuted: '#999999',
    border: '#e6e6e6',
    bgPrimary: '#ffffff',
    bgSecondary: '#f7f7f7',
    bgHover: '#f0f0f0',
  },
  shadows: {
    default: '0 1px 3px rgba(0, 0, 0, 0.1)',
    hover: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  radius: '4px',
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
}