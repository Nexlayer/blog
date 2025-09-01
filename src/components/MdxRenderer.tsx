import React from "react";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import BlogCodeBlock from "./BlogCodeBlock";

interface MdxRendererProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}


const components = {
  BlogCodeBlock,
  code: ({ className, children }: any) => {
    // Extract language from className (e.g., language-bash)
    const language = className?.replace('language-', '') || '';
    return <BlogCodeBlock language={language}>{children}</BlogCodeBlock>;
  },
};

const MdxRenderer: React.FC<MdxRendererProps> = ({ source }) => {
  return <MDXRemote {...source} components={components} />;
};

export default MdxRenderer;
