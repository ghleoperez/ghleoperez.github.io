/**
 * Utility functions for handling image URLs
 */

/**
 * Converts a GitHub blob URL to a raw URL that can be used as an image source.
 * If the URL is not a GitHub blob URL, it returns the original URL.
 * 
 * Example:
 * Input: https://github.com/ghleoperez/ghleoperez.github.io/blob/main/public/images/Avenger-grip-catalog.png
 * Output: https://raw.githubusercontent.com/ghleoperez/ghleoperez.github.io/main/public/images/Avenger-grip-catalog.png
 */
export function getOptimizedImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  
  // Handle GitHub blob URLs
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
  }
  
  return url;
}
