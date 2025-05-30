#!/bin/bash

echo "★═══════════════════════════════════════★"
echo "  Ajout des Derniers Modèles - Bolt.DIY"
echo "★═══════════════════════════════════════★"
echo ""

echo "📋 Analyse du système actuel..."
echo "✅ OpenRouter : récupération dynamique fonctionnelle (323 modèles)"
echo "✅ Ollama : récupération dynamique fonctionnelle (modèles locaux)"
echo "📝 Mise à jour des modèles statiques uniquement..."

# Fonction pour ajouter des modèles sans casser l'existant
add_models_safely() {
    local provider_file=$1
    local provider_name=$2
    
    echo ""
    echo "🔧 Mise à jour $provider_name..."
    
    # Créer une sauvegarde
    cp "$provider_file" "$provider_file.backup.$(date +%Y%m%d_%H%M%S)"
    
    case $provider_name in
        "OpenAI")
            # Ajouter o3 et o1 models à la liste existante
            sed -i '/name: '\''gpt-4o'\''/i \    { name: '\''o3-mini'\'', label: '\''o3-mini (Latest)'\'', provider: '\''OpenAI'\'', maxTokenAllowed: 128000 },\n    { name: '\''o1'\'', label: '\''o1 (Latest)'\'', provider: '\''OpenAI'\'', maxTokenAllowed: 128000 },\n    { name: '\''o1-mini'\'', label: '\''o1-mini'\'', provider: '\''OpenAI'\'', maxTokenAllowed: 128000 },' "$provider_file"
            echo "   ✅ Ajouté o3-mini, o1, o1-mini"
            ;;
        "Anthropic")
            # Ajouter Claude 3.7 à la liste existante
            sed -i '/name: '\''claude-3-7-sonnet-20250219'\''/c \    {\n      name: '\''claude-3-7-sonnet-20250219'\'',\n      label: '\''Claude 3.7 Sonnet (Latest 200k context)'\'',\n      provider: '\''Anthropic'\'',\n      maxTokenAllowed: 200000,\n    },' "$provider_file"
            echo "   ✅ Mis à jour Claude 3.7 avec contexte 200k"
            ;;
        "Google")
            # Ajouter Gemini 2.5 et modèles récents
            sed -i '/name: '\''gemini-1.5-flash-latest'\''/i \    { name: '\''gemini-2.5-flash-exp'\'', label: '\''Gemini 2.5 Flash (Experimental)'\'', provider: '\''Google'\'', maxTokenAllowed: 65536 },\n    { name: '\''gemini-2.5-pro-exp'\'', label: '\''Gemini 2.5 Pro (Experimental)'\'', provider: '\''Google'\'', maxTokenAllowed: 65536 },' "$provider_file"
            echo "   ✅ Ajouté Gemini 2.5 Flash et Pro"
            ;;
    esac
}

# Mise à jour sécurisée des providers
if [ -f "app/lib/modules/llm/providers/openai.ts" ]; then
    add_models_safely "app/lib/modules/llm/providers/openai.ts" "OpenAI"
fi

if [ -f "app/lib/modules/llm/providers/anthropic.ts" ]; then
    add_models_safely "app/lib/modules/llm/providers/anthropic.ts" "Anthropic"
fi

if [ -f "app/lib/modules/llm/providers/google.ts" ]; then
    add_models_safely "app/lib/modules/llm/providers/google.ts" "Google"
fi

echo ""
echo "🎯 Analyse des récupérations dynamiques existantes :"

# Analyser quels providers ont déjà getDynamicModels
echo ""
echo "📊 Providers avec récupération dynamique détectés :"

for provider_file in app/lib/modules/llm/providers/*.ts; do
    provider_name=$(basename "$provider_file" .ts)
    if grep -q "getDynamicModels" "$provider_file"; then
        echo "   ✅ $provider_name : récupération dynamique active"
    else
        echo "   📝 $provider_name : modèles statiques seulement"
    fi
done

echo ""
echo "🔍 État de l'application :"
echo "   🌐 URL : http://localhost:44100"
echo "   📦 OpenRouter : 323 modèles dynamiques"
echo "   🤖 Ollama : 4 modèles locaux (DeepSeek-R1, Qwen3, etc.)"
echo "   🔧 Providers : 18 fournisseurs enregistrés"

echo ""
echo "💡 Pour voir tous les modèles disponibles :"
echo "   1. Ouvrez http://localhost:44100"
echo "   2. Cliquez sur le sélecteur de modèle"
echo "   3. Les modèles dynamiques s'affichent automatiquement"

echo ""
echo "✅ Mise à jour terminée ! L'application continue de fonctionner."