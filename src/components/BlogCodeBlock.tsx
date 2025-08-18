"use client";
import React from "react";

interface BlogCodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

const BlogCodeBlock: React.FC<BlogCodeBlockProps> = ({ children, language }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-8">
      <pre className="text-gray-300 text-sm overflow-x-auto rounded-lg bg-[#080d13] p-4">
        <code className={language ? `language-${language}` : undefined}>{children}</code>
      </pre>
    </div>
  );
};

export default BlogCodeBlock;
