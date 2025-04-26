import { type BlogPost } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import YouTubePlayer from "@/components/common/YouTubePlayer";
import dynamic from "next/dynamic";

// 注册需要的语言
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);

// 用于追踪是否已渲染聊天窗口
let hasRenderedChatWindow = false;

interface PostContentProps {
  post: BlogPost;
  hideTitle?: boolean;
}

const components = {
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
    // 检查是否是 DeepSeek V3 chat 链接
    if (
      (href?.includes("ChatStream.org") && href?.includes("/chat")) &&
      !hasRenderedChatWindow
    ) {
      hasRenderedChatWindow = true;
      return (
        <div className="my-8 rounded-xl overflow-hidden shadow-lg">
        </div>
      );
    }

    // YouTube 链接处理
    if (href?.includes("youtube.com") || href?.includes("youtu.be")) {
      if (href) {
        return (
          <div className="my-4">
            <YouTubePlayer url={href} />
          </div>
        );
      }
    }

    // 普通链接处理
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
  pre: ({ children }: { children: React.ReactNode }) => {
    return (
      <div
        style={{ background: "hsl(220, 13%, 18%)" }}
        className="not-prose rounded-lg my-6 overflow-hidden"
      >
        {children}
      </div>
    );
  },
  code: ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    if (!language) {
      return (
        <code className=" px-1.5 py-0.5 rounded-md text-sm">
          {children}
        </code>
      );
    }

    const customOneDark = {
      ...oneDark,
      'pre[class*="language-"]': {
        ...oneDark['pre[class*="language-"]'],
        background: "transparent",
      },
      'code[class*="language-"]': {
        ...oneDark['code[class*="language-"]'],
        background: "transparent",
      },
    };

    return (
      <SyntaxHighlighter
        language={language}
        style={customOneDark}
        customStyle={{
          margin: "0",
          padding: "1rem",
          background: "transparent",
          fontSize: "0.9rem",
          lineHeight: "1.5",
        }}
        PreTag="div"
        showLineNumbers={false}
        wrapLongLines={false}
        codeTagProps={{
          style: {
            color: "hsl(220, 14%, 71%)",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily:
              '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
            background: "transparent",
          },
        }}
      >
        {String(children).trim()}
      </SyntaxHighlighter>
    );
  },
} as const;

export async function PostContent({
  post,
  hideTitle = false,
}: PostContentProps) {
  // 重置聊天窗口渲染状态
  hasRenderedChatWindow = false;

  const contentWithoutH1 = post.content.replace(/^#\s.*$/gm, "");

  return (
    <article className="prose dark:prose-invert max-w-none">
      {!hideTitle && (
        <>
          <h1>{post.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground -mt-4 mb-8">
            <time dateTime={post.date}>{post.date}</time>
          </div>
        </>
      )}
      {/* @ts-expect-error Server Component */}
      <MDXRemote source={contentWithoutH1} components={components} />
    </article>
  );
}
