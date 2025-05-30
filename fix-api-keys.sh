#!/bin/bash

echo "★═══════════════════════════════════════★"
echo "    Configuration des Clés API - Bolt.DIY"
echo "★═══════════════════════════════════════★"
echo ""

echo "🔧 Le problème : la clé OpenRouter semble expirée ou invalide"
echo ""
echo "📋 Solutions disponibles :"
echo "   1. Utiliser Ollama en local (gratuit)"
echo "   2. Obtenir une nouvelle clé OpenRouter"
echo "   3. Configurer d'autres providers gratuits"
echo ""

# Option 1: Configuration Ollama
echo "🔄 Configuration pour utiliser Ollama (local, gratuit)..."

# Mettre à jour le .env.local avec Ollama comme provider principal
cat > .env.local << 'EOF'
# Configuration Docker pour Bolt.DIY - Ollama Local
# Ports personnalisés
PORT=44100
VITE_PORT=44100
PREVIEW_PORT=44200

# Configuration de base
VITE_LOG_LEVEL=debug
DEFAULT_NUM_CTX=32768
RUNNING_IN_DOCKER=true

# Provider principal : Ollama (local)
OLLAMA_API_BASE_URL=http://host.docker.internal:11434

# Clés API optionnelles (laissez vide si non utilisées)
GROQ_API_KEY=
HuggingFace_API_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
OPEN_ROUTER_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
XAI_API_KEY=
TOGETHER_API_KEY=
TOGETHER_API_BASE_URL=
DEEPSEEK_API_KEY=
MISTRAL_API_KEY=
COHERE_API_KEY=
LMSTUDIO_API_BASE_URL=
PERPLEXITY_API_KEY=
HYPERBOLIC_API_KEY=
HYPERBOLIC_API_BASE_URL=
OPENAI_LIKE_API_BASE_URL=
OPENAI_LIKE_API_KEY=
AWS_BEDROCK_CONFIG=

# Configuration Docker spécifique
WRANGLER_SEND_METRICS=false
EOF

echo "✅ Configuration mise à jour pour utiliser Ollama"
echo ""
echo "📦 Pour installer Ollama si pas encore fait :"
echo "   curl -fsSL https://ollama.ai/install.sh | sh"
echo "   ollama pull llama2"  # ou un autre modèle
echo ""
echo "🚀 Pour démarrer avec Docker maintenant :"
echo "   docker-compose up app-dev"
echo ""
echo "ℹ️  L'application se connectera à Ollama sur votre machine hôte"
echo "   Assurez-vous qu'Ollama est démarré avec : ollama serve"