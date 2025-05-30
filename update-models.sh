#!/bin/bash

echo "★═══════════════════════════════════════★"
echo "   Mise à jour des Modèles - Bolt.DIY"
echo "★═══════════════════════════════════════★"
echo ""

echo "🔄 Mise à jour des modèles statiques avec les derniers disponibles..."

# Fonction pour sauvegarder et restaurer
backup_file() {
    local file=$1
    cp "$file" "$file.backup.$(date +%Y%m%d_%H%M%S)"
    echo "📦 Sauvegarde créée : $file.backup.$(date +%Y%m%d_%H%M%S)"
}

echo ""
echo "📋 Mise à jour des modèles OpenAI..."

# Backup et mise à jour OpenAI
backup_file "app/lib/modules/llm/providers/openai.ts"

cat > app/lib/modules/llm/providers/openai.ts << 'EOF'
import { BaseProvider } from '~/lib/modules/llm/base-provider';
import type { ModelInfo } from '~/lib/modules/llm/types';
import type { IProviderSetting } from '~/types/model';
import type { LanguageModelV1 } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export default class OpenAIProvider extends BaseProvider {
  name = 'OpenAI';
  getApiKeyLink = 'https://platform.openai.com/api-keys';

  config = {
    apiTokenKey: 'OPENAI_API_KEY',
  };

  staticModels: ModelInfo[] = [
    // Modèles o3 (derniers)
    { name: 'o3-mini', label: 'o3-mini (Latest)', provider: 'OpenAI', maxTokenAllowed: 128000 },
    { name: 'o3', label: 'o3 (Latest)', provider: 'OpenAI', maxTokenAllowed: 128000 },
    
    // Modèles o1 
    { name: 'o1', label: 'o1 (Latest)', provider: 'OpenAI', maxTokenAllowed: 128000 },
    { name: 'o1-mini', label: 'o1-mini', provider: 'OpenAI', maxTokenAllowed: 128000 },
    { name: 'o1-preview', label: 'o1-preview', provider: 'OpenAI', maxTokenAllowed: 128000 },
    
    // GPT-4o series (latest)
    { name: 'gpt-4o', label: 'GPT-4o (Latest)', provider: 'OpenAI', maxTokenAllowed: 128000 },
    { name: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI', maxTokenAllowed: 128000 },
    { name: 'gpt-4o-2024-11-20', label: 'GPT-4o (Nov 2024)', provider: 'OpenAI', maxTokenAllowed: 128000 },
    { name: 'gpt-4o-2024-08-06', label: 'GPT-4o (Aug 2024)', provider: 'OpenAI', maxTokenAllowed: 128000 },
    
    // GPT-4 Turbo
    { name: 'gpt-4-turbo', label: 'GPT-4 Turbo (Latest)', provider: 'OpenAI', maxTokenAllowed: 128000 },
    { name: 'gpt-4-turbo-2024-04-09', label: 'GPT-4 Turbo (Apr 2024)', provider: 'OpenAI', maxTokenAllowed: 128000 },
    
    // ChatGPT models
    { name: 'chatgpt-4o-latest', label: 'ChatGPT-4o (Latest)', provider: 'OpenAI', maxTokenAllowed: 128000 },
    
    // GPT-3.5 (legacy but still useful)
    { name: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'OpenAI', maxTokenAllowed: 16385 },
  ];

  async getDynamicModels(
    apiKeys?: Record<string, string>,
    settings?: IProviderSetting,
    serverEnv?: Record<string, string>,
  ): Promise<ModelInfo[]> {
    const { apiKey } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: settings,
      serverEnv: serverEnv as any,
      defaultBaseUrlKey: '',
      defaultApiTokenKey: 'OPENAI_API_KEY',
    });

    if (!apiKey) {
      throw `Missing Api Key configuration for ${this.name} provider`;
    }

    try {
      const response = await fetch(`https://api.openai.com/v1/models`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const res = (await response.json()) as any;
      const staticModelIds = this.staticModels.map((m) => m.name);

      const data = res.data.filter(
        (model: any) =>
          model.object === 'model' &&
          (model.id.startsWith('gpt-') || 
           model.id.startsWith('o1') || 
           model.id.startsWith('o3') ||
           model.id.startsWith('chatgpt-') ||
           model.id.startsWith('davinci-') ||
           model.id.startsWith('text-')) &&
          !staticModelIds.includes(model.id),
      );

      return data.map((m: any) => ({
        name: m.id,
        label: `${m.id} (API)`,
        provider: this.name,
        maxTokenAllowed: this.getContextLength(m.id),
      }));
    } catch (error) {
      console.error('Error fetching OpenAI models:', error);
      return [];
    }
  }

  private getContextLength(modelId: string): number {
    if (modelId.includes('o3') || modelId.includes('o1')) return 128000;
    if (modelId.includes('gpt-4o') || modelId.includes('gpt-4-turbo')) return 128000;
    if (modelId.includes('gpt-4')) return 32768;
    if (modelId.includes('gpt-3.5')) return 16385;
    return 8192;
  }

  getModelInstance(options: {
    model: string;
    serverEnv: Env;
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }): LanguageModelV1 {
    const { model, serverEnv, apiKeys, providerSettings } = options;

    const { apiKey } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: providerSettings?.[this.name],
      serverEnv: serverEnv as any,
      defaultBaseUrlKey: '',
      defaultApiTokenKey: 'OPENAI_API_KEY',
    });

    if (!apiKey) {
      throw new Error(`Missing API key for ${this.name} provider`);
    }

    const openai = createOpenAI({
      apiKey,
    });

    return openai(model);
  }
}
EOF

echo "✅ OpenAI mis à jour avec o3, o1, et GPT-4o latest"

echo ""
echo "📋 Mise à jour des modèles Anthropic..."

# Backup et mise à jour Anthropic
backup_file "app/lib/modules/llm/providers/anthropic.ts"

cat > app/lib/modules/llm/providers/anthropic.ts << 'EOF'
import { BaseProvider } from '~/lib/modules/llm/base-provider';
import type { ModelInfo } from '~/lib/modules/llm/types';
import type { LanguageModelV1 } from 'ai';
import type { IProviderSetting } from '~/types/model';
import { createAnthropic } from '@ai-sdk/anthropic';

export default class AnthropicProvider extends BaseProvider {
  name = 'Anthropic';
  getApiKeyLink = 'https://console.anthropic.com/settings/keys';

  config = {
    apiTokenKey: 'ANTHROPIC_API_KEY',
  };

  staticModels: ModelInfo[] = [
    // Claude 3.7 (latest)
    {
      name: 'claude-3-7-sonnet-20250219',
      label: 'Claude 3.7 Sonnet (Latest)',
      provider: 'Anthropic',
      maxTokenAllowed: 200000,
    },
    
    // Claude 3.5 Sonnet
    {
      name: 'claude-3-5-sonnet-latest',
      label: 'Claude 3.5 Sonnet (Latest)',
      provider: 'Anthropic',
      maxTokenAllowed: 200000,
    },
    {
      name: 'claude-3-5-sonnet-20241022',
      label: 'Claude 3.5 Sonnet (Oct 2024)',
      provider: 'Anthropic',
      maxTokenAllowed: 200000,
    },
    {
      name: 'claude-3-5-sonnet-20240620',
      label: 'Claude 3.5 Sonnet (Jun 2024)',
      provider: 'Anthropic',
      maxTokenAllowed: 200000,
    },
    
    // Claude 3.5 Haiku
    {
      name: 'claude-3-5-haiku-latest',
      label: 'Claude 3.5 Haiku (Latest)',
      provider: 'Anthropic',
      maxTokenAllowed: 200000,
    },
    {
      name: 'claude-3-5-haiku-20241022',
      label: 'Claude 3.5 Haiku (Oct 2024)',
      provider: 'Anthropic',
      maxTokenAllowed: 200000,
    },
    
    // Claude 3 Opus
    { 
      name: 'claude-3-opus-latest', 
      label: 'Claude 3 Opus (Latest)', 
      provider: 'Anthropic', 
      maxTokenAllowed: 200000 
    },
    { 
      name: 'claude-3-opus-20240229', 
      label: 'Claude 3 Opus (Feb 2024)', 
      provider: 'Anthropic', 
      maxTokenAllowed: 200000 
    },
    
    // Claude 3 Sonnet  
    { 
      name: 'claude-3-sonnet-20240229', 
      label: 'Claude 3 Sonnet', 
      provider: 'Anthropic', 
      maxTokenAllowed: 200000 
    },
    
    // Claude 3 Haiku
    { 
      name: 'claude-3-haiku-20240307', 
      label: 'Claude 3 Haiku', 
      provider: 'Anthropic', 
      maxTokenAllowed: 200000 
    },
  ];

  async getDynamicModels(
    apiKeys?: Record<string, string>,
    settings?: IProviderSetting,
    serverEnv?: Record<string, string>,
  ): Promise<ModelInfo[]> {
    const { apiKey } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: settings,
      serverEnv: serverEnv as any,
      defaultBaseUrlKey: '',
      defaultApiTokenKey: 'ANTHROPIC_API_KEY',
    });

    if (!apiKey) {
      throw `Missing Api Key configuration for ${this.name} provider`;
    }

    try {
      const response = await fetch(`https://api.anthropic.com/v1/models`, {
        headers: {
          'x-api-key': `${apiKey}`,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
      });

      const res = (await response.json()) as any;
      const staticModelIds = this.staticModels.map((m) => m.name);

      const data = res.data.filter((model: any) => 
        model.type === 'model' && 
        !staticModelIds.includes(model.id)
      );

      return data.map((m: any) => ({
        name: m.id,
        label: `${m.display_name} (API)`,
        provider: this.name,
        maxTokenAllowed: 200000,
      }));
    } catch (error) {
      console.error('Error fetching Anthropic models:', error);
      return [];
    }
  }

  getModelInstance: (options: {
    model: string;
    serverEnv: Env;
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }) => LanguageModelV1 = (options) => {
    const { apiKeys, providerSettings, serverEnv, model } = options;
    const { apiKey } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings,
      serverEnv: serverEnv as any,
      defaultBaseUrlKey: '',
      defaultApiTokenKey: 'ANTHROPIC_API_KEY',
    });
    const anthropic = createAnthropic({
      apiKey,
      headers: { 'anthropic-beta': 'output-128k-2025-02-19' },
    });

    return anthropic(model);
  };
}
EOF

echo "✅ Anthropic mis à jour avec Claude 3.7 et versions récentes"

echo ""
echo "📋 Amélioration de Ollama pour récupération dynamique..."

# Mise à jour Ollama pour récupération dynamique
if [ -f "app/lib/modules/llm/providers/ollama.ts" ]; then
    backup_file "app/lib/modules/llm/providers/ollama.ts"
    
    # On va améliorer Ollama pour qu'il récupère automatiquement les modèles installés
    echo "✅ Ollama sera mis à jour séparément"
fi

echo ""
echo "🎯 Résumé des améliorations :"
echo "   ✅ OpenAI : o3, o1, GPT-4o latest"
echo "   ✅ Anthropic : Claude 3.7, versions récentes"
echo "   ✅ Récupération dynamique améliorée"
echo "   ✅ Sauvegardes créées"
echo ""
echo "🔄 Redémarrez l'application pour voir les nouveaux modèles !"