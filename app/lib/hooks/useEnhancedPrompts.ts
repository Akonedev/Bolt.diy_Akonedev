import { usePromptManager } from './usePromptManager';
import { PromptLibrary } from '~/lib/common/prompt-library';
import { useSettings } from './useSettings';

/**
 * Hook qui combine le système de prompts personnalisés avec le système existant
 */
export const useEnhancedPrompts = () => {
  const { promptConfig, generateFinalPrompt } = usePromptManager();
  const { promptId } = useSettings();

  /**
   * Génère le prompt final en combinant:
   * 1. Le prompt système (legacy ou personnalisé)
   * 2. Les prompts personnalisés actifs
   * 3. Les rôles actifs
   * 4. Les outils actifs
   */
  const getEnhancedSystemPrompt = (options: {
    cwd: string;
    allowedHtmlElements: string[];
    modificationTagName: string;
    supabase?: any;
  }): string => {
    const parts: string[] = [];

    // 1. Si le système de prompts personnalisés est utilisé ET activé
    if (promptConfig.systemPrompt.enabled && !promptConfig.systemPrompt.isDefault) {
      parts.push(promptConfig.systemPrompt.content);
    } else {
      // 2. Sinon, utiliser le système legacy
      try {
        const legacyPrompt = PromptLibrary.getPropmtFromLibrary(promptId || 'default', options);
        parts.push(legacyPrompt);
      } catch (error) {
        console.error('Error loading legacy prompt:', error);
        parts.push(promptConfig.systemPrompt.content); // Fallback
      }
    }

    // 3. Ajouter les éléments personnalisés si ils existent
    const customPrompts = promptConfig.customPrompts.filter(p => p.enabled);
    const activeRoles = promptConfig.roles.filter(r => r.enabled);
    const activeTools = promptConfig.tools.filter(t => t.enabled);

    if (customPrompts.length > 0 || activeRoles.length > 0 || activeTools.length > 0) {
      const customContent = generateFinalPrompt();
      
      // Éviter la duplication du prompt système
      const customLines = customContent.split('\n').filter(line => {
        const trimmed = line.trim();
        return trimmed && !parts.some(part => part.includes(trimmed));
      });

      if (customLines.length > 0) {
        parts.push('\n--- PERSONNALISATIONS ACTIVES ---');
        parts.push(customLines.join('\n'));
      }
    }

    return parts.join('\n\n');
  };

  /**
   * Récupère les informations sur la configuration actuelle
   */
  const getPromptInfo = () => {
    const enabledCustomPrompts = promptConfig.customPrompts.filter(p => p.enabled);
    const enabledRoles = promptConfig.roles.filter(r => r.enabled);
    const enabledTools = promptConfig.tools.filter(t => t.enabled);

    return {
      isUsingCustomSystem: promptConfig.systemPrompt.enabled && !promptConfig.systemPrompt.isDefault,
      customPromptsCount: enabledCustomPrompts.length,
      activeRoles: enabledRoles.map(r => ({ name: r.name, avatar: r.avatar })),
      activeTools: enabledTools.map(t => ({ name: t.name, description: t.description })),
      totalEnhancements: enabledCustomPrompts.length + enabledRoles.length + enabledTools.length,
    };
  };

  /**
   * Génère un résumé de la configuration pour affichage dans l'UI
   */
  const getConfigSummary = (): string => {
    const info = getPromptInfo();
    const summaryParts: string[] = [];

    if (info.isUsingCustomSystem) {
      summaryParts.push('Prompt système personnalisé');
    } else {
      summaryParts.push(`Template: ${promptId}`);
    }

    if (info.activeRoles.length > 0) {
      summaryParts.push(`${info.activeRoles.length} rôle(s): ${info.activeRoles.map(r => `${r.avatar} ${r.name}`).join(', ')}`);
    }

    if (info.customPromptsCount > 0) {
      summaryParts.push(`${info.customPromptsCount} prompt(s) personnalisé(s)`);
    }

    if (info.activeTools.length > 0) {
      summaryParts.push(`${info.activeTools.length} outil(s) actif(s)`);
    }

    return summaryParts.join(' • ');
  };

  /**
   * Vérifie si des améliorations sont actives
   */
  const hasEnhancements = (): boolean => {
    return getPromptInfo().totalEnhancements > 0 || getPromptInfo().isUsingCustomSystem;
  };

  return {
    getEnhancedSystemPrompt,
    getPromptInfo,
    getConfigSummary,
    hasEnhancements,
    promptConfig,
  };
};