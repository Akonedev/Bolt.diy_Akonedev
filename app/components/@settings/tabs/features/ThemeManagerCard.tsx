import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '~/utils/classNames';

interface ThemeManagerCardProps {
  onClick: () => void;
}

export const ThemeManagerCard: React.FC<ThemeManagerCardProps> = ({ onClick }) => {
  return (
    <motion.div
      className={classNames(
        'group relative p-6 rounded-xl transition-all duration-300 cursor-pointer',
        'bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10',
        'border border-purple-500/20 hover:border-purple-500/40',
        'hover:shadow-lg hover:shadow-purple-500/10',
        'backdrop-blur-sm'
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={classNames(
            'flex items-center justify-center w-12 h-12 rounded-xl',
            'bg-gradient-to-br from-purple-500 to-pink-500',
            'text-white text-xl',
            'group-hover:scale-110 transition-transform duration-300'
          )}>
            🎨
          </div>
          <div>
            <h3 className="text-lg font-semibold text-bolt-elements-textPrimary group-hover:text-purple-400 transition-colors">
              Gestionnaire de Thèmes
            </h3>
            <p className="text-sm text-bolt-elements-textSecondary">
              Personnalisation complète
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">
            Nouveau
          </div>
          <div className="i-ph:arrow-right text-bolt-elements-textSecondary group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>

      {/* Preview Colors */}
      <div className="relative mb-4">
        <div className="flex gap-2 mb-2">
          {[
            '#8B5CF6', // Purple
            '#3B82F6', // Blue  
            '#10B981', // Green
            '#F59E0B', // Yellow
            '#EF4444', // Red
            '#06B6D4', // Cyan
          ].map((color, index) => (
            <motion.div
              key={color}
              className="w-6 h-6 rounded-full border-2 border-bolt-elements-borderColor"
              style={{ backgroundColor: color }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.2, y: -2 }}
            />
          ))}
        </div>
        <div className="text-xs text-bolt-elements-textSecondary">
          5+ thèmes prédéfinis • Création illimitée
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-2 mb-4">
        {[
          { icon: '🎯', text: 'Thèmes sombre/clair prêts' },
          { icon: '🎨', text: 'Créateur de thèmes personnalisés' },
          { icon: '⚡', text: 'Application instantanée' },
          { icon: '💾', text: 'Sauvegarde automatique' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 text-xs text-bolt-elements-textSecondary"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <span className="text-sm">{feature.icon}</span>
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Action Button */}
      <div className="relative">
        <motion.button
          className={classNames(
            'w-full py-3 rounded-lg font-medium text-sm',
            'bg-gradient-to-r from-purple-500 to-pink-500',
            'text-white shadow-lg',
            'hover:shadow-xl hover:shadow-purple-500/25',
            'group-hover:scale-105 transition-all duration-300'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-2">
            <span>Personnaliser l'Interface</span>
            <div className="i-ph:palette" />
          </span>
        </motion.button>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full blur-xl" />
      </div>
    </motion.div>
  );
};