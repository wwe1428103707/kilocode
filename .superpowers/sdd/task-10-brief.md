## Task 10: Kilo Fork 3-Tab WebView UI (ADAPTED for actual Kilo structure)

**Working dir:** `E:\develop\KiloCode-Fork`

**Files to create:**
- `packages/kilo-vscode/webview-ui/src/components/tools/ToolsTab.tsx`
- `packages/kilo-vscode/webview-ui/src/components/tools/ConfigTab.tsx`
- `packages/kilo-vscode/webview-ui/src/components/tools/TabNav.tsx`
- `packages/kilo-vscode/webview-ui/src/styles/lingink-tabs.css`
- `packages/kilo-vscode/webview-ui/src/types/tabs.ts`

**Files to modify:**
- `packages/kilo-vscode/webview-ui/src/App.tsx` — add TabNav + tools/config views

**Key adaptation from plan:** Kilo's App.tsx already uses `Switch`/`Match` for view switching (`newTask`/`history`/`profile`/`settings`/`subAgentViewer`). I'll ADD a tab bar on top of the existing view system without removing anything.

### Steps

Step 1: Create `src/types/tabs.ts`
```typescript
export type LingInkTab = 'chat' | 'tools' | 'config';
```

Step 2: Create `src/components/tools/TabNav.tsx`
```tsx
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
```

Step 3: Create `src/components/tools/ToolsTab.tsx`
```tsx
import { Component } from 'solid-js';

const TOOL_GROUPS = [
  {
    title: '✍️ 写作辅助',
    tools: [
      { icon: '📝', title: '选题引导', desc: '苏格拉底式追问', tag: 'P1', command: 'lingink.topicGuide' },
      { icon: '🔀', title: '结构重组', desc: '三种叙事路径', tag: 'P1', command: 'lingink.restructure' },
      { icon: '✏️', title: '英文润色', desc: '地道度+学术语用', tag: 'P1', command: 'lingink.polish' },
      { icon: '📖', title: '概念溯源', desc: '多学派定义检索', tag: 'P3', command: '' },
    ],
  },
  {
    title: '🛡️ 质量检查',
    tools: [
      { icon: '🔍', title: '漏洞扫描', desc: '三维扫描', tag: 'P1', command: 'lingink.scanVulnerabilities' },
      { icon: '⚔️', title: '反驳演练', desc: 'AI 反方攻防', tag: 'P1', command: 'lingink.counterArgument' },
      { icon: '👥', title: '模拟审稿', desc: '多角色审查', tag: 'P2', command: '' },
      { icon: '🎓', title: '苏格拉底导师', desc: '探索型思辨', tag: 'P2', command: '' },
    ],
  },
  {
    title: '📚 文献与引用',
    tools: [
      { icon: '🔬', title: '文献检索', desc: '检索→筛选→聚类', tag: 'P2', command: '' },
      { icon: '📄', title: '参考文献格式化', desc: 'APA/GB/T 7714', tag: 'P2', command: '' },
      { icon: '💡', title: '知识补漏', desc: '文献缺口识别', tag: 'P1', command: '' },
    ],
  },
  {
    title: '📊 数据处理',
    tools: [
      { icon: '📈', title: '图文校验', desc: '一致性检查', tag: 'P2', command: '' },
      { icon: '📉', title: '结果表述', desc: '统计转学术文字', tag: 'P3', command: '' },
    ],
  },
  {
    title: '🎤 发表与展示',
    tools: [
      { icon: '📮', title: '投稿匹配', desc: '推荐期刊', tag: 'P2', command: '' },
      { icon: '🎯', title: '报告准备', desc: '宣讲大纲生成', tag: 'P2', command: '' },
    ],
  },
];

export const ToolsTab: Component = () => {
  return (
    <div class="lingink-tools-grid">
      {TOOL_GROUPS.map(group => (
        <div class="lingink-tools-group">
          <div class="lingink-group-title">{group.title}</div>
          <div class="lingink-tools-row">
            {group.tools.map(tool => (
              <div class="lingink-tool-btn" onClick={() => {
                if (tool.command) {
                  window.parent.postMessage({ type: 'command', command: tool.command }, '*');
                }
              }}>
                <span class="lingink-tb-icon">{tool.icon}</span>
                <span class="lingink-tb-title">{tool.title}</span>
                <span class="lingink-tb-desc">{tool.desc}</span>
                <span class="lingink-tb-tag">{tool.tag}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
```

Step 4: Create `src/components/tools/ConfigTab.tsx`
```tsx
import { Component } from 'solid-js';

export const ConfigTab: Component = () => {
  return (
    <div class="lingink-model-config">
      <div class="lingink-mc-section">
        <h4>🟢 默认模型 · DeepSeek</h4>
        <div class="lingink-mc-row">
          <label>模型</label>
          <select>
            <option selected>deepseek-chat (默认)</option>
            <option>deepseek-reasoner</option>
          </select>
        </div>
        <div class="lingink-mc-row">
          <label>API Key</label>
          <input type="password" placeholder="通过 SecretStorage 托管" />
        </div>
        <div class="lingink-mc-row">
          <label>Base URL</label>
          <input value="https://api.deepseek.com/v1" />
        </div>
        <div class="lingink-mc-status">✅ 通过 Kilo Provider Router 连接</div>
      </div>
      <div class="lingink-mc-section">
        <h4>⚙️ 自定义模型</h4>
        <div class="lingink-mc-row">
          <label>显示名称</label>
          <input placeholder="例如: 我的GLM-4" />
        </div>
        <div class="lingink-mc-row">
          <label>模型名</label>
          <input placeholder="glm-4-plus" />
        </div>
        <div class="lingink-mc-row">
          <label>Base URL</label>
          <input placeholder="https://open.bigmodel.cn/api/paas/v4" />
        </div>
        <div class="lingink-mc-row">
          <label>API Key</label>
          <input type="password" placeholder="输入自定义 API Key" />
        </div>
      </div>
      <div class="lingink-mc-section">
        <h4>⚡ 快捷操作</h4>
        <button class="lingink-mc-action">🔑 管理所有 API Key</button>
        <button class="lingink-mc-action">⌨️ 查看快捷键</button>
        <button class="lingink-mc-action">📊 查看用量统计</button>
      </div>
    </div>
  );
};
```

Step 5: Create `src/styles/lingink-tabs.css` with all the tab/tool/config styles (copy from the plan in the main repo at `docs/superpowers/plans/2026-06-27-lingink-mvp-phase1.md` lines 1594-1680).

Step 6: Modify `src/App.tsx`:
- Add `import { TabNav } from './components/tools/TabNav';`
- Add `import { ToolsTab } from './components/tools/ToolsTab';`  
- Add `import { ConfigTab } from './components/tools/ConfigTab';`
- Add `import './styles/lingink-tabs.css';`
- Add a `linginkTab` signal: `const [linginkTab, setLinginkTab] = createSignal<'chat' | 'tools' | 'config'>('chat');`
- In the returned JSX, wrap the existing content area with the TabNav at the top and conditional content below
- When `linginkTab() === 'tools'` show ToolsTab instead of the existing Switch
- When `linginkTab() === 'config'` show ConfigTab
- When `linginkTab() === 'chat'` show the existing Switch content

Step 7: Typecheck: `cd packages/kilo-vscode && bun run check-types:webview 2>&1`

Step 8: Commit: `git add -A && git commit -m "feat(ui): add LingInk 3-Tab WebView (chat/tools/config)"`

**Report:** `E:\develop\KiloCode-Fork\.superpowers\sdd\task-10-report.md`
