// Remove unused imports
import React, { memo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '~/components/ui/Switch';
import { useSettings } from '~/lib/hooks/useSettings';
import { classNames } from '~/utils/classNames';
import { toast } from 'react-toastify';
import { PromptLibrary } from '~/lib/common/prompt-library';
import { PromptManagerCard } from './PromptManagerCard';
import { ThemeManagerCard } from './ThemeManagerCard';
import { PromptManager } from '~/components/prompt-manager/PromptManager';
import { ThemeManager } from '~/components/theme-manager/ThemeManager';

interface FeatureToggle {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
  beta?: boolean;
  experimental?: boolean;
  tooltip?: string;
}

const FeatureCard = memo(
  ({
    feature,
    index,
    onToggle,
  }: {
    feature: FeatureToggle;
    index: number;
    onToggle: (id: string, enabled: boolean) => void;
  }) => (
    <motion.div
      key={feature.id}
      layoutId={feature.id}
      className={classNames(
        'relative group cursor-pointer',
        'bg-bolt-elements-background-depth-2',
        'hover:bg-bolt-elements-background-depth-3',
        'transition-colors duration-200',
        'rounded-lg overflow-hidden',
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={classNames(feature.icon, 'w-5 h-5 text-bolt-elements-textSecondary')} />
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-bolt-elements-textPrimary">{feature.title}</h4>
              {feature.beta && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-500 font-medium">Beta</span>
              )}
              {feature.experimental && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-orange-500/10 text-orange-500 font-medium">
                  Experimental
                </span>
              )}
            </div>
          </div>
          <Switch checked={feature.enabled} onCheckedChange={(checked) => onToggle(feature.id, checked)} />
        </div>
        <p className="mt-2 text-sm text-bolt-elements-textSecondary">{feature.description}</p>
        {feature.tooltip && <p className="mt-1 text-xs text-bolt-elements-textTertiary">{feature.tooltip}</p>}
      </div>
    </motion.div>
  ),
);

const FeatureSection = memo(
  ({
    title,
    features,
    icon,
    description,
    onToggleFeature,
  }: {
    title: string;
    features: FeatureToggle[];
    icon: string;
    description: string;
    onToggleFeature: (id: string, enabled: boolean) => void;
  }) => (
    <motion.div
      layout
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div className={classNames(icon, 'text-xl text-purple-500')} />
        <div>
          <h3 className="text-lg font-medium text-bolt-elements-textPrimary">{title}</h3>
          <p className="text-sm text-bolt-elements-textSecondary">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} feature={feature} index={index} onToggle={onToggleFeature} />
        ))}
      </div>
    </motion.div>
  ),
);

export default function FeaturesTab() {
  const {
    autoSelectTemplate,
    isLatestBranch,
    contextOptimizationEnabled,
    eventLogs,
    setAutoSelectTemplate,
    enableLatestBranch,
    enableContextOptimization,
    setEventLogs,
    setPromptId,
    promptId,
  } = useSettings();

  const [showPromptManager, setShowPromptManager] = useState(false);
  const [showThemeManager, setShowThemeManager] = useState(false);

  // Enable features by default on first load
  React.useEffect(() => {
    // Only set defaults if values are undefined
    if (isLatestBranch === undefined) {
      enableLatestBranch(false); // Default: OFF - Don't auto-update from main branch
    }

    if (contextOptimizationEnabled === undefined) {
      enableContextOptimization(true); // Default: ON - Enable context optimization
    }

    if (autoSelectTemplate === undefined) {
      setAutoSelectTemplate(true); // Default: ON - Enable auto-select templates
    }

    if (promptId === undefined) {
      setPromptId('default'); // Default: 'default'
    }

    if (eventLogs === undefined) {
      setEventLogs(true); // Default: ON - Enable event logging
    }
  }, []); // Only run once on component mount

  const handleToggleFeature = useCallback(
    (id: string, enabled: boolean) => {
      switch (id) {
        case 'latestBranch': {
          enableLatestBranch(enabled);
          toast.success(`Main branch updates ${enabled ? 'enabled' : 'disabled'}`);
          break;
        }

        case 'autoSelectTemplate': {
          setAutoSelectTemplate(enabled);
          toast.success(`Auto select template ${enabled ? 'enabled' : 'disabled'}`);
          break;
        }

        case 'contextOptimization': {
          enableContextOptimization(enabled);
          toast.success(`Context optimization ${enabled ? 'enabled' : 'disabled'}`);
          break;
        }

        case 'eventLogs': {
          setEventLogs(enabled);
          toast.success(`Event logging ${enabled ? 'enabled' : 'disabled'}`);
          break;
        }

        default:
          break;
      }
    },
    [enableLatestBranch, setAutoSelectTemplate, enableContextOptimization, setEventLogs],
  );

  const features = {
    stable: [
      {
        id: 'latestBranch',
        title: 'Main Branch Updates',
        description: 'Get the latest updates from the main branch',
        icon: 'i-ph:git-branch',
        enabled: isLatestBranch,
        tooltip: 'Enabled by default to receive updates from the main development branch',
      },
      {
        id: 'autoSelectTemplate',
        title: 'Auto Select Template',
        description: 'Automatically select starter template',
        icon: 'i-ph:selection',
        enabled: autoSelectTemplate,
        tooltip: 'Enabled by default to automatically select the most appropriate starter template',
      },
      {
        id: 'contextOptimization',
        title: 'Context Optimization',
        description: 'Optimize context for better responses',
        icon: 'i-ph:brain',
        enabled: contextOptimizationEnabled,
        tooltip: 'Enabled by default for improved AI responses',
      },
      {
        id: 'eventLogs',
        title: 'Event Logging',
        description: 'Enable detailed event logging and history',
        icon: 'i-ph:list-bullets',
        enabled: eventLogs,
        tooltip: 'Enabled by default to record detailed logs of system events and user actions',
      },
    ],
    beta: [],
  };

  return (
    <div className="flex flex-col gap-8">
      <FeatureSection
        title="Core Features"
        features={features.stable}
        icon="i-ph:check-circle"
        description="Essential features that are enabled by default for optimal performance"
        onToggleFeature={handleToggleFeature}
      />

      {features.beta.length > 0 && (
        <FeatureSection
          title="Beta Features"
          features={features.beta}
          icon="i-ph:test-tube"
          description="New features that are ready for testing but may have some rough edges"
          onToggleFeature={handleToggleFeature}
        />
      )}

      {/* Customization Section */}
      <motion.div
        layout
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <div className="i-ph:palette text-xl text-purple-500" />
          <div>
            <h3 className="text-lg font-medium text-bolt-elements-textPrimary">Personnalisation</h3>
            <p className="text-sm text-bolt-elements-textSecondary">
              Personnalisez l'apparence et le comportement de l'application
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Theme Manager Card */}
          <ThemeManagerCard onClick={() => setShowThemeManager(true)} />

          {/* Prompt Manager Card */}
          <PromptManagerCard onClick={() => setShowPromptManager(true)} />
        </div>
      </motion.div>

      {/* Legacy Features Section */}
      <motion.div
        layout
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="i-ph:book text-xl text-gray-500" />
          <div>
            <h3 className="text-lg font-medium text-bolt-elements-textPrimary">Fonctionnalités Legacy</h3>
            <p className="text-sm text-bolt-elements-textSecondary">
              Anciennes fonctionnalités maintenues pour la compatibilité
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Legacy Prompt Library Card */}
          <motion.div
            className={classNames(
              'bg-bolt-elements-background-depth-2',
              'hover:bg-bolt-elements-background-depth-3',
              'transition-all duration-200',
              'rounded-lg p-4',
              'group',
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4">
              <div
                className={classNames(
                  'p-2 rounded-lg text-xl',
                  'bg-bolt-elements-background-depth-3 group-hover:bg-bolt-elements-background-depth-4',
                  'transition-colors duration-200',
                  'text-gray-500',
                )}
              >
                <div className="i-ph:book" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-bolt-elements-textPrimary group-hover:text-purple-500 transition-colors">
                  Prompt Library (Legacy)
                </h4>
                <p className="text-xs text-bolt-elements-textSecondary mt-0.5">
                  Templates de prompts prédéfinis - Utilisez le nouveau Gestionnaire de Prompts à la place
                </p>
              </div>
              <select
                value={promptId}
                onChange={(e) => {
                  setPromptId(e.target.value);
                  toast.success('Prompt template updated');
                }}
                className={classNames(
                  'p-2 rounded-lg text-sm min-w-[200px]',
                  'bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor',
                  'text-bolt-elements-textPrimary',
                  'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
                  'group-hover:border-purple-500/30',
                  'transition-all duration-200',
                )}
              >
                {PromptLibrary.getList().map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showPromptManager && <PromptManager onClose={() => setShowPromptManager(false)} />}
        {showThemeManager && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setShowThemeManager(false)}
          >
            <motion.div
              className={classNames(
                'bg-bolt-elements-background-depth-1',
                'border border-bolt-elements-borderColor',
                'rounded-2xl shadow-2xl',
                'w-full max-w-6xl h-[90vh]',
                'flex flex-col overflow-hidden',
              )}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-bolt-elements-borderColor">
                <div className="flex items-center gap-3">
                  <div className="i-ph:palette text-2xl text-purple-500" />
                  <div>
                    <h2 className="text-xl font-semibold text-bolt-elements-textPrimary">Gestionnaire de Thèmes</h2>
                    <p className="text-sm text-bolt-elements-textSecondary">
                      Personnalisez l'apparence de l'interface avec des thèmes prédéfinis ou créez les vôtres
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowThemeManager(false)}
                  className={classNames(
                    'p-2 rounded-lg transition-colors',
                    'hover:bg-bolt-elements-background-depth-3',
                    'text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary',
                  )}
                >
                  <div className="i-ph:x text-xl" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden">
                <ThemeManager />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
