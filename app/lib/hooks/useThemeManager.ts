import { useState, useEffect, useCallback } from 'react';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  cssVariables: Record<string, string>;
}

const defaultThemes: Theme[] = [
  {
    id: 'dark-default',
    name: 'Sombre (Défaut)',
    colors: {
      primary: '#8B5CF6',
      secondary: '#A78BFA',
      accent: '#06B6D4',
      background: '#0F0F0F',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      textSecondary: '#9CA3AF',
      border: '#374151',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    cssVariables: {
      '--bolt-elements-background-depth-1': '#1A1A1A',
      '--bolt-elements-background-depth-2': '#262626',
      '--bolt-elements-background-depth-3': '#333333',
      '--bolt-elements-background-depth-4': '#404040',
      '--bolt-elements-textPrimary': '#FFFFFF',
      '--bolt-elements-textSecondary': '#9CA3AF',
      '--bolt-elements-borderColor': '#374151',
      '--bolt-elements-button-primary-background': '#8B5CF6',
      '--bolt-elements-button-primary-backgroundHover': '#7C3AED',
    },
  },
  {
    id: 'dark-blue',
    name: 'Bleu Nuit',
    colors: {
      primary: '#3B82F6',
      secondary: '#60A5FA',
      accent: '#06B6D4',
      background: '#0C1629',
      surface: '#1E293B',
      text: '#F1F5F9',
      textSecondary: '#94A3B8',
      border: '#334155',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    cssVariables: {
      '--bolt-elements-background-depth-1': '#1E293B',
      '--bolt-elements-background-depth-2': '#334155',
      '--bolt-elements-background-depth-3': '#475569',
      '--bolt-elements-background-depth-4': '#64748B',
      '--bolt-elements-textPrimary': '#F1F5F9',
      '--bolt-elements-textSecondary': '#94A3B8',
      '--bolt-elements-borderColor': '#334155',
      '--bolt-elements-button-primary-background': '#3B82F6',
      '--bolt-elements-button-primary-backgroundHover': '#2563EB',
    },
  },
  {
    id: 'dark-green',
    name: 'Vert Émeraude',
    colors: {
      primary: '#10B981',
      secondary: '#34D399',
      accent: '#06B6D4',
      background: '#0C1F1C',
      surface: '#1F2937',
      text: '#ECFDF5',
      textSecondary: '#9CA3AF',
      border: '#374151',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    cssVariables: {
      '--bolt-elements-background-depth-1': '#1F2937',
      '--bolt-elements-background-depth-2': '#374151',
      '--bolt-elements-background-depth-3': '#4B5563',
      '--bolt-elements-background-depth-4': '#6B7280',
      '--bolt-elements-textPrimary': '#ECFDF5',
      '--bolt-elements-textSecondary': '#9CA3AF',
      '--bolt-elements-borderColor': '#374151',
      '--bolt-elements-button-primary-background': '#10B981',
      '--bolt-elements-button-primary-backgroundHover': '#059669',
    },
  },
  {
    id: 'dark-purple',
    name: 'Violet Pro',
    colors: {
      primary: '#8B5CF6',
      secondary: '#A78BFA',
      accent: '#F59E0B',
      background: '#1C1629',
      surface: '#2D1B69',
      text: '#F3F4F6',
      textSecondary: '#D1D5DB',
      border: '#4C1D95',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    cssVariables: {
      '--bolt-elements-background-depth-1': '#2D1B69',
      '--bolt-elements-background-depth-2': '#4C1D95',
      '--bolt-elements-background-depth-3': '#6B21A8',
      '--bolt-elements-background-depth-4': '#7C2D12',
      '--bolt-elements-textPrimary': '#F3F4F6',
      '--bolt-elements-textSecondary': '#D1D5DB',
      '--bolt-elements-borderColor': '#4C1D95',
      '--bolt-elements-button-primary-background': '#8B5CF6',
      '--bolt-elements-button-primary-backgroundHover': '#7C3AED',
    },
  },
  {
    id: 'light-minimal',
    name: 'Clair Minimal',
    colors: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      accent: '#06B6D4',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#111827',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    cssVariables: {
      '--bolt-elements-background-depth-1': '#FFFFFF',
      '--bolt-elements-background-depth-2': '#F9FAFB',
      '--bolt-elements-background-depth-3': '#F3F4F6',
      '--bolt-elements-background-depth-4': '#E5E7EB',
      '--bolt-elements-textPrimary': '#111827',
      '--bolt-elements-textSecondary': '#6B7280',
      '--bolt-elements-borderColor': '#E5E7EB',
      '--bolt-elements-button-primary-background': '#6366F1',
      '--bolt-elements-button-primary-backgroundHover': '#4F46E5',
    },
  },
];

const STORAGE_KEY = 'bolt-theme-config';

export const useThemeManager = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultThemes[0]);
  const [customThemes, setCustomThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const config = JSON.parse(saved);
        if (config.currentThemeId) {
          const theme = [...defaultThemes, ...config.customThemes].find(
            t => t.id === config.currentThemeId
          );
          if (theme) {
            setCurrentTheme(theme);
          }
        }
        if (config.customThemes) {
          setCustomThemes(config.customThemes);
        }
      }
    } catch (error) {
      console.error('Error loading theme config:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!isLoading) {
      applyTheme(currentTheme);
      saveConfig();
    }
  }, [currentTheme, isLoading]);

  const applyTheme = useCallback((theme: Theme) => {
    const root = document.documentElement;
    
    // Apply CSS variables
    Object.entries(theme.cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Apply additional color variables
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-success', theme.colors.success);
    root.style.setProperty('--theme-warning', theme.colors.warning);
    root.style.setProperty('--theme-error', theme.colors.error);
  }, []);

  const saveConfig = useCallback(() => {
    try {
      const config = {
        currentThemeId: currentTheme.id,
        customThemes,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving theme config:', error);
    }
  }, [currentTheme.id, customThemes]);

  const setTheme = useCallback((themeId: string) => {
    const theme = [...defaultThemes, ...customThemes].find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  }, [customThemes]);

  const createCustomTheme = useCallback((theme: Omit<Theme, 'id'>) => {
    const newTheme: Theme = {
      ...theme,
      id: `custom-${Date.now()}`,
    };
    setCustomThemes(prev => [...prev, newTheme]);
    return newTheme;
  }, []);

  const updateCustomTheme = useCallback((id: string, updates: Partial<Theme>) => {
    setCustomThemes(prev => 
      prev.map(theme => 
        theme.id === id ? { ...theme, ...updates } : theme
      )
    );
    
    // If updating current theme, apply changes immediately
    if (currentTheme.id === id) {
      setCurrentTheme(prev => ({ ...prev, ...updates }));
    }
  }, [currentTheme.id]);

  const deleteCustomTheme = useCallback((id: string) => {
    setCustomThemes(prev => prev.filter(theme => theme.id !== id));
    
    // If deleting current theme, switch to default
    if (currentTheme.id === id) {
      setCurrentTheme(defaultThemes[0]);
    }
  }, [currentTheme.id]);

  const getAllThemes = useCallback(() => {
    return [...defaultThemes, ...customThemes];
  }, [customThemes]);

  const generateThemeFromColors = useCallback((primary: string, background: string) => {
    // Simple theme generation based on primary and background colors
    const isDark = background === '#000000' || background.startsWith('#1') || background.startsWith('#0');
    
    return {
      name: 'Thème Personnalisé',
      colors: {
        primary,
        secondary: primary,
        accent: '#06B6D4',
        background,
        surface: isDark ? '#1A1A1A' : '#F9FAFB',
        text: isDark ? '#FFFFFF' : '#111827',
        textSecondary: isDark ? '#9CA3AF' : '#6B7280',
        border: isDark ? '#374151' : '#E5E7EB',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      cssVariables: {
        '--bolt-elements-background-depth-1': isDark ? '#1A1A1A' : '#FFFFFF',
        '--bolt-elements-background-depth-2': isDark ? '#262626' : '#F9FAFB',
        '--bolt-elements-background-depth-3': isDark ? '#333333' : '#F3F4F6',
        '--bolt-elements-background-depth-4': isDark ? '#404040' : '#E5E7EB',
        '--bolt-elements-textPrimary': isDark ? '#FFFFFF' : '#111827',
        '--bolt-elements-textSecondary': isDark ? '#9CA3AF' : '#6B7280',
        '--bolt-elements-borderColor': isDark ? '#374151' : '#E5E7EB',
        '--bolt-elements-button-primary-background': primary,
        '--bolt-elements-button-primary-backgroundHover': primary,
      },
    };
  }, []);

  return {
    currentTheme,
    customThemes,
    defaultThemes,
    isLoading,
    setTheme,
    createCustomTheme,
    updateCustomTheme,
    deleteCustomTheme,
    getAllThemes,
    generateThemeFromColors,
    applyTheme,
  };
};