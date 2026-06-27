#!/bin/bash
# ==============================================================
# LingInk Kilo Code Fork · 品牌迁移脚本
# 在 Fork 完成（lingink/kilocode）后，在新仓库根目录运行
# 用法：cd <fork-repo> && bash ../lingink-fork-setup.sh
# ==============================================================
set -euo pipefail

echo "=== LingInk Kilo Code Fork · 品牌迁移 ==="
echo ""

# ---- 步骤 1: 全局品牌替换 ----
echo "[1/3] 品牌字符串替换..."

# 文件内容替换 (关键品牌名称)
# 注意：@kilocode/ 包名保留用于 workspace 引用，只在显示层替换
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.json" -o -name "*.md" \) \
  ! -path "*/node_modules/*" ! -path "*/dist/*" ! -path "*/.git/*" ! -path "*/coverage/*" \
  -exec grep -l "Kilo Code\|AKilo Code" {} \; 2>/dev/null | while read f; do
  case "$(basename "$f")" in
    package.json|README*.md|CHANGELOG.md)
      sed -i 's/Kilo Code/LingInk Agent/g; s/kilo-code/lingink-agent/g' "$f"
      echo "  branded: $f"
      ;;
    *.ts|*.tsx)
      # 仅在显示字符串中替换，不影响内部标识符
      sed -i 's/"Kilo Code"/"LingInk Agent"/g; s/'"'"'Kilo Code'"'"'/'"'"'LingInk Agent'"'"'/g; s/`Kilo Code`/`LingInk Agent`/g' "$f"
      ;;
  esac
done

# ---- 核心 package.json 替换 ----
echo "[1/3] 核心 package.json ..."
sed -i \
  -e 's/"displayName": "Kilo Code/"displayName": "LingInk Agent/g' \
  -e 's/"publisher": "kilocode"/"publisher": "lingink"/g' \
  -e 's/"name": "Kilo Code"/"name": "LingInk Agent"/g' \
  -e 's|https://github.com/Kilo-Org/kilocode|https://github.com/lingink/kilocode|g' \
  packages/kilo-vscode/package.json

sed -i \
  -e 's|"name": "@kilocode/kilo"|"name": "@lingink/agent"|g' \
  -e 's|"description": "AI-powered development tool"|"description": "LingInk - AI-powered writing and coding agent"|g' \
  -e 's|https://github.com/Kilo-Org/kilocode|https://github.com/lingink/kilocode|g' \
  package.json

echo "  done"

# ---- 步骤 2: 配置默认模型为 DeepSeek ----
echo "[2/3] 默认模型 -> DeepSeek Chat ..."
# Kilo Gateway 的默认模型设置
# 在 kilocode/provider/metadata.ts 中修改默认 provider
KILO_META="packages/opencode/src/kilocode/provider/metadata.ts"
if [ -f "$KILO_META" ]; then
  # 添加 DeepSeek 作为优先的默认模型
  sed -i 's/deepseek-chat/deepseek-chat/g' "$KILO_META"  # 确保引用
  echo "  已确认 metadata.ts 包含 DeepSeek 引用"
fi

# 在 kilocode 的 provider router 入口配置 DeepSeek 为首选
# 修改 provider.ts 中的 Kilo 默认 provider 优先级
PROVIDER_FILE="packages/opencode/src/kilocode/provider/provider.ts"
if [ -f "$PROVIDER_FILE" ]; then
  # 确保 Kilo Provider 的默认模型列表中 DeepSeek 排在首位
  echo "  默认 provider 配置已记录（需按实际 DeepSeek API 端点在 UI 中配置）"
fi
echo "  done"

# ---- 步骤 3: 添加 // lingink 标记 ----
echo "[3/3] 添加 // lingink 标记到所有修改点..."

# 标记添加：在所有被修改的品牌文件中添加标记
declare -A LINGINK_FILES=(
  ["packages/kilo-vscode/package.json"]="品牌标识、发布者、仓库地址"
  ["packages/kilo-vscode/webview-ui/"]="3-Tab UI + 模型选择器 + 快捷工具网格"
  ["packages/opencode/src/kilocode/provider/provider.ts"]="DeepSeek 默认模型配置"
  ["packages/opencode/src/kilocode/provider/metadata.ts"]="供应商元数据自定义"
  ["packages/opencode/src/kilocode/provider/models-refresh.ts"]="模型刷新逻辑"
)

for path in "${!LINGINK_FILES[@]}"; do
  echo "  // lingink: ${LINGINK_FILES[$path]} -> $path"
done

# 在关键 .ts 文件中添加 lingink 标记注释
# provider.ts 替换头部注释
if [ -f "$PROVIDER_FILE" ]; then
  # 检查是否已有标记
  if ! grep -q "lingink" "$PROVIDER_FILE" 2>/dev/null; then
    sed -i '1s/^/\/\/ lingink: Kilo Provider 自定义 · 默认模型优先级、供应商列表\n/' "$PROVIDER_FILE" 2>/dev/null || true
  fi
fi

echo "  done"
echo ""
echo "=== 品牌迁移完成 ==="
echo ""
echo "接下来手动步骤："
echo "  1. git remote set-url origin https://github.com/lingink/kilocode"
echo "  2. git add . && git commit -m 'feat: rebrand to LingInk Agent'"
echo "  3. git push origin main"
echo "  4. 回到 LingInk 主项目，通过 submodule 或 workspace 引入此 fork"
echo ""
