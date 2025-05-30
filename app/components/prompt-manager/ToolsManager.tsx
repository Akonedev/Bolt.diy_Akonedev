import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { classNames } from '~/utils/classNames';
import { Switch } from '~/components/ui/Switch';
import { usePromptManager, type Tool } from '~/lib/hooks/usePromptManager';
import { toast } from 'react-toastify';

const predefinedTools = [
  {
    name: 'Analyse de Code',
    description: 'Analyse approfondie du code pour détecter les problèmes et suggérer des améliorations',
    command: 'analyze-code',
    parameters: { checkQuality: true, checkSecurity: true, checkPerformance: true },
  },
  {
    name: 'Générateur de Tests',
    description: 'Génère automatiquement des tests unitaires pour le code fourni',
    command: 'generate-tests',
    parameters: { framework: 'jest', coverage: 'high' },
  },
  {
    name: 'Documentation Auto',
    description: 'Génère automatiquement la documentation du code',
    command: 'generate-docs',
    parameters: { format: 'markdown', includeExamples: true },
  },
  {
    name: 'Optimiseur de Performance',
    description: 'Analyse et optimise les performances du code',
    command: 'optimize-performance',
    parameters: { target: 'speed', includeMemory: true },
  },
  {
    name: 'Validateur de Sécurité',
    description: 'Vérifie les vulnérabilités de sécurité dans le code',
    command: 'security-check',
    parameters: { level: 'strict', includeDepencencies: true },
  },
];

export const ToolsManager: React.FC = () => {
  const { promptConfig, addTool, updateTool, deleteTool } = usePromptManager();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTool, setNewTool] = useState({
    name: '',
    description: '',
    command: '',
    parameters: {},
    enabled: true,
  });

  const handleAddTool = () => {
    if (!newTool.name.trim() || !newTool.description.trim()) {
      toast.error('Nom et description requis');
      return;
    }

    addTool(newTool);
    setNewTool({ name: '', description: '', command: '', parameters: {}, enabled: true });
    setShowAddForm(false);
    toast.success('Outil ajouté');
  };

  const handleAddPredefinedTool = (predefined: typeof predefinedTools[0]) => {
    addTool({ ...predefined, enabled: true });
    toast.success(`Outil "${predefined.name}" ajouté`);
  };

  const handleUpdateTool = (id: string, updates: Partial<Tool>) => {
    updateTool(id, updates);
    toast.success('Outil mis à jour');
  };

  const handleDeleteTool = (id: string, name: string) => {
    if (confirm(`Supprimer l'outil "${name}" ?`)) {
      deleteTool(id);
      toast.success('Outil supprimé');
    }
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-bolt-elements-textPrimary">
            Gestionnaire d'Outils
          </h3>
          <p className="text-sm text-bolt-elements-textSecondary mt-1">
            Configurez les outils disponibles pour améliorer les capacités de l'IA
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className={classNames(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            'bg-purple-500 hover:bg-purple-600',
            'text-white text-sm font-medium'
          )}
        >
          <div className="i-ph:plus" />
          Ajouter un outil
        </button>
      </div>

      {/* Predefined Tools */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-bolt-elements-textPrimary mb-3">
          Outils prédéfinis
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {predefinedTools.map((tool, index) => {
            const isAdded = promptConfig.tools.some(t => t.command === tool.command);
            return (
              <motion.div
                key={tool.command}
                className={classNames(
                  'p-3 rounded-lg border transition-all cursor-pointer',
                  isAdded
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-bolt-elements-background-depth-2 border-bolt-elements-borderColor hover:border-purple-500/30'
                )}
                whileHover={{ scale: 1.02 }}
                onClick={() => !isAdded && handleAddPredefinedTool(tool)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-bolt-elements-textPrimary mb-1">
                      {tool.name}
                    </h5>
                    <p className="text-xs text-bolt-elements-textSecondary line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                  <div className={classNames(
                    'ml-2 p-1 rounded-full',
                    isAdded ? 'bg-green-500 text-white' : 'bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary'
                  )}>
                    <div className={isAdded ? 'i-ph:check' : 'i-ph:plus'} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-bolt-elements-background-depth-2 rounded-lg border border-bolt-elements-borderColor"
          >
            <h4 className="text-sm font-medium text-bolt-elements-textPrimary mb-4">
              Nouvel outil personnalisé
            </h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">
                    Nom de l'outil
                  </label>
                  <input
                    type="text"
                    value={newTool.name}
                    onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                    className={classNames(
                      'w-full p-3 rounded-lg text-sm',
                      'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                      'text-bolt-elements-textPrimary',
                      'focus:outline-none focus:ring-2 focus:ring-purple-500/30'
                    )}
                    placeholder="Ex: Vérificateur de syntaxe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">
                    Commande
                  </label>
                  <input
                    type="text"
                    value={newTool.command}
                    onChange={(e) => setNewTool({ ...newTool, command: e.target.value })}
                    className={classNames(
                      'w-full p-3 rounded-lg text-sm',
                      'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                      'text-bolt-elements-textPrimary',
                      'focus:outline-none focus:ring-2 focus:ring-purple-500/30'
                    )}
                    placeholder="syntax-check"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">
                  Description
                </label>
                <textarea
                  value={newTool.description}
                  onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                  rows={3}
                  className={classNames(
                    'w-full p-3 rounded-lg text-sm',
                    'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                    'text-bolt-elements-textPrimary',
                    'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
                    'resize-none'
                  )}
                  placeholder="Décrivez ce que fait cet outil..."
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={newTool.enabled}
                    onCheckedChange={(enabled) => setNewTool({ ...newTool, enabled })}
                  />
                  <span className="text-xs text-bolt-elements-textSecondary">Activer immédiatement</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className={classNames(
                      'px-3 py-1.5 text-xs rounded-lg transition-colors',
                      'bg-bolt-elements-background-depth-3 hover:bg-bolt-elements-background-depth-4',
                      'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary'
                    )}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddTool}
                    className={classNames(
                      'px-3 py-1.5 text-xs rounded-lg transition-colors',
                      'bg-purple-500 hover:bg-purple-600',
                      'text-white font-medium'
                    )}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tools List */}
      <div className="flex-1 overflow-y-auto">
        {promptConfig.tools.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="i-ph:wrench text-4xl text-bolt-elements-textSecondary mb-4" />
            <h4 className="text-lg font-medium text-bolt-elements-textPrimary mb-2">
              Aucun outil configuré
            </h4>
            <p className="text-sm text-bolt-elements-textSecondary mb-4">
              Ajoutez des outils pour étendre les capacités de l'IA
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className={classNames(
                'px-4 py-2 rounded-lg transition-colors',
                'bg-purple-500 hover:bg-purple-600',
                'text-white text-sm font-medium'
              )}
            >
              Ajouter mon premier outil
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {promptConfig.tools.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                className={classNames(
                  'p-4 rounded-lg border transition-all',
                  tool.enabled
                    ? 'bg-bolt-elements-background-depth-2 border-bolt-elements-borderColor'
                    : 'bg-bolt-elements-background-depth-1 border-bolt-elements-borderColor opacity-60'
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="i-ph:wrench text-purple-500" />
                      <h4 className="font-medium text-bolt-elements-textPrimary">
                        {tool.name}
                      </h4>
                      {tool.command && (
                        <code className="px-2 py-0.5 text-xs rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary">
                          {tool.command}
                        </code>
                      )}
                    </div>
                    <p className="text-sm text-bolt-elements-textSecondary line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Switch
                      checked={tool.enabled}
                      onCheckedChange={(enabled) => handleUpdateTool(tool.id, { enabled })}
                    />
                    <button
                      onClick={() => setEditingId(editingId === tool.id ? null : tool.id)}
                      className={classNames(
                        'p-1.5 rounded-lg transition-colors',
                        'hover:bg-bolt-elements-background-depth-3',
                        'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary'
                      )}
                    >
                      <div className="i-ph:pencil text-sm" />
                    </button>
                    <button
                      onClick={() => handleDeleteTool(tool.id, tool.name)}
                      className={classNames(
                        'p-1.5 rounded-lg transition-colors',
                        'hover:bg-red-500/10',
                        'text-bolt-elements-textSecondary hover:text-red-500'
                      )}
                    >
                      <div className="i-ph:trash text-sm" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {editingId === tool.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 border-t border-bolt-elements-borderColor space-y-3"
                    >
                      <input
                        defaultValue={tool.name}
                        className={classNames(
                          'w-full p-2 rounded text-sm',
                          'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                          'text-bolt-elements-textPrimary'
                        )}
                        placeholder="Nom de l'outil"
                        onBlur={(e) => {
                          if (e.target.value !== tool.name) {
                            handleUpdateTool(tool.id, { name: e.target.value });
                          }
                        }}
                      />
                      <textarea
                        defaultValue={tool.description}
                        className={classNames(
                          'w-full p-2 rounded text-sm',
                          'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                          'text-bolt-elements-textPrimary',
                          'resize-none'
                        )}
                        rows={2}
                        placeholder="Description"
                        onBlur={(e) => {
                          if (e.target.value !== tool.description) {
                            handleUpdateTool(tool.id, { description: e.target.value });
                          }
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      {promptConfig.tools.length > 0 && (
        <div className="mt-4 p-4 bg-bolt-elements-background-depth-2 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-bolt-elements-textPrimary">
                {promptConfig.tools.length}
              </div>
              <div className="text-xs text-bolt-elements-textSecondary">Total</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-500">
                {promptConfig.tools.filter(t => t.enabled).length}
              </div>
              <div className="text-xs text-bolt-elements-textSecondary">Actifs</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-purple-500">
                {promptConfig.tools.filter(t => t.enabled).length > 0 ? '✓' : '✗'}
              </div>
              <div className="text-xs text-bolt-elements-textSecondary">Disponibles</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};