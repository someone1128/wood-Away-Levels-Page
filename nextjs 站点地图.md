# Next.js 站点地图配置指南

## 简介

本文档介绍如何在 Next.js 项目中配置站点地图（sitemap.xml），以优化搜索引擎爬虫对网站的抓取。我们使用 `next-sitemap` 包来生成站点地图，支持多语言、动态路由和自定义优先级。

## 安装依赖

```bash
npm install next-sitemap
```

## 基础配置

### 1. 创建配置文件

在项目根目录创建 `next-sitemap.config.js`：

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};
```

### 2. 配置构建脚本

在 `package.json` 中添加构建脚本：

```json
{
  "scripts": {
    "build": "npm run build:levels && npm run build:blog && next build && next-sitemap --config next-sitemap.config.js"
  }
}
```

> **重要：构建顺序**
>
> 构建顺序非常重要，必须按照以下顺序执行：
>
> 1. `build:levels` - 生成 levels.json 数据文件
> 2. `build:blog` - 生成博客缓存文件
> 3. `next build` - 构建 Next.js 应用
> 4. `next-sitemap` - 生成站点地图
>
> 这是因为：
>
> - `next-sitemap` 需要依赖 levels.json 和博客缓存文件
> - 如果这些文件不存在，会导致站点地图生成失败
> - 如果这些文件不是最新的，会导致站点地图包含过时数据

## 多语言支持

### 1. 定义支持的语言

```javascript
const locales = [
  "en",
  "de",
  "cn",
  "tw",
  "ja",
  "fr",
  "ar",
  "ko",
  "fa",
  "it",
  "es",
  "ru",
];
```

### 2. 配置替代链接

```javascript
alternateRefs: locales.map((locale) => ({
  href: `${process.env.SITE_URL}/${locale}`,
  hreflang: locale === "cn" ? "zh-CN" : locale === "tw" ? "zh-TW" : locale,
})),
```

### 3. 生成替代链接的函数

```javascript
function generateAlternateRefs(locale, path = "") {
  // 移除路径中可能存在的语言代码
  const cleanPath = path.replace(/^\/[a-z]{2}(-[a-z]{2})?/, "");
  // 确保路径以 / 开头
  const normalizedPath = cleanPath.startsWith("/")
    ? cleanPath
    : `/${cleanPath}`;
  return locales.map((l) => ({
    href: `${process.env.SITE_URL}/${l}${normalizedPath}`,
    hreflang: l === "cn" ? "zh-CN" : l === "tw" ? "zh-TW" : l,
  }));
}
```

## 动态路由支持

### 1. 静态路由配置

```javascript
const routes = [
  "", // 首页
  "app",
  "level",
  "blog",
  "privacy",
];
```

### 2. 动态路由处理

对于动态路由（如博客文章、关卡页面等），需要以下步骤：

#### 2.1 创建数据生成脚本

对于 TypeScript 数据文件（如 `data/levels.ts`），需要先将其转换为 JSON 文件，因为 `next-sitemap` 不支持直接导入 TypeScript 文件。

> **错误总结：直接导入 TypeScript 文件**
>
> 我们最初尝试直接使用 `require` 导入 TypeScript 文件：
>
> ```javascript
> const levels = require("./data/levels.ts").default;
> ```
>
> 这导致了以下错误：
>
> ```
> SyntaxError: Unexpected identifier 'LevelData'
> ```
>
> 解决方案是创建一个数据生成脚本，将 TypeScript 数据转换为 JSON 文件。

创建 `scripts/generate-levels-json.ts`：

```typescript
import fs from "fs";
import path from "path";
import levels from "../data/levels";

// 确保 data 目录存在
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// 将 levels 数据写入 JSON 文件
const levelsPath = path.join(dataDir, "levels.json");
fs.writeFileSync(levelsPath, JSON.stringify(levels, null, 2));

console.log("Generated levels.json successfully");
```

#### 2.2 更新构建脚本

在 `package.json` 中添加数据生成脚本：

```json
{
  "scripts": {
    "build:levels": "ts-node --project scripts/tsconfig.json scripts/generate-levels-json.ts",
    "build": "npm run build:levels && npm run build:blog && next build && next-sitemap --config next-sitemap.config.js"
  }
}
```

#### 2.3 在站点地图配置中读取数据

在 `next-sitemap.config.js` 中读取生成的 JSON 文件：

```javascript
// 读取关卡数据
const levelsPath = path.join(process.cwd(), "data", "levels.json");
const levels = fs.existsSync(levelsPath)
  ? JSON.parse(fs.readFileSync(levelsPath, "utf-8"))
  : [];
```

#### 2.4 生成动态路由的 URL

在 `additionalPaths` 函数中处理动态路由：

```javascript
// 添加关卡详情页面的路径
for (const level of levels) {
  // 添加基础路径（不带语言前缀）
  result.push({
    loc: `/level/${level.id}`,
    priority: 0.7,
    changefreq: "weekly",
    lastmod: new Date().toISOString(),
    alternateRefs: generateAlternateRefs("", `/level/${level.id}`),
  });

  // 添加各语言版本的路径
  for (const locale of locales) {
    result.push({
      loc: `/${locale}/level/${level.id}`,
      priority: 0.7,
      changefreq: "weekly",
      lastmod: new Date().toISOString(),
      alternateRefs: generateAlternateRefs(locale, `/level/${level.id}`),
    });
  }
}
```

### 3. 常见问题解决

#### 3.1 TypeScript 文件导入错误

如果遇到类似以下错误：

```
SyntaxError: Unexpected identifier 'LevelData'
```

这是因为直接使用 `require` 导入 TypeScript 文件导致的。解决方案是：

1. 先将 TypeScript 数据文件转换为 JSON
2. 在站点地图配置中读取 JSON 文件

#### 3.2 路径重复问题

如果生成的替代链接出现重复路径，如：

```xml
<xhtml:link rel="alternate" hreflang="es" href="https://your-domain.com/es/level/97/ru/level/97"/>
```

解决方案是在 `generateAlternateRefs` 函数中清理路径：

```javascript
function generateAlternateRefs(locale, path = "") {
  // 移除路径中可能存在的语言代码
  const cleanPath = path.replace(/^\/[a-z]{2}(-[a-z]{2})?/, "");
  // 确保路径以 / 开头
  const normalizedPath = cleanPath.startsWith("/")
    ? cleanPath
    : `/${cleanPath}`;
  return locales.map((l) => ({
    href: `${process.env.SITE_URL}/${l}${normalizedPath}`,
    hreflang: l === "cn" ? "zh-CN" : l === "tw" ? "zh-TW" : l,
  }));
}
```

#### 3.3 构建顺序错误

如果遇到以下错误：

```
❌ [next-sitemap] G:\hzy-work\goodcoffee\data\levels.ts:1
interface LevelData {
          ^^^^^^^^^

SyntaxError: Unexpected identifier 'LevelData'
```

这是因为：

1. 构建顺序不正确，`next-sitemap` 在 `levels.json` 生成之前就执行了
2. 或者 `build:levels` 脚本执行失败了

解决方案：

1. 确保按照正确的顺序执行构建脚本
2. 检查 `build:levels` 脚本是否成功执行
3. 验证 `data/levels.json` 文件是否存在且内容正确

#### 3.4 替代链接路径错误

如果生成的替代链接出现错误的路径，如：

```xml
<xhtml:link rel="alternate" hreflang="es" href="https://your-domain.com/esvel/97/ru/level/97"/>
```

这是因为：

1. 路径拼接时没有正确处理语言代码
2. 没有清理路径中的重复部分

解决方案：

1. 使用 `generateAlternateRefs` 函数清理路径
2. 确保路径格式的一致性

## 优先级设置

不同页面的优先级设置建议：

- 首页：1.0
- 语言首页：0.9
- 主要页面：0.8
- 动态内容页面：0.7
- 博客文章：0.6
- 分页页面：0.5

## 更新频率设置

- 首页和主要页面：daily
- 动态内容页面：weekly
- 博客文章：weekly
- 分页页面：daily

## 环境变量配置

在 `.env` 文件中设置站点 URL：

```env
SITE_URL=https://your-domain.com
```

## 注意事项

1. 确保 `SITE_URL` 环境变量正确设置
2. 动态路由需要手动添加到 `additionalPaths` 中
3. 多语言页面的替代链接要正确配置
4. 定期更新 `lastmod` 日期
5. 合理设置页面优先级和更新频率

## 示例输出

生成的 sitemap.xml 示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://your-domain.com/level/97</loc>
    <lastmod>2024-03-23T03:43:43.209Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://your-domain.com/en/level/97"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://your-domain.com/de/level/97"/>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://your-domain.com/cn/level/97"/>
    <!-- 其他语言版本 -->
  </url>
</urlset>
```

## 最佳实践

1. 保持 URL 结构清晰和一致
2. 为所有重要页面添加多语言替代链接
3. 定期更新站点地图
4. 监控搜索引擎爬虫的访问日志
5. 确保所有 URL 都是可访问的
6. 避免生成重复的 URL
7. 合理设置更新频率和优先级
