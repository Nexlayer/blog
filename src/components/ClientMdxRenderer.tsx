"use client";
import React, { useEffect, useState } from "react";
import BlogMdxContent from "./BlogMdxContent";

interface ClientMdxRendererProps {
  source: any;
  scope?: Record<string, any>;
}

export default function ClientMdxRenderer({ source, scope }: ClientMdxRendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // render nothing on server

  return <BlogMdxContent source={source} scope={scope} />;
}
