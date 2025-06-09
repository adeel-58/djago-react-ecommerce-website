import p1 from '../assets/images/p1.jpg';
import defaultImage from '../assets/images/default.jpg';

export const imageMap = {
  'p1': p1,
  // Add more mappings here
};

export const descriptionMap = {
  'p1': 'A cozy and soft bed perfect for dogs of all sizes.',
};

// Normalize function
const normalizeName = (name) => {
  return name?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';
};

export const getProductImage = (name) => {
  const key = normalizeName(name);
  return imageMap[key] || defaultImage;
};

export const getProductDescription = (name) => {
  const key = normalizeName(name);
  return descriptionMap[key] || 'No description available.';
};
