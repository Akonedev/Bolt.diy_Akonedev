import { useState, useEffect, useCallback } from 'react';

export interface SystemPrompt {
  id: string;
  name: string;
  content: string;
  enabled: boolean;
  isDefault: boolean;
}

export interface CustomPrompt {
  id: string;
  name: string;
  content: string;
  enabled: boolean;
  order: number;
  category: 'prefix' | 'suffix' | 'context';
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  command: string;
  parameters: Record<string, any>;
  enabled: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  prompt: string;
  enabled: boolean;
  avatar?: string;
}

export interface PromptConfig {
  systemPrompt: SystemPrompt;
  customPrompts: CustomPrompt[];
  tools: Tool[];
  roles: Role[];
}

const defaultConfig: PromptConfig = {
  systemPrompt: {
    id: 'default',
    name: 'Prompt Système par Défaut',
    content: `Vous êtes Bolt, un assistant IA expert et un développeur senior exceptionnel avec une vaste connaissance de multiples langages de programmation, frameworks et bonnes pratiques.

Vous devez toujours:
- Être précis et concis dans vos réponses
- Fournir du code de haute qualité
- Expliquer votre raisonnement quand nécessaire
- Respecter les bonnes pratiques de développement`,
    enabled: true,
    isDefault: true,
  },
  customPrompts: [],
  tools: [
    {
      id: 'code-review',
      name: 'Revue de Code',
      description: 'Analyse et améliore le code fourni',
      command: 'review-code',
      parameters: { focus: 'quality', suggestions: true },
      enabled: false,
    },
    {
      id: 'debug-helper',
      name: 'Assistant Debug',
      description: 'Aide à identifier et résoudre les bugs',
      command: 'debug-assist',
      parameters: { verbose: true, suggestions: true },
      enabled: false,
    },
  ],
  roles: [
    {
      id: 'developer',
      name: 'Développeur Senior',
      description: 'Expert en développement logiciel',
      prompt:
        "Vous êtes un développeur senior avec 10+ années d'expérience. Concentrez-vous sur les bonnes pratiques, l'architecture et la performance.",
      enabled: false,
    },
    {
      id: 'architect',
      name: 'Architecte Logiciel',
      description: 'Spécialiste en architecture système',
      prompt:
        'Vous êtes un architecte logiciel expert. Concentrez-vous sur la conception de systèmes scalables, les patterns architecturaux et les décisions techniques stratégiques.',
      enabled: false,
    },
  ],
};

const STORAGE_KEY = 'bolt-prompt-config';

export const usePromptManager = () => {
  const [promptConfig, setPromptConfig] = useState<PromptConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load config from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsedConfig = JSON.parse(saved);

        // Merge avec defaultConfig pour s'assurer que toutes les propriétés existent
        const mergedConfig = {
          systemPrompt: { ...defaultConfig.systemPrompt, ...parsedConfig.systemPrompt },
          customPrompts: parsedConfig.customPrompts || [],
          tools: parsedConfig.tools || defaultConfig.tools,
          roles: parsedConfig.roles || defaultConfig.roles,
        };
        setPromptConfig(mergedConfig);
        console.log('✅ Configuration chargée depuis localStorage');
      } else {
        console.log('📝 Utilisation de la configuration par défaut');
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement de la configuration:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save config to localStorage avec retry et validation
  const saveConfig = useCallback(async (config: PromptConfig) => {
    setIsSaving(true);

    try {
      // Validation de la configuration
      if (!config || typeof config !== 'object') {
        throw new Error('Configuration invalide');
      }

      const configToSave = JSON.stringify(config, null, 2);
      localStorage.setItem(STORAGE_KEY, configToSave);

      // Vérification que la sauvegarde a fonctionné
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved || JSON.parse(saved) === null) {
        throw new Error('Échec de la vérification de sauvegarde');
      }

      setPromptConfig(config);
      setLastSaved(new Date());
      console.log('✅ Configuration sauvegardée avec succès');

      // Toast de confirmation (si disponible)
      if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast('Configuration sauvegardée', 'success');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);

      // Toast d'erreur (si disponible)
      if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast('Erreur de sauvegarde', 'error');
      }
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Auto-save effect avec debouncing très court
  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        saveConfig(promptConfig);
      }, 50); // Délai ultra-court de 50ms

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [promptConfig, isLoading, saveConfig]);

  // Force save event listener
  useEffect(() => {
    const handleForceSave = () => {
      if (!isLoading) {
        saveConfig(promptConfig);
      }
    };

    window.addEventListener('bolt-force-save', handleForceSave);

    return () => window.removeEventListener('bolt-force-save', handleForceSave);
  }, [promptConfig, isLoading, saveConfig]);

  // Fonction de sauvegarde manuelle
  const saveConfigManually = useCallback(() => {
    saveConfig(promptConfig);
  }, [promptConfig, saveConfig]);

  const updatePromptConfig = useCallback(
    (updates: Partial<PromptConfig>) => {
      const newConfig = { ...promptConfig, ...updates };
      setPromptConfig(newConfig);
    },
    [promptConfig],
  );

  const updateSystemPrompt = useCallback(
    (systemPrompt: Partial<SystemPrompt>) => {
      const newConfig = {
        ...promptConfig,
        systemPrompt: { ...promptConfig.systemPrompt, ...systemPrompt },
      };
      setPromptConfig(newConfig);
    },
    [promptConfig],
  );

  const addCustomPrompt = useCallback(
    (prompt: Omit<CustomPrompt, 'id' | 'order'>) => {
      const newPrompt: CustomPrompt = {
        ...prompt,
        id: Date.now().toString(),
        order: promptConfig.customPrompts.length,
      };
      const newConfig = {
        ...promptConfig,
        customPrompts: [...promptConfig.customPrompts, newPrompt],
      };
      setPromptConfig(newConfig);
    },
    [promptConfig],
  );

  const updateCustomPrompt = useCallback(
    (id: string, updates: Partial<CustomPrompt>) => {
      const newConfig = {
        ...promptConfig,
        customPrompts: promptConfig.customPrompts.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      };
      setPromptConfig(newConfig);
    },
    [promptConfig],
  );

  const deleteCustomPrompt = useCallback(
    (id: string) => {
      const newConfig = {
        ...promptConfig,
        customPrompts: promptConfig.customPrompts.filter((p) => p.id !== id),
      };
      setPromptConfig(newConfig);
    },
    [promptConfig],
  );

  const addTool = useCallback(
    (tool: Omit<Tool, 'id'>) => {
      const newTool: Tool = {
        ...tool,
        id: Date.now().toString(),
      };
      const newConfig = {
        ...promptConfig,
        tools: [...promptConfig.tools, newTool],
      };
      setPromptConfig(newConfig);
    },
    [promptConfig],
  );

  const updateTool = useCallback(
    (id: string, updates: Partial<Tool>) => {
      const newConfig = {
        ...promptConfig,
        tools: promptConfig.tools.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      };
      setPromptConfig(newConfig);
    },
    [promptConfig],
  );

  const deleteTool = useCallback(
    (id: string) => {
      const newConfig = {
        ...promptConfig,
        tools: promptConfig.tools.filter((t) => t.id !== id),
      };
      setPromptConfig(newConfig);
    },
    [promptConfig],
  );

  const addRole = useCallback(
    (role: Omit<Role, 'id'>) => {
      const newRole: Role = {
        ...role,
        id: Date.now().toString(),
      };
      const newConfig = {
        ...promptConfig,
        roles: [...promptConfig.roles, newRole],
      };
      setPromptConfig(newConfig);
    },
    [promptConfig],
  );

  const updateRole = useCallback(
    (id: string, updates: Partial<Role>) => {
      const newConfig = {
        ...promptConfig,
        roles: promptConfig.roles.map((r) => (r.id === id ? { ...r, ...updates } : r)),
      };
      setPromptConfig(newConfig);
    },
    [promptConfig],
  );

  const deleteRole = useCallback(
    (id: string) => {
      const newConfig = {
        ...promptConfig,
        roles: promptConfig.roles.filter((r) => r.id !== id),
      };
      setPromptConfig(newConfig);
    },
    [promptConfig],
  );

  const resetToDefaults = useCallback(() => {
    setPromptConfig(defaultConfig);
  }, []);

  // Generate the final prompt for chat
  const generateFinalPrompt = useCallback((): string => {
    const parts: string[] = [];

    // Add system prompt if enabled
    if (promptConfig.systemPrompt.enabled) {
      parts.push(promptConfig.systemPrompt.content);
    }

    // Add enabled roles
    const enabledRoles = promptConfig.roles.filter((r) => r.enabled);

    if (enabledRoles.length > 0) {
      parts.push('\n--- RÔLES ACTIFS ---');
      enabledRoles.forEach((role) => {
        parts.push(`${role.name}: ${role.prompt}`);
      });
    }

    // Add custom prompts by category
    const enabledCustomPrompts = promptConfig.customPrompts.filter((p) => p.enabled).sort((a, b) => a.order - b.order);

    const prefixPrompts = enabledCustomPrompts.filter((p) => p.category === 'prefix');
    const contextPrompts = enabledCustomPrompts.filter((p) => p.category === 'context');
    const suffixPrompts = enabledCustomPrompts.filter((p) => p.category === 'suffix');

    if (prefixPrompts.length > 0) {
      parts.unshift(...prefixPrompts.map((p) => p.content));
    }

    if (contextPrompts.length > 0) {
      parts.push('\n--- CONTEXTE ADDITIONNEL ---');
      parts.push(...contextPrompts.map((p) => p.content));
    }

    if (suffixPrompts.length > 0) {
      parts.push('\n--- INSTRUCTIONS FINALES ---');
      parts.push(...suffixPrompts.map((p) => p.content));
    }

    // Add enabled tools
    const enabledTools = promptConfig.tools.filter((t) => t.enabled);

    if (enabledTools.length > 0) {
      parts.push('\n--- OUTILS DISPONIBLES ---');
      enabledTools.forEach((tool) => {
        parts.push(`${tool.name}: ${tool.description}`);
      });
    }

    return parts.join('\n\n');
  }, [promptConfig]);

  return {
    promptConfig,
    isLoading,
    isSaving,
    lastSaved,
    updatePromptConfig,
    updateSystemPrompt,
    addCustomPrompt,
    updateCustomPrompt,
    deleteCustomPrompt,
    addTool,
    updateTool,
    deleteTool,
    addRole,
    updateRole,
    deleteRole,
    resetToDefaults,
    generateFinalPrompt,
    saveConfigManually,
  };
};
