import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { ensureTrailingSlash } from "@/lib/utils";

interface PostListProps {
  posts: BlogPost[];
  lang: string;
}

export function PostList({ posts, lang }: PostListProps) {
  return (
    <div className="grid gap-8">
      {posts.map((post) => (
        <article key={post.slug} className="border-b pb-8">
          <Link href={ensureTrailingSlash(`/${lang}/blog/${post.slug}`)}>
            <h2 className="text-2xl font-semibold hover:text-blue-600">
              {post.title}
            </h2>
          </Link>
          <div className="text-gray-600 mt-2">
            {new Date(post.date).toLocaleDateString()}
          </div>
          <p className="mt-4 text-gray-700">{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
