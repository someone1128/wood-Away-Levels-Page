# AI 翻译工作指南

## 1. 翻译准备

### 文件追踪 (示例，根据实际语言扩展)

```markdown
| 文件      | en  | zh  | tw  | ja  | ko  | ru  | de  | es  | fr  | fil | id  | kk  | ms  | vi  | en-AU | nl  | es-MX | it  | pt  | th  | ... |
| --------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ----- | --- | ----- | --- | --- | --- | --- |
| header.ts | ✓   | ✓   |     |     |     |     |     |     |     |     |     |     |     |     |       |     |       |     |     |     |     |
| common.ts | ✓   | ✓   |     |     |     |     |     |     |     |     |     |     |     |     |       |     |       |     |     |     |     |
```

### 基准检查清单

- [ ] 检查 zh 目录文件完整性 (zh 为基准)
- [ ] 检查 cn 目录文件完整性
- [ ] 确认文件结构完整性
- [ ] 记录保持原文内容（品牌名等）
- [ ] 记录特殊处理内容（统一翻译）

## 2. 翻译流程

### 基础翻译

```typescript
// 正确顺序：按文件类型 (以 header.ts 和 common.ts 为例)
en/header.ts → zh/header.ts → tw/header.ts → ja/header.ts → ko/header.ts → ru/header.ts → de/header.ts → es/header.ts → fr/header.ts → fil/header.ts → id/header.ts → kk/header.ts → ms/header.ts → vi/header.ts → en-AU/header.ts → nl/header.ts → es-MX/header.ts → it/header.ts → pt/header.ts → th/header.ts → ...
en/common.ts → zh/common.ts → tw/common.ts → ja/common.ts → ko/common.ts → ru/common.ts → de/common.ts → es/common.ts → fr/common.ts → fil/common.ts → id/common.ts → kk/common.ts → ms/common.ts → vi/common.ts → en-AU/common.ts → nl/common.ts → es-MX/common.ts → it/common.ts → pt/common.ts → th/common.ts → ...

// 避免顺序：按语言
en/(所有文件) → cn/(所有文件) → ...
```

### 结构检查

```typescript
// 检查index.ts导出
export * from "./header";
export * from "./common";
export * from "./level-detail";
```

### 特殊处理

- 东亚语言（cn, tw, ja, ko）：
  - 字体支持
  - 文字间距
  - 标点符号处理
  - 换行规则

## 3. 质量检查

### 结构检查

- 文件数量一致
- 导出完整性
- 属性完整性

### 内容检查

- 品牌名称统一
- URL 结构一致
- 占位符格式

### 翻译规则 (示例)

```typescript
"Download" → {
  en: "App Download",
  zh: "应用下载",
  tw: "應用下載",
  ja: "アプリダウンロード",
  ko: "앱 다운로드",
  ru: "Скачать приложение", // 示例
  de: "App herunterladen", // 示例
  es: "Descargar aplicación", // 示例
  fr: "Télécharger l'application", // 示例
  fil: "I-download ang App", // 示例
  id: "Unduh Aplikasi", // 示例
  kk: "Қолданбаны жүктеу", // 示例
  ms: "Muat Turun Aplikasi", // 示例
  vi: "Tải ứng dụng", // 示例
  'en-AU': "App Download", // 示例
  nl: "App downloaden", // 示例
  'es-MX': "Descargar aplicación", // 示例
  it: "Scarica l'app", // 示例
  pt: "Baixar aplicativo", // 示例
  th: "ดาวน์โหลดแอป", // 示例
  // ... 其他语言 ...
}
```

## 4. 错误预防

### 遗漏预防

- 使用追踪表
- 按文件类型翻译
- 及时更新进度

### 结构预防

- 基准版本先行
- 模板复制
- 仅改翻译文本

### 翻译预防

- 术语表维护
- 规则记录
- 示例参考

## 5. 验证步骤

### 文件验证

```bash
ls -l dictionaries/*/
grep "export *" dictionaries/*/index.ts
```

### 内容验证

- 导航项数量
- 必需字段
- 链接地址

### 运行验证

- 语言切换测试
- 布局检查
- 交互验证
