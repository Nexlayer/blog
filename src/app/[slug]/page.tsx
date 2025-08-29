import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogMdxContent from "../../components/BlogMdxContent";
import fs from "fs";
import { ArrowLeft } from "lucide-react";
import path from "path";
import matter from "gray-matter";
import NotFound from "@/app/not-found";

import { serialize } from "next-mdx-remote/serialize";

interface BlogPostProps {
  params: { slug: string };
}

async function getPostBySlug(slug: string) {
  const contentDir = path.join(process.cwd(), "src", "content");
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  const mdxSource = await serialize(content, { scope: data });
  return {
    title: data.title || slug,
    description: data.description || "",
    author: data.author || "Unknown",
    avatar: data.avatar || "/placeholder.svg",
    readTime: data.readTime || "",
    date: data.date || "",
    mdxSource,
    content,
  };
}

const BlogPost = async ({ params }: BlogPostProps) => {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-black">
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO THE MAIN BLOG
          </Link>

          <p className="text-gray-500 text-sm mb-6">{post.date}</p>

          <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>

          <p className="text-xl text-gray-400 mb-8">{post.description}</p>

          <div className="flex items-center gap-3 mb-12 pb-8 border-b border-gray-800">
              <Image
                src={post.avatar && post.avatar.startsWith('/') ? post.avatar : '/placeholder.svg'}
                alt={post.author}
                width={40}
                height={40}
                className="rounded-full"
                style={{ objectFit: 'cover' }}
                priority
              />
            <div className="flex flex-col">
              <span className="text-gray-300">Posted By {post.author}</span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <BlogMdxContent source={post.mdxSource} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
