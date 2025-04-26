import fs from "fs";
import path from "path";
import { getAllPosts, BlogPost } from "../lib/blog";
import { i18n } from "../i18n";

async function generateBlogCache() {
  const languages = i18n.locales;
  const cacheDir = path.join(process.cwd(), ".cache/blog");

  // 确保缓存目录存在
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  for (const lang of languages) {
    try {
      const posts = await getAllPosts(lang);

      // 按日期倒序排序文章
      const sortedPosts = posts.sort((a: BlogPost, b: BlogPost) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      const tags = Array.from(
        new Set(sortedPosts.flatMap((post: BlogPost) => post.tags)),
      );

      // 将解析后的数据写入缓存文件
      fs.writeFileSync(
        path.join(cacheDir, `${lang}.json`),
        JSON.stringify(
          {
            posts: sortedPosts,
            tags,
            lastUpdated: new Date().toISOString(),
          },
          null,
          2,
        ),
      );

      console.log(
        `Generated cache for ${lang}: ${sortedPosts.length} posts, ${tags.length} tags`,
      );
    } catch (error) {
      console.warn(`Warning: Failed to generate cache for ${lang}`, error);
      // 继续处理其他语言
      continue;
    }
  }
}

// 在 package.json 中添加构建脚本
// "scripts": {
//   "build:blog": "ts-node scripts/generate-blog-cache.ts",
//   "build": "npm run build:blog && next build"
// }

// 添加执行函数
generateBlogCache().catch(console.error);
