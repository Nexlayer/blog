import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogMdxContent from "@/components/BlogMdxContent";
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
    avatar: data.avatar || "/placeholder.svg",
    readTime: data.readTime || "",
    date: data.date || "",
    content,
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return <NotFound />;
  }
  const { serialize } = await import('next-mdx-remote/serialize');
  let mdxSource = null;
  try {
    mdxSource = await serialize(post.content || "");
  } catch (err) {
    mdxSource = null;
  }
  if (!mdxSource) {
    return <NotFound />;
  }
  return (
    <div className="min-h-screen bg-black">
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/" className="mb-8 inline-block text-blue-400 hover:underline">
            <span className="flex items-center gap-2">
              <ArrowLeft /> Back to Blog
            </span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          <p className="text-gray-400 text-lg mb-8">{post.description}</p>
          <div className="flex items-center gap-3 mb-12 pb-8 border-b border-gray-800">
            <Image src={post.avatar || '/placeholder.svg'} alt={post.author} width={40} height={40} className="rounded-full" style={{ objectFit: 'cover' }} priority />
            <div className="flex flex-col">
              <span className="text-gray-300">Posted By {post.author}</span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>
          </div>
          <div className="prose prose-invert prose-lg max-w-none">
            <BlogMdxContent source={mdxSource} />
          </div>
        </div>
      </main>
    </div>
  );
}

