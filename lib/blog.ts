import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "blog/posts");
const CACHE_DIR = path.join(process.cwd(), ".cache/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  tags: string[];
}

interface FrontMatter {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
}

interface CacheData {
  posts: BlogPost[];
  tags: string[];
}

const postsCache: Record<string, BlogPost[]> = {};
const tagsCache: Record<string, string[]> = {};

export async function getAllPosts(lang: string): Promise<BlogPost[]> {
  const files = fs.readdirSync(path.join(BLOG_DIR, lang));

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = fs.readFileSync(path.join(BLOG_DIR, lang, file), "utf-8");
      const { data, content } = matter(source) as unknown as {
        data: Required<FrontMatter>;
        content: string;
      };

      return {
        slug: file.replace(".mdx", ""),
        title: data.title,
        date: data.date,
        content,
        excerpt: data.excerpt || "",
        tags: data.tags || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function generateStaticParams() {
  const languages = ["en", "de", "cn"];

  for (const lang of languages) {
    if (!postsCache[lang]) {
      postsCache[lang] = await getAllPosts(lang);
      tagsCache[lang] = Array.from(
        new Set(postsCache[lang].flatMap((post: BlogPost) => post.tags)),
      );
    }
  }
}

export async function getCachedPosts(lang: string): Promise<BlogPost[]> {
  const cacheFile = path.join(CACHE_DIR, `${lang}.json`);
  const cache = JSON.parse(fs.readFileSync(cacheFile, "utf-8")) as CacheData;
  return cache.posts;
}

export async function getPostBySlug(
  lang: string,
  slug: string,
): Promise<BlogPost | null> {
  try {
    const source = fs.readFileSync(
      path.join(BLOG_DIR, lang, `${slug}.mdx`),
      "utf-8",
    );
    const { data, content } = matter(source);

    return {
      slug,
      title: data.title,
      date: data.date,
      content,
      excerpt: data.excerpt || "",
      tags: data.tags || [],
    };
  } catch {
    return null;
  }
}
