"use client";
import React from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import MdxRenderer from "./MdxRenderer";

interface BlogMdxContentProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  scope?: Record<string, any>;
}

const BlogMdxContent: React.FC<BlogMdxContentProps> = ({ source, scope }) => {
  return <MdxRenderer source={source} scope={scope} />;
};

export default BlogMdxContent;
