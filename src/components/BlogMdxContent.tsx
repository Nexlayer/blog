"use client";
import React from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import MdxRenderer from "./MdxRenderer";

interface BlogMdxContentProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}

const BlogMdxContent: React.FC<BlogMdxContentProps> = ({ source }) => {
  return <MdxRenderer source={source} />;
};

export default BlogMdxContent;
