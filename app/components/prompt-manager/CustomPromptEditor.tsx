import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { classNames } from '~/utils/classNames';
import { Switch } from '~/components/ui/Switch';
import { usePromptManager, type CustomPrompt } from '~/lib/hooks/usePromptManager';
import { toast } from 'react-toastify';

export const CustomPromptEditor: React.FC = () => {
  const { promptConfig, addCustomPrompt, updateCustomPrompt, deleteCustomPrompt } = usePromptManager();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPrompt, setNewPrompt] = useState({
    name: '',
    content: '',
    category: 'context' as const,
    enabled: true,
  });

  const handleAddPrompt = () => {
    if (!newPrompt.name.trim() || !newPrompt.content.trim()) {
      toast.error('Nom et contenu requis');
      return;
    }

    addCustomPrompt(newPrompt);
    setNewPrompt({ name: '', content: '', category: 'context', enabled: true });
    setShowAddForm(false);
    toast.success('Prompt personnalisé ajouté');
  };

  const handleUpdatePrompt = (id: string, updates: Partial<CustomPrompt>) => {
    updateCustomPrompt(id, updates);
    toast.success('Prompt mis à jour');
  };

  const handleDeletePrompt = (id: string, name: string) => {
    if (confirm(`Supprimer le prompt "${name}" ?`)) {
      deleteCustomPrompt(id);
      toast.success('Prompt supprimé');
    }
  };

  const categoryLabels = {
    prefix: 'Préfixe',
    context: 'Contexte',
    suffix: 'Instructions finales',
  };

  const categoryDescriptions = {
    prefix: 'Ajouté avant le prompt système',
    context: 'Ajouté après le prompt système',
    suffix: 'Ajouté à la fin de tous les prompts',
  };

  const sortedPrompts = [...promptConfig.customPrompts].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-bolt-elements-textPrimary">
            Prompts Personnalisés
          </h3>
          <p className="text-sm text-bolt-elements-textSecondary mt-1">
            Ajoutez des instructions spécifiques à vos besoins
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
          Ajouter un prompt
        </button>
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
              Nouveau prompt personnalisé
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">
                  Nom du prompt
                </label>
                <input
                  type="text"
                  value={newPrompt.name}
                  onChange={(e) => setNewPrompt({ ...newPrompt, name: e.target.value })}
                  className={classNames(
                    'w-full p-3 rounded-lg text-sm',
                    'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                    'text-bolt-elements-textPrimary',
                    'focus:outline-none focus:ring-2 focus:ring-purple-500/30'
                  )}
                  placeholder="Ex: Instructions de code, Style de réponse..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">
                  Catégorie
                </label>
                <select
                  value={newPrompt.category}
                  onChange={(e) => setNewPrompt({ ...newPrompt, category: e.target.value as any })}
                  className={classNames(
                    'w-full p-3 rounded-lg text-sm',
                    'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                    'text-bolt-elements-textPrimary',
                    'focus:outline-none focus:ring-2 focus:ring-purple-500/30'
                  )}
                >
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label} - {categoryDescriptions[key as keyof typeof categoryDescriptions]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">
                  Contenu
                </label>
                <textarea
                  value={newPrompt.content}
                  onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
                  rows={4}
                  className={classNames(
                    'w-full p-3 rounded-lg text-sm',
                    'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                    'text-bolt-elements-textPrimary',
                    'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
                    'resize-none'
                  )}
                  placeholder="Saisissez les instructions ou le contexte à ajouter..."
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={newPrompt.enabled}
                    onCheckedChange={(enabled) => setNewPrompt({ ...newPrompt, enabled })}
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
                    onClick={handleAddPrompt}
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

      {/* Prompts List */}
      <div className="flex-1 overflow-y-auto">
        {sortedPrompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="i-ph:chat-text text-4xl text-bolt-elements-textSecondary mb-4" />
            <h4 className="text-lg font-medium text-bolt-elements-textPrimary mb-2">
              Aucun prompt personnalisé
            </h4>
            <p className="text-sm text-bolt-elements-textSecondary mb-4">
              Créez des prompts pour personnaliser le comportement de l'IA
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className={classNames(
                'px-4 py-2 rounded-lg transition-colors',
                'bg-purple-500 hover:bg-purple-600',
                'text-white text-sm font-medium'
              )}
            >
              Créer mon premier prompt
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedPrompts.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                layout
                className={classNames(
                  'p-4 rounded-lg border transition-all',
                  prompt.enabled
                    ? 'bg-bolt-elements-background-depth-2 border-bolt-elements-borderColor'
                    : 'bg-bolt-elements-background-depth-1 border-bolt-elements-borderColor opacity-60'
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-bolt-elements-textPrimary">
                        {prompt.name}
                      </h4>
                      <span
                        className={classNames(
                          'px-2 py-0.5 text-xs rounded-full font-medium',
                          {
                            'bg-blue-500/10 text-blue-500': prompt.category === 'prefix',
                            'bg-green-500/10 text-green-500': prompt.category === 'context',
                            'bg-orange-500/10 text-orange-500': prompt.category === 'suffix'
                          }
                        )}
                      >
                        {categoryLabels[prompt.category]}
                      </span>
                      <span className="text-xs text-bolt-elements-textSecondary">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-bolt-elements-textSecondary line-clamp-2">
                      {prompt.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Switch
                      checked={prompt.enabled}
                      onCheckedChange={(enabled) => handleUpdatePrompt(prompt.id, { enabled })}
                    />
                    <button
                      onClick={() => setEditingId(editingId === prompt.id ? null : prompt.id)}
                      className={classNames(
                        'p-1.5 rounded-lg transition-colors',
                        'hover:bg-bolt-elements-background-depth-3',
                        'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary'
                      )}
                    >
                      <div className="i-ph:pencil text-sm" />
                    </button>
                    <button
                      onClick={() => handleDeletePrompt(prompt.id, prompt.name)}
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
                  {editingId === prompt.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 border-t border-bolt-elements-borderColor"
                    >
                      <textarea
                        defaultValue={prompt.content}
                        className={classNames(
                          'w-full p-3 rounded-lg text-sm',
                          'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                          'text-bolt-elements-textPrimary',
                          'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
                          'resize-none'
                        )}
                        rows={3}
                        onBlur={(e) => {
                          if (e.target.value !== prompt.content) {
                            handleUpdatePrompt(prompt.id, { content: e.target.value });
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
      {sortedPrompts.length > 0 && (
        <div className="mt-4 p-4 bg-bolt-elements-background-depth-2 rounded-lg">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-bolt-elements-textPrimary">
                {sortedPrompts.length}
              </div>
              <div className="text-xs text-bolt-elements-textSecondary">Total</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-500">
                {sortedPrompts.filter(p => p.enabled).length}
              </div>
              <div className="text-xs text-bolt-elements-textSecondary">Actifs</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-bolt-elements-textPrimary">
                {sortedPrompts.filter(p => p.category === 'context').length}
              </div>
              <div className="text-xs text-bolt-elements-textSecondary">Contexte</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-bolt-elements-textPrimary">
                {Math.ceil(sortedPrompts.reduce((acc, p) => acc + p.content.length, 0) / 4)}
              </div>
              <div className="text-xs text-bolt-elements-textSecondary">Tokens</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};