export const getCleanImageUrl = (url: string | undefined): string => {
  if (!url) return '';

  // Əgər URL-də Cloudinary linki varsa, yalnız onu götürür
  const cloudinaryMatch = url.match(/(https?:\/\/res\.cloudinary\.com.*)/);
  if (cloudinaryMatch) {
    return cloudinaryMatch[1];
  }

  // Əgər tam URL-dirsə (http/https ilə başlayırsa) olduğu kimi qaytar
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Digər hallarda (relativ yol), lazım gələrsə base url əlavə edilə bilər, 
  // amma hələlik olduğu kimi saxlayırıq ki, dublikat yaranmasın.
  return url;
};
