import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { classNames } from '~/utils/classNames';
import { Switch } from '~/components/ui/Switch';
import { usePromptManager, type Role } from '~/lib/hooks/usePromptManager';
import { toast } from 'react-toastify';

const predefinedRoles = [
  {
    name: 'Développeur Senior',
    description: "Expert en développement logiciel avec 10+ années d'expérience",
    prompt:
      "Vous êtes un développeur senior avec plus de 10 ans d'expérience. Concentrez-vous sur les bonnes pratiques, l'architecture propre, la performance et la maintenabilité. Fournissez toujours du code de qualité production avec des explications détaillées.",
    avatar: '👨‍💻',
  },
  {
    name: 'Architecte Logiciel',
    description: 'Spécialiste en architecture de systèmes complexes',
    prompt:
      "Vous êtes un architecte logiciel expert. Concentrez-vous sur la conception de systèmes scalables, les patterns architecturaux, les décisions techniques stratégiques et l'optimisation des performances à grande échelle.",
    avatar: '🏗️',
  },
  {
    name: 'Expert DevOps',
    description: 'Spécialiste en déploiement et infrastructure',
    prompt:
      "Vous êtes un expert DevOps. Concentrez-vous sur l'automatisation, CI/CD, conteneurisation, orchestration, monitoring et optimisation des infrastructures cloud.",
    avatar: '⚙️',
  },
  {
    name: 'Expert Sécurité',
    description: 'Spécialiste en cybersécurité et sécurité applicative',
    prompt:
      "Vous êtes un expert en cybersécurité. Concentrez-vous sur l'identification des vulnérabilités, les bonnes pratiques de sécurité, l'authentification, l'autorisation et la protection des données.",
    avatar: '🔒',
  },
  {
    name: 'Product Manager',
    description: 'Expert en gestion de produit et stratégie',
    prompt:
      "Vous êtes un Product Manager expérimenté. Concentrez-vous sur la stratégie produit, l'analyse des besoins utilisateurs, la roadmap, les métriques et l'optimisation de l'expérience utilisateur.",
    avatar: '📊',
  },
  {
    name: 'Designer UX/UI',
    description: 'Expert en expérience et interface utilisateur',
    prompt:
      "Vous êtes un designer UX/UI expert. Concentrez-vous sur l'expérience utilisateur, l'accessibilité, les principes de design, les systèmes de design et l'optimisation des interfaces.",
    avatar: '🎨',
  },
];

export const RolesManager: React.FC = () => {
  const { promptConfig, addRole, updateRole, deleteRole } = usePromptManager();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    prompt: '',
    avatar: '🤖',
    enabled: true,
  });

  const handleAddRole = () => {
    if (!newRole.name.trim() || !newRole.prompt.trim()) {
      toast.error('Nom et prompt requis');
      return;
    }

    addRole(newRole);
    setNewRole({ name: '', description: '', prompt: '', avatar: '🤖', enabled: true });
    setShowAddForm(false);
    toast.success('Rôle ajouté');
  };

  const handleAddPredefinedRole = (predefined: (typeof predefinedRoles)[0]) => {
    addRole({ ...predefined, enabled: true });
    toast.success(`Rôle "${predefined.name}" ajouté`);
  };

  const handleUpdateRole = (id: string, updates: Partial<Role>) => {
    updateRole(id, updates);
    // Force immediate save for critical updates like enabled/disabled
    if ('enabled' in updates) {
      setTimeout(() => {
        // This will trigger the auto-save immediately
        window.dispatchEvent(new Event('bolt-force-save'));
      }, 10);
    }
    toast.success('Rôle mis à jour');
  };

  const handleDeleteRole = (id: string, name: string) => {
    if (confirm(`Supprimer le rôle "${name}" ?`)) {
      deleteRole(id);
      toast.success('Rôle supprimé');
    }
  };

  const enabledRoles = promptConfig.roles.filter((r) => r.enabled);

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-bolt-elements-textPrimary">Gestionnaire de Rôles</h3>
          <p className="text-sm text-bolt-elements-textSecondary mt-1">
            Définissez des rôles pour spécialiser le comportement de l'IA
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className={classNames(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            'bg-purple-500 hover:bg-purple-600',
            'text-white text-sm font-medium',
          )}
        >
          <div className="i-ph:plus" />
          Ajouter un rôle
        </button>
      </div>

      {/* Active Roles Preview */}
      {enabledRoles.length > 0 && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <h4 className="text-sm font-medium text-green-500 mb-3 flex items-center gap-2">
            <div className="i-ph:check-circle" />
            Rôles actifs ({enabledRoles.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {enabledRoles.map((role) => (
              <div
                key={role.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-bolt-elements-background-depth-2 rounded-full text-sm"
              >
                <span>{role.avatar}</span>
                <span className="text-bolt-elements-textPrimary">{role.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Predefined Roles */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-bolt-elements-textPrimary mb-3">Rôles prédéfinis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {predefinedRoles.map((role) => {
            const isAdded = promptConfig.roles.some((r) => r.name === role.name);
            return (
              <motion.div
                key={role.name}
                className={classNames(
                  'p-4 rounded-lg border transition-all cursor-pointer',
                  isAdded
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-bolt-elements-background-depth-2 border-bolt-elements-borderColor hover:border-purple-500/30',
                )}
                whileHover={{ scale: 1.02 }}
                onClick={() => !isAdded && handleAddPredefinedRole(role)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl">{role.avatar}</div>
                  <div
                    className={classNames(
                      'p-1 rounded-full',
                      isAdded
                        ? 'bg-green-500 text-white'
                        : 'bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary',
                    )}
                  >
                    <div className={classNames('text-xs', isAdded ? 'i-ph:check' : 'i-ph:plus')} />
                  </div>
                </div>
                <h5 className="text-sm font-medium text-bolt-elements-textPrimary mb-1">{role.name}</h5>
                <p className="text-xs text-bolt-elements-textSecondary line-clamp-2">{role.description}</p>
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
            <h4 className="text-sm font-medium text-bolt-elements-textPrimary mb-4">Nouveau rôle personnalisé</h4>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">Avatar</label>
                  <input
                    type="text"
                    value={newRole.avatar}
                    onChange={(e) => setNewRole({ ...newRole, avatar: e.target.value })}
                    className={classNames(
                      'w-full p-3 rounded-lg text-sm text-center',
                      'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                      'text-bolt-elements-textPrimary',
                      'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
                    )}
                    placeholder="🤖"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">Nom du rôle</label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    className={classNames(
                      'w-full p-3 rounded-lg text-sm',
                      'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                      'text-bolt-elements-textPrimary',
                      'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
                    )}
                    placeholder="Ex: Expert Frontend"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">Description</label>
                <input
                  type="text"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  className={classNames(
                    'w-full p-3 rounded-lg text-sm',
                    'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                    'text-bolt-elements-textPrimary',
                    'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
                  )}
                  placeholder="Courte description du rôle"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-bolt-elements-textPrimary mb-2">Prompt du rôle</label>
                <textarea
                  value={newRole.prompt}
                  onChange={(e) => setNewRole({ ...newRole, prompt: e.target.value })}
                  rows={4}
                  className={classNames(
                    'w-full p-3 rounded-lg text-sm',
                    'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                    'text-bolt-elements-textPrimary',
                    'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
                    'resize-none',
                  )}
                  placeholder="Décrivez le comportement et l'expertise de ce rôle..."
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={newRole.enabled}
                    onCheckedChange={(enabled) => setNewRole({ ...newRole, enabled })}
                  />
                  <span className="text-xs text-bolt-elements-textSecondary">Activer immédiatement</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className={classNames(
                      'px-3 py-1.5 text-xs rounded-lg transition-colors',
                      'bg-bolt-elements-background-depth-3 hover:bg-bolt-elements-background-depth-4',
                      'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary',
                    )}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddRole}
                    className={classNames(
                      'px-3 py-1.5 text-xs rounded-lg transition-colors',
                      'bg-purple-500 hover:bg-purple-600',
                      'text-white font-medium',
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

      {/* Roles List */}
      <div className="flex-1 overflow-y-auto">
        {promptConfig.roles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="i-ph:user-circle text-4xl text-bolt-elements-textSecondary mb-4" />
            <h4 className="text-lg font-medium text-bolt-elements-textPrimary mb-2">Aucun rôle configuré</h4>
            <p className="text-sm text-bolt-elements-textSecondary mb-4">
              Ajoutez des rôles pour spécialiser le comportement de l'IA
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className={classNames(
                'px-4 py-2 rounded-lg transition-colors',
                'bg-purple-500 hover:bg-purple-600',
                'text-white text-sm font-medium',
              )}
            >
              Ajouter mon premier rôle
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {promptConfig.roles.map((role) => (
              <motion.div
                key={role.id}
                layout
                className={classNames(
                  'p-4 rounded-lg border transition-all',
                  role.enabled
                    ? 'bg-bolt-elements-background-depth-2 border-bolt-elements-borderColor'
                    : 'bg-bolt-elements-background-depth-1 border-bolt-elements-borderColor opacity-60',
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-2xl">{role.avatar}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-bolt-elements-textPrimary mb-1">{role.name}</h4>
                      {role.description && (
                        <p className="text-sm text-bolt-elements-textSecondary mb-2">{role.description}</p>
                      )}
                      <p className="text-xs text-bolt-elements-textSecondary line-clamp-2">{role.prompt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Switch
                      checked={role.enabled}
                      onCheckedChange={(enabled) => handleUpdateRole(role.id, { enabled })}
                    />
                    <button
                      onClick={() => setEditingId(editingId === role.id ? null : role.id)}
                      className={classNames(
                        'p-1.5 rounded-lg transition-colors',
                        'hover:bg-bolt-elements-background-depth-3',
                        'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary',
                      )}
                    >
                      <div className="i-ph:pencil text-sm" />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role.id, role.name)}
                      className={classNames(
                        'p-1.5 rounded-lg transition-colors',
                        'hover:bg-red-500/10',
                        'text-bolt-elements-textSecondary hover:text-red-500',
                      )}
                    >
                      <div className="i-ph:trash text-sm" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {editingId === role.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 border-t border-bolt-elements-borderColor space-y-3"
                    >
                      <div className="grid grid-cols-4 gap-3">
                        <input
                          defaultValue={role.avatar}
                          className={classNames(
                            'p-2 rounded text-sm text-center',
                            'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                            'text-bolt-elements-textPrimary',
                          )}
                          placeholder="🤖"
                          onBlur={(e) => {
                            if (e.target.value !== role.avatar) {
                              handleUpdateRole(role.id, { avatar: e.target.value });
                            }
                          }}
                        />
                        <input
                          defaultValue={role.name}
                          className={classNames(
                            'col-span-3 p-2 rounded text-sm',
                            'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                            'text-bolt-elements-textPrimary',
                          )}
                          placeholder="Nom du rôle"
                          onBlur={(e) => {
                            if (e.target.value !== role.name) {
                              handleUpdateRole(role.id, { name: e.target.value });
                            }
                          }}
                        />
                      </div>
                      <input
                        defaultValue={role.description}
                        className={classNames(
                          'w-full p-2 rounded text-sm',
                          'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                          'text-bolt-elements-textPrimary',
                        )}
                        placeholder="Description"
                        onBlur={(e) => {
                          if (e.target.value !== role.description) {
                            handleUpdateRole(role.id, { description: e.target.value });
                          }
                        }}
                      />
                      <textarea
                        defaultValue={role.prompt}
                        className={classNames(
                          'w-full p-2 rounded text-sm',
                          'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                          'text-bolt-elements-textPrimary',
                          'resize-none',
                        )}
                        rows={3}
                        placeholder="Prompt du rôle"
                        onBlur={(e) => {
                          if (e.target.value !== role.prompt) {
                            handleUpdateRole(role.id, { prompt: e.target.value });
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
      {promptConfig.roles.length > 0 && (
        <div className="mt-4 p-4 bg-bolt-elements-background-depth-2 rounded-lg">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-bolt-elements-textPrimary">{promptConfig.roles.length}</div>
              <div className="text-xs text-bolt-elements-textSecondary">Total</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-500">{enabledRoles.length}</div>
              <div className="text-xs text-bolt-elements-textSecondary">Actifs</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-bolt-elements-textPrimary">
                {Math.ceil(promptConfig.roles.reduce((acc, r) => acc + r.prompt.length, 0) / 4)}
              </div>
              <div className="text-xs text-bolt-elements-textSecondary">Tokens</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-purple-500">{enabledRoles.length > 0 ? '✓' : '✗'}</div>
              <div className="text-xs text-bolt-elements-textSecondary">Spécialisé</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
