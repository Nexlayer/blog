import React from "react";
import BlogCodeBlock from "./BlogCodeBlock";

interface SimpleMdxRendererProps {
  content: string;
}

const SimpleMdxRenderer: React.FC<SimpleMdxRendererProps> = ({ content }) => {
  // Simple MDX-like rendering for static export
  // This is a basic implementation that handles common MDX elements
  
  const renderContent = (text: string) => {
    // Split content into lines and process each one
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Handle headers
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-white mb-4 mt-8">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold text-white mb-3 mt-6">{line.substring(4)}</h3>;
      }
      
      // Handle paragraphs
      if (line.trim() && !line.startsWith('#')) {
        return <p key={index} className="text-gray-300 mb-4 leading-relaxed">{line}</p>;
      }
      
      // Handle empty lines
      return <br key={index} />;
    });
  };

  return (
    <div className="prose prose-invert prose-lg max-w-none">
      {renderContent(content)}
    </div>
  );
};

export default SimpleMdxRenderer;
