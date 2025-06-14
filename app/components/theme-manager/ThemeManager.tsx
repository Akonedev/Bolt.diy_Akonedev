import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { classNames } from '~/utils/classNames';
import { useThemeManager, type Theme } from '~/lib/hooks/useThemeManager';
import { toast } from 'react-toastify';

export const ThemeManager: React.FC = () => {
  const {
    currentTheme,
    getAllThemes,
    setTheme,
    createCustomTheme,
    deleteCustomTheme,
    generateThemeFromColors,
  } = useThemeManager();

  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customColors, setCustomColors] = useState({
    primary: '#8B5CF6',
    background: '#0F0F0F',
  });

  const allThemes = getAllThemes();

  const handleCreateCustomTheme = () => {
    const themeData = generateThemeFromColors(customColors.primary, customColors.background);
    const newTheme = createCustomTheme(themeData);
    setTheme(newTheme.id);
    setShowCustomForm(false);
    toast.success('Thème personnalisé créé');
  };

  const handleDeleteTheme = (themeId: string, themeName: string) => {
    if (confirm(`Supprimer le thème "${themeName}" ?`)) {
      deleteCustomTheme(themeId);
      toast.success('Thème supprimé');
    }
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-bolt-elements-textPrimary">Gestionnaire de Thèmes</h3>
          <p className="text-sm text-bolt-elements-textSecondary mt-1">
            Personnalisez l'apparence de l'interface
          </p>
        </div>
        <button
          onClick={() => setShowCustomForm(true)}
          className={classNames(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            'bg-purple-500 hover:bg-purple-600',
            'text-white text-sm font-medium'
          )}
        >
          <div className="i-ph:palette" />
          Créer un thème
        </button>
      </div>

      {/* Current Theme Preview */}
      <div className="mb-6 p-4 bg-bolt-elements-background-depth-2 rounded-lg border border-bolt-elements-borderColor">
        <h4 className="text-sm font-medium text-bolt-elements-textPrimary mb-3">Thème Actuel</h4>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {Object.entries(currentTheme.colors).slice(0, 6).map(([key, color]) => (
              <div
                key={key}
                className="w-8 h-8 rounded-full border-2 border-bolt-elements-borderColor"
                style={{ backgroundColor: color }}
                title={`${key}: ${color}`}
              />
            ))}
          </div>
          <div className="flex-1">
            <div className="font-medium text-bolt-elements-textPrimary">{currentTheme.name}</div>
            <div className="text-xs text-bolt-elements-textSecondary">
              {currentTheme.id.startsWith('custom-') ? 'Thème personnalisé' : 'Thème prédéfini'}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Theme Form */}
      <AnimatePresence>
        {showCustomForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-bolt-elements-background-depth-2 rounded-lg border border-bolt-elements-borderColor"
          >
            <h4 className="text-sm font-medium text-bolt-elements-textPrimary mb-4">Créer un Thème Personnalisé</h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">
                    Couleur Principale
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={customColors.primary}
                      onChange={(e) => setCustomColors({ ...customColors, primary: e.target.value })}
                      className="w-12 h-10 rounded border border-bolt-elements-borderColor cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customColors.primary}
                      onChange={(e) => setCustomColors({ ...customColors, primary: e.target.value })}
                      className={classNames(
                        'flex-1 px-3 py-2 rounded-lg text-sm',
                        'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                        'text-bolt-elements-textPrimary',
                        'focus:outline-none focus:ring-2 focus:ring-purple-500/30'
                      )}
                      placeholder="#8B5CF6"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">
                    Couleur de Fond
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={customColors.background}
                      onChange={(e) => setCustomColors({ ...customColors, background: e.target.value })}
                      className="w-12 h-10 rounded border border-bolt-elements-borderColor cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customColors.background}
                      onChange={(e) => setCustomColors({ ...customColors, background: e.target.value })}
                      className={classNames(
                        'flex-1 px-3 py-2 rounded-lg text-sm',
                        'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                        'text-bolt-elements-textPrimary',
                        'focus:outline-none focus:ring-2 focus:ring-purple-500/30'
                      )}
                      placeholder="#0F0F0F"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 rounded-lg border border-bolt-elements-borderColor">
                <div className="text-xs text-bolt-elements-textSecondary mb-2">Aperçu</div>
                <div 
                  className="h-20 rounded flex items-center justify-center text-white text-sm font-medium"
                  style={{ 
                    backgroundColor: customColors.background,
                    border: `2px solid ${customColors.primary}`
                  }}
                >
                  <div 
                    className="px-4 py-2 rounded"
                    style={{ backgroundColor: customColors.primary }}
                  >
                    Exemple de bouton
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowCustomForm(false)}
                  className={classNames(
                    'px-4 py-2 text-sm rounded-lg transition-colors',
                    'bg-bolt-elements-background-depth-3 hover:bg-bolt-elements-background-depth-4',
                    'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary'
                  )}
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateCustomTheme}
                  className={classNames(
                    'px-4 py-2 text-sm rounded-lg transition-colors',
                    'bg-purple-500 hover:bg-purple-600',
                    'text-white font-medium'
                  )}
                >
                  Créer le thème
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Themes Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allThemes.map((theme) => (
            <motion.div
              key={theme.id}
              className={classNames(
                'p-4 rounded-lg border transition-all cursor-pointer',
                currentTheme.id === theme.id
                  ? 'ring-2 ring-purple-500 border-purple-500/50 bg-purple-500/10'
                  : 'border-bolt-elements-borderColor hover:border-purple-500/30 bg-bolt-elements-background-depth-2'
              )}
              whileHover={{ scale: 1.02 }}
              onClick={() => setTheme(theme.id)}
            >
              {/* Theme Preview */}
              <div className="mb-3">
                <div 
                  className="h-16 rounded mb-2 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: theme.colors.background }}
                >
                  <div 
                    className="absolute top-2 left-2 right-2 h-2 rounded"
                    style={{ backgroundColor: theme.colors.surface }}
                  />
                  <div 
                    className="w-12 h-6 rounded text-xs flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    App
                  </div>
                  <div 
                    className="absolute bottom-2 left-2 w-4 h-4 rounded-full"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                  <div 
                    className="absolute bottom-2 right-2 w-6 h-2 rounded"
                    style={{ backgroundColor: theme.colors.secondary }}
                  />
                </div>
                
                {/* Color Palette */}
                <div className="flex gap-1">
                  {[theme.colors.primary, theme.colors.secondary, theme.colors.accent, theme.colors.success].map((color, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Theme Info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-bolt-elements-textPrimary text-sm">{theme.name}</div>
                  <div className="text-xs text-bolt-elements-textSecondary">
                    {theme.id.startsWith('custom-') ? 'Personnalisé' : 'Prédéfini'}
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {currentTheme.id === theme.id && (
                    <div className="i-ph:check-circle text-purple-500" />
                  )}
                  {theme.id.startsWith('custom-') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTheme(theme.id, theme.name);
                      }}
                      className={classNames(
                        'p-1 rounded hover:bg-red-500/10 text-bolt-elements-textSecondary hover:text-red-500',
                        'transition-colors'
                      )}
                    >
                      <div className="i-ph:trash text-xs" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 p-4 bg-bolt-elements-background-depth-2 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-bolt-elements-textPrimary">{allThemes.length}</div>
            <div className="text-xs text-bolt-elements-textSecondary">Thèmes Total</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-purple-500">
              {allThemes.filter(t => t.id.startsWith('custom-')).length}
            </div>
            <div className="text-xs text-bolt-elements-textSecondary">Personnalisés</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-500">
              {allThemes.filter(t => !t.id.startsWith('custom-')).length}
            </div>
            <div className="text-xs text-bolt-elements-textSecondary">Prédéfinis</div>
          </div>
        </div>
      </div>
    </div>
  );
};