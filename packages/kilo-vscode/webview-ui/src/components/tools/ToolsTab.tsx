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
