import React from "react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <h1 className="text-6xl font-bold text-white mb-8">
          Welcome to Nexlayer!
        </h1>
        <p className="text-gray-400 text-xl mb-12 leading-relaxed">
          Your AI-native cloud deployment platform
        </p>
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
          Read Our Blog
        </Link>
      </div>
    </div>
  );
}
