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
