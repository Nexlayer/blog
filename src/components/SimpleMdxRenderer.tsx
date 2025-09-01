import React from "react";
import BlogCodeBlock from "./BlogCodeBlock";

interface SimpleMdxRendererProps {
  content: string;
}

const SimpleMdxRenderer: React.FC<SimpleMdxRendererProps> = ({ content }) => {
  // Enhanced MDX-like rendering for static export
  // This handles more MDX features while remaining static-compatible
  
  const renderContent = (text: string) => {
    // Split content into lines and process each one
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];
    let inList = false;
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Handle headers
      if (trimmedLine.startsWith('## ')) {
        if (inList && currentList.length > 0) {
          elements.push(<ul key={`list-${index}`} className="list-disc list-inside mb-4 text-gray-300">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        elements.push(<h2 key={index} className="text-2xl font-bold text-white mb-4 mt-8">{trimmedLine.substring(3)}</h2>);
        return;
      }
      
      if (trimmedLine.startsWith('### ')) {
        if (inList && currentList.length > 0) {
          elements.push(<ul key={`list-${index}`} className="list-disc list-inside mb-4 text-gray-300">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        elements.push(<h3 key={index} className="text-xl font-bold text-white mb-3 mt-6">{trimmedLine.substring(4)}</h3>);
        return;
      }
      
      // Handle lists
      if (trimmedLine.startsWith('- **') || trimmedLine.startsWith('* **')) {
        if (!inList) {
          inList = true;
        }
        
        // Extract bold text and description
        const match = trimmedLine.match(/^[-*]\s\*\*(.*?)\*\*:\s*(.*)/);
        if (match) {
          const [, boldText, description] = match;
          currentList.push(
            <li key={`list-item-${index}`} className="mb-2">
              <strong className="text-white">{boldText}</strong>: <span className="text-gray-300">{description}</span>
            </li>
          );
        } else {
          // Handle regular list items
          const listText = trimmedLine.replace(/^[-*]\s/, '');
          currentList.push(
            <li key={`list-item-${index}`} className="mb-2 text-gray-300">{listText}</li>
          );
        }
        return;
      }
      
      // Handle regular list items
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        if (!inList) {
          inList = true;
        }
        const listText = trimmedLine.replace(/^[-*]\s/, '');
        currentList.push(
          <li key={`list-item-${index}`} className="mb-2 text-gray-300">{listText}</li>
        );
        return;
      }
      
      // Handle code blocks
      if (trimmedLine.startsWith('```')) {
        if (inList && currentList.length > 0) {
          elements.push(<ul key={`list-${index}`} className="list-disc list-inside mb-4 text-gray-300">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        
        // Start of code block
        const language = trimmedLine.replace('```', '').trim();
        const codeLines: string[] = [];
        let i = index + 1;
        
        // Collect code lines until we find the closing ```
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        
        if (i < lines.length) {
          // Skip the closing ``` line in the main loop
          index = i;
        }
        
        const codeContent = codeLines.join('\n');
        elements.push(
          <BlogCodeBlock key={`code-${index}`} language={language}>
            {codeContent}
          </BlogCodeBlock>
        );
        return;
      }
      
      // Handle paragraphs (non-empty lines that aren't headers, list items, or code blocks)
      if (trimmedLine && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('-') && !trimmedLine.startsWith('*') && !trimmedLine.startsWith('```')) {
        if (inList && currentList.length > 0) {
          elements.push(<ul key={`list-${index}`} className="list-disc list-inside mb-4 text-gray-300">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        
        // Process bold text and inline code within paragraphs
        let processedText = trimmedLine
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm">$1</code>');
        
        elements.push(
          <p key={index} className="text-gray-300 mb-4 leading-relaxed" 
             dangerouslySetInnerHTML={{ __html: processedText }} />
        );
        return;
      }
      
      // Handle empty lines
      if (!trimmedLine) {
        if (inList && currentList.length > 0) {
          elements.push(<ul key={`list-${index}`} className="list-disc list-inside mb-4 text-gray-300">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        elements.push(<br key={index} />);
      }
    });
    
    // Handle any remaining list
    if (inList && currentList.length > 0) {
      elements.push(<ul key="final-list" className="list-disc list-inside mb-4 text-gray-300">{currentList}</ul>);
    }
    
    return elements;
  };

  return (
    <div className="prose prose-invert prose-lg max-w-none">
      {renderContent(content)}
    </div>
  );
};

export default SimpleMdxRenderer;
