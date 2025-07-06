// src/utils/productAssets.js
import p1 from '../assets/images/p1.png';
import p2 from '../assets/images/p2.png';
import p3 from '../assets/images/p3.png';
import p4 from '../assets/images/p4.png';

import defaultImage from '../assets/images/default.jpg';

export const imageMap = {
  'product1': p1,
  'product2': p2,
  'product3': p3,
  'product4': p4,
  'product5': p1,
  'product6': p4,
  'product7': p3,
  // add others here...
};

export const descriptionMap = {
  'p1': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  'p2': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  'p3': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  'p4': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',

};

const normalizeName = (name) =>
  name?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';

export const getProductImage = (name) => {
  const key = normalizeName(name);
  return imageMap[key] || defaultImage;
};

export const getProductDescription = (name) => {
  const key = normalizeName(name);
  return descriptionMap[key] || 'No description available.';
};
