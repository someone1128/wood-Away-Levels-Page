/** @type {import('next-sitemap').IConfig} */
const fs = require("fs");
const path = require("path");

// 添加日期格式化函数
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return new Date().toISOString();
    }
    return date.toISOString();
  } catch (e) {
    return new Date().toISOString();
  }
}

// 定义所有需要生成的路由
const routes = [
  "", // 首页
  "app",
  "level",
  "blog",
  "privacy",
  "terms-of-service",
  "about",
];

// 定义所有支持的语言
const locales = ["en", "zh", "tw", "ja", "ko"];

// 读取关卡数据
const levelsPath = path.join(process.cwd(), "data", "levelsSitemap.json");
const levels = fs.existsSync(levelsPath)
  ? JSON.parse(fs.readFileSync(levelsPath, "utf-8"))
  : [];

module.exports = {
  siteUrl: process.env.SITE_URL || "",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/admin/*"],
  transform: async (config, path) => {
    const result = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
    return result;
  },
  additionalPaths: async (config) => {
    const result = [];

    // 添加基础路径（不带语言前缀）
    for (const route of routes) {
      const routePath = route ? `/${route}` : "/";
      result.push({
        loc: routePath,
        priority: route === "" ? 1.0 : 0.8,
        changefreq: "daily",
        lastmod: new Date().toISOString(),
      });
    }

    // 添加各语言版本的路径
    for (const locale of locales) {
      for (const route of routes) {
        const localePath = route ? `/${locale}/${route}` : `/${locale}`;
        result.push({
          loc: localePath,
          priority: route === "" ? 0.9 : 0.8,
          changefreq: "daily",
          lastmod: new Date().toISOString(),
        });
      }
    }

    // 添加关卡详情页面的路径
    for (const level of levels) {
      // 添加基础路径（不带语言前缀）
      const levelPath = `/level/${level.id}`;
      result.push({
        loc: levelPath,
        priority: 0.7,
        changefreq: "weekly",
        lastmod: new Date().toISOString(),
      });

      // 添加各语言版本的路径
      for (const locale of locales) {
        const localeLevelPath = `/${locale}/level/${level.id}`;
        result.push({
          loc: localeLevelPath,
          priority: 0.7,
          changefreq: "weekly",
          lastmod: new Date().toISOString(),
        });
      }
    }

    // 处理博客相关路径
    for (const locale of locales) {
      const cachePath = path.join(
        process.cwd(),
        ".cache",
        "blog",
        `${locale}.json`
      );
      if (fs.existsSync(cachePath)) {
        const cacheContent = fs.readFileSync(cachePath, "utf-8");
        const { posts } = JSON.parse(cacheContent);

        // 添加每篇文章的URL
        for (const post of posts) {
          const postPath = `/${locale}/blog/${post.slug}`;
          result.push({
            loc: postPath,
            priority: 0.6,
            changefreq: "weekly",
            lastmod: formatDate(post.date),
          });
        }

        // 添加分页
        const postsPerPage = 10;
        const totalPages = Math.ceil(posts.length / postsPerPage);
        for (let page = 2; page <= totalPages; page++) {
          const pagePath = `/${locale}/blog/${page}`;
          result.push({
            loc: pagePath,
            priority: 0.5,
            changefreq: "daily",
            lastmod: new Date().toISOString(),
          });
        }
      }
    }

    return result;
  },
};
