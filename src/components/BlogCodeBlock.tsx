import React from "react";

interface BlogCodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

const BlogCodeBlock: React.FC<BlogCodeBlockProps> = ({ children, language }) => {
  return (
    <div className="mb-4">
      {language && (
        <div className="text-xs text-gray-400 mb-2 font-mono">
          {language}
        </div>
      )}
      <pre className="text-gray-300 text-sm overflow-x-auto rounded-lg bg-[#080d13] p-4 border border-gray-800">
        <code className={language ? `language-${language}` : undefined}>{children}</code>
      </pre>
    </div>
  );
};

export default BlogCodeBlock;
