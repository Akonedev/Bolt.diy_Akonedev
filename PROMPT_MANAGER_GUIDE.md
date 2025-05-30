# 🎯 Guide Complet du Gestionnaire de Prompts - Bolt.DIY

## 📋 Vue d'Ensemble

Le **Gestionnaire de Prompts** est un système complet permettant de personnaliser entièrement le comportement de l'IA dans Bolt.DIY. Il vous donne un contrôle total sur :

- ✅ **Prompts Système** : Modifiez le comportement de base
- ✅ **Prompts Personnalisés** : Ajoutez des instructions spécifiques
- ✅ **Outils** : Définissez des capacités additionnelles
- ✅ **Rôles** : Spécialisez l'IA selon vos besoins

## 🚀 Accès au Gestionnaire

### Via l'Interface Web
1. Ouvrez **http://localhost:44100**
2. Cliquez sur l'icône **Paramètres** (⚙️)
3. Allez dans l'onglet **Features**
4. Dans la section **"Gestion des Prompts"**
5. Cliquez sur **"Prompt Manager"**

## 🔧 Fonctionnalités Principales

### 1. 🛠️ Prompt Système
**Objectif** : Définir le comportement de base de l'IA

**Fonctionnalités** :
- ✅ Modification du prompt système existant
- ✅ Remplacement par un prompt totalement personnalisé
- ✅ Sélection parmi les templates prédéfinis
- ✅ Statistiques (caractères, mots, tokens)
- ✅ Activation/Désactivation

**Exemple d'usage** :
```
Vous êtes un expert en développement web avec une spécialisation 
en React et TypeScript. Concentrez-vous sur la qualité du code, 
les bonnes pratiques et la performance.
```

### 2. 📝 Prompts Personnalisés
**Objectif** : Ajouter des instructions spécifiques en complément

**Types de prompts** :
- **Préfixe** : Ajouté AVANT le prompt système
- **Contexte** : Ajouté APRÈS le prompt système
- **Instructions finales** : Ajouté à la fin de tous les prompts

**Exemples d'usage** :
```
Contexte: "Toujours expliquer le code étape par étape"
Préfixe: "Vous travaillez sur un projet e-commerce"
Suffix: "Testez toujours votre code avant de le proposer"
```

### 3. 🔧 Gestionnaire d'Outils
**Objectif** : Définir des capacités spécialisées pour l'IA

**Outils prédéfinis disponibles** :
- ✅ **Analyse de Code** : Détection de problèmes et suggestions
- ✅ **Générateur de Tests** : Tests unitaires automatiques
- ✅ **Documentation Auto** : Génération de documentation
- ✅ **Optimiseur de Performance** : Analyse et optimisation
- ✅ **Validateur de Sécurité** : Vérification des vulnérabilités

**Personnalisation** :
- Créez vos propres outils
- Définissez commandes et paramètres
- Activation/Désactivation individuelle

### 4. 👤 Gestionnaire de Rôles
**Objectif** : Spécialiser l'IA selon différents domaines d'expertise

**Rôles prédéfinis disponibles** :
- 👨‍💻 **Développeur Senior** : Expert développement
- 🏗️ **Architecte Logiciel** : Conception système
- ⚙️ **Expert DevOps** : Infrastructure et déploiement
- 🔒 **Expert Sécurité** : Cybersécurité
- 📊 **Product Manager** : Gestion de produit
- 🎨 **Designer UX/UI** : Expérience utilisateur

**Fonctionnalités** :
- Activation simultanée de plusieurs rôles
- Avatar personnalisé pour chaque rôle
- Prompts spécialisés par domaine

## 🎮 Guide d'Utilisation Pratique

### Scénario 1 : Développement Frontend
```
1. Activez le rôle "Développeur Senior"
2. Ajoutez un prompt contexte : "Focus sur React et TypeScript"
3. Activez l'outil "Analyse de Code"
4. Résultat : IA spécialisée en frontend avec analyse automatique
```

### Scénario 2 : Architecture de Système
```
1. Activez le rôle "Architecte Logiciel"
2. Ajoutez un prompt contexte : "Système e-commerce haute performance"
3. Activez l'outil "Optimiseur de Performance"
4. Résultat : IA experte en architecture scalable
```

### Scénario 3 : Audit de Sécurité
```
1. Activez le rôle "Expert Sécurité"
2. Ajoutez un prompt suffix : "Toujours vérifier les vulnérabilités OWASP"
3. Activez l'outil "Validateur de Sécurité"
4. Résultat : IA focalisée sur la sécurité applicative
```

## 📊 Interface de Configuration

### Panneau de Statistiques
- **Prompt Système** : Activé/Désactivé
- **Prompts Personnalisés** : Nombre actifs
- **Outils** : Nombre actifs
- **Rôles** : Nombre actifs
- **Tokens totaux** : Estimation de consommation

### Indicateur de Configuration Active
Dans l'interface de chat, un bandeau violet s'affiche automatiquement quand des personnalisations sont actives :

```
🪄 Configuration Active • 3 améliorations
👨‍💻 Développeur Senior • 2 outils actifs • 1 prompt personnalisé
```

## ⚡ Avantages du Système

### 🎯 Précision Améliorée
- Réponses adaptées à votre contexte spécifique
- Expertise ciblée selon le domaine
- Instructions précises et constantes

### 🔄 Flexibilité Maximale
- Activation/désactivation en temps réel
- Combinaison de plusieurs rôles
- Personnalisation complète du comportement

### 💾 Persistance
- Configuration sauvegardée automatiquement
- Réutilisation entre sessions
- Export/Import des configurations (futur)

## 🔧 Configuration Technique

### Stockage Local
- Configuration sauvée dans `localStorage`
- Clé : `bolt-prompt-config`
- Format JSON structuré

### Intégration Chat
- Application automatique des prompts actifs
- Génération dynamique du prompt final
- Affichage de la configuration en cours

### Performance
- Calcul optimisé des tokens
- Mise en cache des configurations
- Rechargement intelligent

## 📝 Exemples de Prompts Efficaces

### Prompt Système Personnalisé
```
Vous êtes un assistant IA expert spécialisé dans le développement 
d'applications web modernes. Vous excellez en :

- React, TypeScript, Node.js
- Architecture clean et patterns
- Performance et optimisation
- Tests et qualité de code
- DevOps et déploiement

Règles importantes :
1. Toujours fournir du code production-ready
2. Expliquer les décisions techniques
3. Considérer la scalabilité
4. Inclure la gestion d'erreurs
5. Proposer des alternatives quand pertinent
```

### Prompt Contexte Projet
```
CONTEXTE DU PROJET :
- Application e-commerce B2C
- Stack : React + TypeScript + Node.js
- Base de données : PostgreSQL
- Déploiement : Docker + AWS
- Équipe : 5 développeurs
- Timeline : 3 mois

Priorités :
1. Performance (temps de chargement < 2s)
2. Sécurité (PCI DSS compliance)
3. Scalabilité (10k utilisateurs simultanés)
4. SEO et accessibilité
```

### Prompt Instructions Finales
```
AVANT DE RÉPONDRE :
1. ✅ Vérifiez la cohérence avec l'architecture existante
2. ✅ Considérez l'impact sur les performances
3. ✅ Incluez les tests nécessaires
4. ✅ Documentez les parties complexes
5. ✅ Proposez des améliorations si possible

FORMAT DE RÉPONSE :
- Code complet (pas de placeholders)
- Explication des choix techniques
- Tests et validation
- Points d'attention
```

## 🚀 Conseils d'Optimisation

### Gestion des Tokens
- Surveillez le compteur de tokens
- Évitez les prompts redondants
- Utilisez des instructions concises mais précises

### Combinaison Efficace
- Maximum 2-3 rôles simultanés
- Prompts complémentaires, pas contradictoires
- Outils cohérents avec les rôles choisis

### Évolution Progressive
1. Commencez avec les rôles prédéfinis
2. Ajoutez des prompts contexte simples
3. Créez vos outils personnalisés
4. Développez des rôles sur mesure

## 🔄 Mise à Jour et Maintenance

### Sauvegarde de Configuration
```bash
# Exportez votre configuration depuis localStorage
# (Fonctionnalité d'export/import en développement)
```

### Réinitialisation
- Bouton "Réinitialiser" dans l'interface
- Retour aux paramètres par défaut
- Conservation des prompts personnalisés

## 🎉 Conclusion

Le **Gestionnaire de Prompts** transforme Bolt.DIY en un assistant IA véritablement personnalisé. Avec ce système :

✅ **Productivité maximale** : Réponses adaptées à vos besoins exacts
✅ **Expertise ciblée** : IA spécialisée selon votre domaine
✅ **Contrôle total** : Maîtrise complète du comportement
✅ **Évolutivité** : Système qui grandit avec vos besoins

---

🎯 **Prêt à commencer ?** Ouvrez le Gestionnaire de Prompts et créez votre première configuration !

📍 **URL** : http://localhost:44100 → Paramètres → Features → Prompt Manager