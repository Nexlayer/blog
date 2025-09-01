import React from "react";
import { NexlayerLogo } from "./NexlayerLogo";

export const StaticNavigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2">
            <a href="/blog" className="flex items-center">
              <NexlayerLogo className="h-6 sm:h-7 w-auto" />
            </a>
            <span className="bg-teal-900/50 text-cyan-400 text-xs font-medium px-2 py-1 rounded border border-cyan-400/30">
              <span className="max-[374px]:hidden">🚀 Join</span> Beta
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <a
              href="https://jnsbqhb7fyt.typeform.com/to/a9DtuhOo?utm_source=website&utm_medium=hero_cta&utm_campaign=mcp_onboarding_q3_2025&utm_term=intent_ship_now&utm_content=home_v1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white !text-black hover:bg-transparent hover:border-cyan-400 hover:border-2 border-2 hover:!text-cyan-400 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 font-medium rounded-lg transition-all duration-300"
            >
              <span className="hidden sm:inline">Join the Beta</span>
              <span className="sm:hidden">Beta</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StaticNavigation;
