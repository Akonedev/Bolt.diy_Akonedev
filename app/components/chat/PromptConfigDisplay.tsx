import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { classNames } from '~/utils/classNames';
import { useEnhancedPrompts } from '~/lib/hooks/useEnhancedPrompts';

export const PromptConfigDisplay: React.FC = () => {
  const { getPromptInfo, getConfigSummary, hasEnhancements } = useEnhancedPrompts();
  const [isExpanded, setIsExpanded] = useState(false);

  const info = getPromptInfo();

  // Ne pas afficher si aucune amélioration n'est active
  if (!hasEnhancements()) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <div
        className={classNames(
          'bg-purple-500/10 border border-purple-500/20 rounded-lg p-3',
          'cursor-pointer transition-all duration-200',
          'hover:bg-purple-500/15 hover:border-purple-500/30'
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="i-ph:magic-wand text-purple-500" />
            <span className="text-sm font-medium text-purple-500">
              Configuration Active
            </span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-500 font-medium">
              {info.totalEnhancements} améliorations
            </span>
          </div>
          <div className={classNames(
            'i-ph:chevron-down text-purple-500 transition-transform duration-200',
            { 'rotate-180': isExpanded }
          )} />
        </div>

        <p className="text-xs text-bolt-elements-textSecondary mt-1 line-clamp-1">
          {getConfigSummary()}
        </p>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 bg-bolt-elements-background-depth-2 border border-bolt-elements-borderColor rounded-lg p-3"
          >
            <div className="space-y-3">
              {/* Prompt Système */}
              <div>
                <h4 className="text-xs font-medium text-bolt-elements-textPrimary mb-1">
                  Prompt Système
                </h4>
                <div className="flex items-center gap-2">
                  <div className={classNames(
                    'w-2 h-2 rounded-full',
                    info.isUsingCustomSystem ? 'bg-green-500' : 'bg-blue-500'
                  )} />
                  <span className="text-xs text-bolt-elements-textSecondary">
                    {info.isUsingCustomSystem ? 'Personnalisé' : 'Template prédéfini'}
                  </span>
                </div>
              </div>

              {/* Rôles Actifs */}
              {info.activeRoles.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-bolt-elements-textPrimary mb-2">
                    Rôles Actifs ({info.activeRoles.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {info.activeRoles.map((role, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-bolt-elements-background-depth-3 rounded text-xs"
                      >
                        <span>{role.avatar}</span>
                        <span className="text-bolt-elements-textSecondary">{role.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outils Actifs */}
              {info.activeTools.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-bolt-elements-textPrimary mb-2">
                    Outils Actifs ({info.activeTools.length})
                  </h4>
                  <div className="space-y-1">
                    {info.activeTools.map((tool, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-2 py-1 bg-bolt-elements-background-depth-3 rounded"
                      >
                        <div className="i-ph:wrench text-purple-500 text-xs" />
                        <div className="flex-1">
                          <div className="text-xs font-medium text-bolt-elements-textPrimary">
                            {tool.name}
                          </div>
                          <div className="text-xs text-bolt-elements-textSecondary line-clamp-1">
                            {tool.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prompts Personnalisés */}
              {info.customPromptsCount > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-bolt-elements-textPrimary mb-1">
                    Prompts Personnalisés
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-bolt-elements-textSecondary">
                      {info.customPromptsCount} prompt(s) actif(s)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-bolt-elements-borderColor">
              <p className="text-xs text-bolt-elements-textSecondary">
                💡 Cette configuration influence le comportement de l'IA pour cette conversation
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};