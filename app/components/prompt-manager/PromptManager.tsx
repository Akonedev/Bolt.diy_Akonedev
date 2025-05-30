import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { classNames } from '~/utils/classNames';
import { toast } from 'react-toastify';
import { Switch } from '~/components/ui/Switch';
import { usePromptManager, type CustomPrompt, type Tool, type Role } from '~/lib/hooks/usePromptManager';
import { SystemPromptEditor } from './SystemPromptEditor';
import { CustomPromptEditor } from './CustomPromptEditor';
import { ToolsManager } from './ToolsManager';
import { RolesManager } from './RolesManager';

interface TabItem {
  id: string;
  label: string;
  icon: string;
  component: React.ComponentType;
}

const tabs: TabItem[] = [
  {
    id: 'system',
    label: 'Prompt Système',
    icon: 'i-ph:gear',
    component: SystemPromptEditor,
  },
  {
    id: 'custom',
    label: 'Prompts Personnalisés',
    icon: 'i-ph:chat-text',
    component: CustomPromptEditor,
  },
  {
    id: 'tools',
    label: 'Outils',
    icon: 'i-ph:wrench',
    component: ToolsManager,
  },
  {
    id: 'roles',
    label: 'Rôles',
    icon: 'i-ph:user-circle',
    component: RolesManager,
  },
];

interface PromptManagerProps {
  onClose: () => void;
}

export const PromptManager: React.FC<PromptManagerProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('system');
  const {
    promptConfig,
    updatePromptConfig,
    isSaving,
    lastSaved,
    saveConfigManually
  } = usePromptManager();

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || SystemPromptEditor;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={classNames(
          'bg-bolt-elements-background-depth-1',
          'border border-bolt-elements-borderColor',
          'rounded-2xl shadow-2xl',
          'w-full max-w-6xl h-[90vh]',
          'flex flex-col overflow-hidden'
        )}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-bolt-elements-borderColor">
          <div className="flex items-center gap-3">
            <div className="i-ph:chat-text text-2xl text-purple-500" />
            <div>
              <h2 className="text-xl font-semibold text-bolt-elements-textPrimary">
                Gestionnaire de Prompts
              </h2>
              <p className="text-sm text-bolt-elements-textSecondary">
                Personnalisez vos prompts, outils et rôles pour optimiser vos conversations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={classNames(
              'p-2 rounded-lg transition-colors',
              'hover:bg-bolt-elements-background-depth-3',
              'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary'
            )}
          >
            <div className="i-ph:x text-xl" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={classNames(
                    'w-full flex items-center gap-3 p-3 rounded-lg transition-all',
                    'text-left text-sm font-medium',
                    activeTab === tab.id
                      ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
                      : 'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-3'
                  )}
                >
                  <div className={classNames(tab.icon, 'text-lg')} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Status Section */}
            <div className="mt-8 p-4 bg-bolt-elements-background-depth-3 rounded-lg">
              <h4 className="text-sm font-medium text-bolt-elements-textPrimary mb-3">
                Configuration Active
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-bolt-elements-textSecondary">Prompt Système:</span>
                  <span className="text-bolt-elements-textPrimary">
                    {promptConfig.systemPrompt.enabled ? 'Activé' : 'Désactivé'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bolt-elements-textSecondary">Prompts Custom:</span>
                  <span className="text-bolt-elements-textPrimary">
                    {promptConfig.customPrompts.filter(p => p.enabled).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bolt-elements-textSecondary">Outils:</span>
                  <span className="text-bolt-elements-textPrimary">
                    {promptConfig.tools.filter(t => t.enabled).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bolt-elements-textSecondary">Rôles:</span>
                  <span className="text-bolt-elements-textPrimary">
                    {promptConfig.roles.filter(r => r.enabled).length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="flex-1 overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-bolt-elements-borderColor p-4 bg-bolt-elements-background-depth-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-xs text-bolt-elements-textSecondary">
                Sauvegarde automatique activée
              </div>
              {/* Indicateur de sauvegarde */}
              <div className="flex items-center gap-2">
                {isSaving ? (
                  <>
                    <div className="i-ph:spinner animate-spin text-blue-500" />
                    <span className="text-xs text-blue-500">Sauvegarde...</span>
                  </>
                ) : lastSaved ? (
                  <>
                    <div className="i-ph:check-circle text-green-500" />
                    <span className="text-xs text-green-500">
                      Sauvé à {lastSaved.toLocaleTimeString()}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="i-ph:warning text-orange-500" />
                    <span className="text-xs text-orange-500">Non sauvegardé</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={saveConfigManually}
                disabled={isSaving}
                className={classNames(
                  'px-4 py-2 text-sm rounded-lg transition-colors',
                  'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300',
                  'text-white font-medium',
                  'flex items-center gap-2'
                )}
              >
                {isSaving ? (
                  <div className="i-ph:spinner animate-spin" />
                ) : (
                  <div className="i-ph:floppy-disk" />
                )}
                Sauvegarder
              </button>
              <button
                onClick={() => {
                  // Reset to defaults
                  toast.success('Configuration réinitialisée');
                }}
                className={classNames(
                  'px-4 py-2 text-sm rounded-lg transition-colors',
                  'bg-bolt-elements-background-depth-3 hover:bg-bolt-elements-background-depth-4',
                  'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary'
                )}
              >
                Réinitialiser
              </button>
              <button
                onClick={onClose}
                className={classNames(
                  'px-4 py-2 text-sm rounded-lg transition-colors',
                  'bg-purple-500 hover:bg-purple-600',
                  'text-white font-medium'
                )}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};