import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '~/utils/classNames';

interface PromptManagerCardProps {
  onClick: () => void;
}

export const PromptManagerCard: React.FC<PromptManagerCardProps> = ({ onClick }) => {
  return (
    <motion.div
      className={classNames(
        'relative group cursor-pointer',
        'bg-bolt-elements-background-depth-2',
        'hover:bg-bolt-elements-background-depth-3',
        'transition-colors duration-200',
        'rounded-lg overflow-hidden',
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="i-ph:chat-text w-5 h-5 text-bolt-elements-textSecondary" />
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-bolt-elements-textPrimary">Prompt Manager</h4>
              <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-500 font-medium">
                New
              </span>
            </div>
          </div>
          <div className="i-ph:arrow-right w-5 h-5 text-bolt-elements-textSecondary group-hover:text-purple-500 transition-colors" />
        </div>
        <p className="mt-2 text-sm text-bolt-elements-textSecondary">
          Gérez vos prompts système, prompts personnalisés, outils et rôles pour optimiser vos conversations
        </p>
        <p className="mt-1 text-xs text-bolt-elements-textTertiary">
          Personnalisez le comportement de l'IA selon vos besoins
        </p>
      </div>
    </motion.div>
  );
};