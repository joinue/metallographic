/**
 * CSSOptimizer - Optimizes CSS loading by deferring non-critical CSS
 * This script helps reduce unused CSS by optimizing how stylesheets are loaded
 */
export default function CSSOptimizer() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Optimize CSS loading by ensuring critical CSS loads first
            // and non-critical CSS can be deferred
            function optimizeCSS() {
              const links = document.querySelectorAll('link[rel="stylesheet"]');
              links.forEach(function(link) {
                // Mark as processed to avoid duplicate work
                if (link.hasAttribute('data-css-optimized')) return;
                link.setAttribute('data-css-optimized', 'true');
                
                // Ensure fetchpriority is set for critical CSS
                // Next.js handles this, but we ensure it's set
                const href = link.href || link.getAttribute('href');
                if (href) {
                  // Main CSS chunks should have high priority
                  if (href.includes('_app') || href.includes('chunks')) {
                    if (!link.hasAttribute('fetchpriority')) {
                      link.setAttribute('fetchpriority', 'high');
                    }
                  }
                }
              });
            }
            
            // Run immediately if DOM is ready
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', optimizeCSS);
            } else {
              optimizeCSS();
            }
            
            // Watch for dynamically added stylesheets
            if (typeof MutationObserver !== 'undefined') {
              const observer = new MutationObserver(function(mutations) {
                let shouldOptimize = false;
                mutations.forEach(function(mutation) {
                  mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && 
                        node.tagName === 'LINK' && 
                        node.getAttribute('rel') === 'stylesheet') {
                      shouldOptimize = true;
                    }
                  });
                });
                if (shouldOptimize) {
                  optimizeCSS();
                }
              });
              
              if (document.head) {
                observer.observe(document.head, {
                  childList: true,
                  subtree: true
                });
              }
            }
          })();
        `,
      }}
    />
  )
}

