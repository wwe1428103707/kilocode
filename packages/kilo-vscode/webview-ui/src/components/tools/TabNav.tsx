import { Component } from 'solid-js';
import type { LingInkTab } from '../../types/tabs';

interface TabNavProps {
  activeTab: LingInkTab;
  onTabChange: (tab: LingInkTab) => void;
}

export const TabNav: Component<TabNavProps> = (props) => {
  const tabs: { id: LingInkTab; icon: string; label: string }[] = [
    { id: 'chat', icon: '💬', label: 'Agent 对话' },
    { id: 'tools', icon: '⚡', label: '快捷工具' },
    { id: 'config', icon: '🔧', label: '模型配置' },
  ];

  return (
    <div class="lingink-tab-nav">
      {tabs.map(t => (
        <button
          class={props.activeTab === t.id ? 'active' : ''}
          onClick={() => props.onTabChange(t.id)}
        >
          <span class="lingink-tab-icon">{t.icon}</span>
          <span class="lingink-tab-label">{t.label}</span>
        </button>
      ))}
    </div>
  );
};
