import React from "react";
import Image from "next/image";
import Link from "next/link";
import SimpleMdxRenderer from "@/components/SimpleMdxRenderer";
import fs from "fs";
import { ArrowLeft } from "lucide-react";
import path from "path";
import matter from "gray-matter";
import NotFound from "@/app/not-found";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src", "content");
  try {
    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
    return files.map((filename) => ({
      slug: filename.replace(/\.mdx$/, ""),
    }));
  } catch (err) {
    return [];
  }
}

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

async function getPostBySlug(slug: string) {
  const contentDir = path.join(process.cwd(), "src", "content");
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  
  return {
    title: data.title || slug,
    description: data.description || "",
    author: data.author || "Unknown",
    coverImage: data.coverImage || "",
    readTime: data.readTime || "",
    date: data.date || "",
    content,
  };
}

const BlogPost = async ({ params }: BlogPostProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }



  return (
    <div className="min-h-screen bg-black">
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO THE MAIN BLOG
          </Link>

          <p className="text-gray-500 text-sm mb-6">{post.date}</p>

          <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>

          <p className="text-xl text-gray-400 mb-8">{post.description}</p>

          {post.coverImage && (
            <div className="mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          )}

          <div className="flex items-center gap-3 mb-12 pb-8 border-b border-gray-800">
              <Image
                src="/blog/logo-icon.svg"
                alt="Nexlayer"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
            <div className="flex flex-col">
              <span className="text-gray-300">Posted By {post.author}</span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>
          </div>

            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-green-400 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
              <SimpleMdxRenderer content={post.content} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
