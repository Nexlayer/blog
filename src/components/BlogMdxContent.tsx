import React from "react";
import MdxRenderer from "./MdxRenderer";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

interface BlogMdxContentProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}

const BlogMdxContent: React.FC<BlogMdxContentProps> = ({ source }) => {
  return <MdxRenderer source={source} />;
};

export default BlogMdxContent;
