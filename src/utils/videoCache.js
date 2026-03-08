// Utility function to cache a video proactively
export const cacheVideo = async (videoUrl) => {
  if ('caches' in window) {
    try {
      const cache = await caches.open('video-cache-v1');
      const cachedResponse = await cache.match(videoUrl);
      
      if (cachedResponse) {
        return true; // Video is already cached
      }

      // Check if video can be fetched and cached
      const response = await fetch(videoUrl);
      if (response.ok) {
        await cache.put(videoUrl, response.clone());
        return true;
      }
    } catch (error) {
      console.log('Cache operation failed:', error);
    }
  }
  return false;
};

// Check if a video is cached
export const isVideoCached = async (videoUrl) => {
  if ('caches' in window) {
    try {
      const cache = await caches.open('video-cache-v1');
      const cachedResponse = await cache.match(videoUrl);
      return !!cachedResponse;
    } catch (error) {
      console.log('Cache check failed:', error);
      return false;
    }
  }
  return false;
};
