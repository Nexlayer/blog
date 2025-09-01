import React from "react";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
// import LogoIcon from "../../../public/logo-icon.svg";

function getAllPosts() {
  const contentDir = path.join(process.cwd(), "src", "content");
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files.map((filename) => {
    const filePath = path.join(contentDir, filename);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(source);

    return {
      title: data.title || filename.replace(/\.mdx$/, ""),
      description: data.description || "",
      author: data.author || "Unknown",
      avatar: data.avatar || "/placeholder.svg",
      readTime: data.readTime || "",
      slug: filename.replace(/\.mdx$/, ""),
      date: data.date || null,
    };
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 4);
  function parseCustomDate(dateStr: string | null): number {
    if (!dateStr) return 0;
    const months: { [key: string]: string } = {
      JANUARY: "01", FEBRUARY: "02", MARCH: "03", APRIL: "04", MAY: "05", JUNE: "06",
      JULY: "07", AUGUST: "08", SEPTEMBER: "09", OCTOBER: "10", NOVEMBER: "11", DECEMBER: "12"
    };
    const parts: string[] = dateStr.toUpperCase().replace(/,/g, "").split(" ");
    if (parts.length === 3 && months[parts[0] as keyof typeof months]) {
      return new Date(`${parts[2]}-${months[parts[0] as keyof typeof months]}-${parts[1].padStart(2, "0")}`).getTime();
    }
    return new Date(dateStr).getTime();
  }
  const allPosts = [...posts].sort((a, b) => {
    return parseCustomDate(b.date) - parseCustomDate(a.date);
  });
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
            <p className="text-gray-400 text-lg">
              Compiled notes from the team
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Featured</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="bg-black border border-gray-800 rounded-xl p-6 hover:bg-gray-800 transition-colors cursor-pointer h-full flex flex-col">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                      {post.description}
                    </p>

                    <div className="flex items-center gap-3 mt-auto">
                      <Image
                          src={post.avatar}
                          alt={post.author}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-300">
                          By {post.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-8">All posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {allPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="bg-black border border-gray-800 rounded-xl p-6 hover:bg-gray-800 transition-colors cursor-pointer h-full flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-grow">
                      {post.description}
                    </p>

                    <div className="flex items-center gap-3 mt-auto">
                      <Image
                          src={post.avatar}
                          alt={post.author}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-300">
                          By {post.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
