// src/utils/imageHelpers.js

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

export function isAbsoluteURL(url) {
  return typeof url === 'string' && /^(?:[a-z]+:)?\/\//i.test(url);
}

export function buildImageURL(imagePath) {
  if (!imagePath) return null;

  if (isAbsoluteURL(imagePath)) {
    return imagePath;
  }

  const base = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  const img = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${base}${img}`;
}
