"use client";
import React from "react";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import BlogCodeBlock from "./BlogCodeBlock";

interface MdxRendererProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  scope?: Record<string, any>;
}


const components = {
  BlogCodeBlock,
  pre: ({ children, ...props }: any) => {
    // Render <pre> as a top-level block, never inside <p>
    return <BlogCodeBlock {...props}>{children}</BlogCodeBlock>;
  },
  code: ({ className, children, ...props }: any) => {
    // If code is inside a pre, let pre handle it (block code)
    if (typeof children === 'string' && children.includes('\n')) {
      // Block code: extract language and render as block
      const language = className?.replace('language-', '') || '';
      return <BlogCodeBlock language={language} {...props}>{children}</BlogCodeBlock>;
    }
    // Inline code: render inside <code>
    return <code className={className}>{children}</code>;
  },
};

const MdxRenderer: React.FC<MdxRendererProps> = ({ source, scope }) => {
  return <MDXRemote {...source} components={components} scope={scope} />;
};

export default MdxRenderer;
