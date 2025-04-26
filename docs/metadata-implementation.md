# Next.js 元数据实现文档

## 1. 概述

本文档详细说明了 Wood Away 应用中应用下载页面的元数据生成实现。该实现基于 Next.js 13+ 的新元数据 API，提供了完整的 SEO 支持、多语言支持和社交媒体分享优化。

## 2. 核心实现

### 2.1 函数定义

```typescript
export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
});
```

这是一个异步函数，接收语言参数 `lang`，用于生成页面的元数据。

### 2.2 主要功能

- 根据当前语言获取对应的翻译文本
- 设置页面的标题、描述、链接等信息
- 配置社交媒体分享信息（Open Graph 和 Twitter）
- 设置搜索引擎爬虫规则

## 3. 详细配置说明

### 3.1 基础元数据

```typescript
{
  title: dict.appDownload.meta.title,
  description: dict.appDownload.meta.description,
}
```

- 设置页面的标题和描述
- 内容会根据当前语言显示对应的翻译

### 3.2 多语言支持

```typescript
alternates: {
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/app`,
  languages: Object.fromEntries(
    i18n.locales.map((locale: Locale) => [
      locale,
      ensureTrailingSlash(`/${locale}/app`),
    ])
  ),
}
```

- 设置规范链接（canonical URL）
- 为所有支持的语言创建对应的链接映射
- 确保 URL 末尾包含斜杠

### 3.3 Open Graph 配置

```typescript
openGraph: {
  title: dict.appDownload.meta.title,
  description: dict.appDownload.meta.description,
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/app`,
  siteName: "Wood Away",
  locale: lang,
  type: "website",
  images: [
    {
      url: "/images/og-download.jpg",
      width: 1200,
      height: 630,
      alt: dict.appDownload.title,
    }
  ]
}
```

- 配置在社交媒体（如 Facebook）上分享时的显示效果
- 包含标题、描述、URL、站点名称等信息
- 支持多语言本地化
- 包含优化的分享图片

### 3.4 Twitter 卡片配置

```typescript
twitter: {
  card: "summary_large_image",
  title: dict.appDownload.meta.title,
  description: dict.appDownload.meta.description,
  images: ["/images/og-download.jpg"]
}
```

- 配置在 Twitter 上分享时的显示效果
- 使用大图卡片样式
- 支持多语言内容

### 3.5 搜索引擎配置

```typescript
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large"
  }
}
```

- 允许搜索引擎索引页面
- 允许跟踪页面上的链接
- 配置 Google 爬虫的图片预览大小

## 4. 国际化支持

### 4.1 翻译获取

- 使用 `getDictionary(lang)` 获取对应语言的翻译
- 所有文本内容都支持多语言显示

### 4.2 路由支持

- 通过 `i18n.locales` 支持多种语言的路由
- 自动生成所有支持语言的 URL 映射

## 5. 最佳实践

### 5.1 SEO 优化

- 使用规范的 URL 结构
- 提供完整的元数据信息
- 支持多语言 SEO

### 5.2 社交媒体优化

- 提供优化的分享图片
- 支持多语言内容
- 使用标准的 Open Graph 和 Twitter 卡片

### 5.3 性能考虑

- 异步加载翻译内容
- 使用环境变量管理 URL
- 优化图片尺寸和格式

## 6. 注意事项

### 6.1 环境变量

- 确保 `NEXT_PUBLIC_SITE_URL` 环境变量已正确配置
- 检查图片资源路径是否正确

### 6.2 翻译文件

- 确保所有语言都有对应的翻译内容
- 保持翻译文件结构的一致性
- 当使用 `dict.section.meta` 时，必须确保所有语言的翻译文件中都包含 `meta` 对象
- 如果某个语言的翻译文件缺少 `meta` 对象，TypeScript 会报错：`类型上不存在属性"meta"`
- 解决方案：
  1. 检查所有语言的翻译文件
  2. 确保每个翻译文件都包含完整的 `meta` 对象
  3. 保持所有语言翻译文件的结构一致

### 6.3 图片资源

- 确保 og-download.jpg 图片存在且尺寸合适
- 考虑图片的加载性能

### 6.4 客户端组件与服务器端组件分离

- 当页面需要同时使用 `"use client"` 和 `generateMetadata` 时，必须将客户端逻辑分离到单独的组件中
- 页面组件（page.tsx）应该是一个服务器端组件，只包含 `generateMetadata` 和客户端组件的引用
- 示例：

  ```typescript
  // page.tsx (服务器端组件)
  import ClientComponent from "./components/client-component";

  export async function generateMetadata({ params: { lang } }) {
    // metadata 配置
  }

  export default function Page() {
    return <ClientComponent />;
  }

  // components/client-component.tsx (客户端组件)
  ("use client");
  export default function ClientComponent() {
    // 客户端逻辑
  }
  ```
