import { X, Linkedin, Github } from "../components/Icons"
import { NexlayerLogo } from "../components/NexlayerLogo"

export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2a2a2a] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left side - Logo and Social Links */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <NexlayerLogo className="h-8 w-auto" />
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://x.com/nexlayerai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/nexlayerai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="http://nexlayer.com/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://docs.nexlayer.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.nexlayer.com/documentation/api-reference" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/vQWumBAR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://app.nexlayer.io/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://app.nexlayer.io/legal/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-12 pt-8 border-t border-[#2a2a2a]">
          <p className="text-gray-400 text-sm text-center">
            © 2025 Nexlayer. All rights reserved. Nexlayer – The Cloud Agents Trust™ are trademarks of AuditDeploy, Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
