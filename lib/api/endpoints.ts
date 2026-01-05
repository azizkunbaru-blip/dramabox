export const endpointMap = {
  getForYou: ['/drama/for-you', '/for-you', '/home'],
  getLatest: ['/drama/latest', '/latest', '/drama/terbaru'],
  getPopular: ['/drama/popular', '/popular', '/drama/trending'],
  getDubLatest: ['/drama/dub/latest', '/dub/latest', '/dubbing/latest'],
  getDubPopular: ['/drama/dub/popular', '/dub/popular', '/dubbing/popular'],
  search: ['/drama/search', '/search'],
  getDetail: ['/drama', '/detail', '/drama/detail'],
  getEpisodes: ['/drama/episodes', '/episodes', '/drama/list-episode'],
  getStream: ['/drama/stream', '/stream', '/watch']
};

export const defaultBaseUrls = [
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dramabox.sansekai.my.id/api',
  'https://api.sansekai.my.id'
];
