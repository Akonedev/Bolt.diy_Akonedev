import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '~/utils/classNames';
import { Switch } from '~/components/ui/Switch';
import { usePromptManager } from '~/lib/hooks/usePromptManager';
import { toast } from 'react-toastify';
import { PromptLibrary } from '~/lib/common/prompt-library';

export const SystemPromptEditor: React.FC = () => {
  const { promptConfig, updateSystemPrompt } = usePromptManager();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(promptConfig.systemPrompt.content);
  const [selectedTemplate, setSelectedTemplate] = useState('default');

  const handleSave = () => {
    updateSystemPrompt({ content: editContent });
    setIsEditing(false);
    toast.success('Prompt système mis à jour');
  };

  const handleCancel = () => {
    setEditContent(promptConfig.systemPrompt.content);
    setIsEditing(false);
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (templateId !== 'custom') {
      try {
        const templateContent = PromptLibrary.getPropmtFromLibrary(templateId, {
          cwd: '/tmp',
          allowedHtmlElements: [],
          modificationTagName: 'bolt-diff',
        });
        setEditContent(templateContent);
      } catch (error) {
        toast.error('Erreur lors du chargement du template');
      }
    }
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-bolt-elements-textPrimary">
            Prompt Système
          </h3>
          <p className="text-sm text-bolt-elements-textSecondary mt-1">
            Configurez le comportement de base de l'assistant IA
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-bolt-elements-textSecondary">Activé</label>
          <Switch
            checked={promptConfig.systemPrompt.enabled}
            onCheckedChange={(enabled) => {
              updateSystemPrompt({ enabled });
              toast.success(`Prompt système ${enabled ? 'activé' : 'désactivé'}`);
            }}
          />
        </div>
      </div>

      {/* Template Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-bolt-elements-textPrimary mb-2">
          Template de base
        </label>
        <select
          value={selectedTemplate}
          onChange={(e) => handleTemplateChange(e.target.value)}
          className={classNames(
            'w-full p-3 rounded-lg text-sm',
            'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
            'text-bolt-elements-textPrimary',
            'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
            'transition-all duration-200'
          )}
        >
          {PromptLibrary.getList().map((template) => (
            <option key={template.id} value={template.id}>
              {template.label} - {template.description}
            </option>
          ))}
          <option value="custom">Prompt personnalisé</option>
        </select>
      </div>

      {/* Content Editor */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-bolt-elements-textPrimary">
            Contenu du prompt
          </label>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className={classNames(
                    'px-3 py-1.5 text-xs rounded-lg transition-colors',
                    'bg-bolt-elements-background-depth-3 hover:bg-bolt-elements-background-depth-4',
                    'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary'
                  )}
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className={classNames(
                    'px-3 py-1.5 text-xs rounded-lg transition-colors',
                    'bg-purple-500 hover:bg-purple-600',
                    'text-white font-medium'
                  )}
                >
                  Sauvegarder
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className={classNames(
                  'px-3 py-1.5 text-xs rounded-lg transition-colors',
                  'bg-bolt-elements-background-depth-3 hover:bg-bolt-elements-background-depth-4',
                  'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary'
                )}
              >
                Modifier
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={classNames(
              'flex-1 w-full p-4 rounded-lg text-sm font-mono',
              'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
              'text-bolt-elements-textPrimary',
              'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
              'resize-none transition-all duration-200'
            )}
            placeholder="Saisissez votre prompt système..."
          />
        ) : (
          <div
            className={classNames(
              'flex-1 w-full p-4 rounded-lg text-sm',
              'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
              'text-bolt-elements-textSecondary',
              'overflow-y-auto whitespace-pre-wrap'
            )}
          >
            {promptConfig.systemPrompt.content || 'Aucun prompt configuré'}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 p-4 bg-bolt-elements-background-depth-2 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-bolt-elements-textPrimary">
              {promptConfig.systemPrompt.content.length}
            </div>
            <div className="text-xs text-bolt-elements-textSecondary">Caractères</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-bolt-elements-textPrimary">
              {promptConfig.systemPrompt.content.split(/\s+/).filter(w => w.length > 0).length}
            </div>
            <div className="text-xs text-bolt-elements-textSecondary">Mots</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-bolt-elements-textPrimary">
              {Math.ceil(promptConfig.systemPrompt.content.length / 4)}
            </div>
            <div className="text-xs text-bolt-elements-textSecondary">Tokens (approx.)</div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {promptConfig.systemPrompt.enabled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="i-ph:check-circle text-green-500" />
            <span className="text-sm font-medium text-green-500">Prompt actif</span>
          </div>
          <p className="text-xs text-bolt-elements-textSecondary">
            Ce prompt sera utilisé comme base pour toutes vos conversations
          </p>
        </motion.div>
      )}
    </div>
  );
};