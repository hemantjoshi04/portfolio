const MOCK_DELAY = 500;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'luxe_beauty_testimonials_v1';

const seedData = [
  { id: '1', clientName: 'Sophia Henderson', clientPhoto: null, service: 'Bridal Client', text: 'Abhilasha completely transformed my look for my wedding day. The makeup was weightless and lasted through all the dancing and tears. A true artist who understands modern elegance.', rating: 5, status: 'approved', isFeatured: true, source: 'manual', createdAt: '2023-10-21T09:00:00Z' },
  { id: '2', clientName: 'Marcus Thorne', clientPhoto: null, service: 'Editorial Director', text: 'The editorial session was fantastic. Her attention to detail for high-resolution photography is unmatched. The contouring was flawless and required zero retouching on our end.', rating: 5, status: 'approved', isFeatured: false, source: 'manual', createdAt: '2023-09-15T10:00:00Z' },
  { id: '3', clientName: 'Elena Rodriguez', clientPhoto: null, service: 'Private Client', text: 'Professional, punctual, and highly skilled. I\'ve worked with many artists in Mumbai and Paris, and Abhilasha\'s eye for skin texture and minimalism is truly world-class.', rating: 5, status: 'approved', isFeatured: true, source: 'manual', createdAt: '2023-08-10T14:30:00Z' },
  { id: '4', clientName: 'Priya Kapur', clientPhoto: null, service: 'Bridal Client', text: 'The makeup trial was so helpful. She listened to all my concerns about sensitive skin and used the most premium hypoallergenic products. Felt like royalty.', rating: 5, status: 'approved', isFeatured: false, source: 'manual', createdAt: '2023-07-22T11:00:00Z' }
];

const loadData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse from localStorage, resetting data', e);
    localStorage.removeItem(STORAGE_KEY);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
  return [...seedData];
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const testimonialService = {
  reset: async () => {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true, data: { success: true }, error: null };
  },

  getAll: async () => {
    await delay(MOCK_DELAY);
    const data = loadData();
    return {
      success: true,
      data,
      error: null
    };
  },

  getById: async (id) => {
    await delay(MOCK_DELAY);
    const items = loadData();
    const item = items.find(t => t.id === id);
    if (!item) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    return {
      success: true,
      data: { ...item },
      error: null
    };
  },

  create: async (data) => {
    await delay(MOCK_DELAY);
    const items = loadData();
    const newItem = { id: Date.now().toString(), status: 'approved', isFeatured: false, clientPhoto: null, service: 'Client', source: 'manual', ...data };
    items.push(newItem);
    saveData(items);
    return {
      success: true,
      data: newItem,
      error: null
    };
  },

  update: async (id, data) => {
    await delay(MOCK_DELAY);
    const items = loadData();
    const index = items.findIndex(t => t.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    items[index] = { ...items[index], ...data };
    saveData(items);
    return {
      success: true,
      data: items[index],
      error: null
    };
  },

  toggleFeatured: async (id) => {
    await delay(MOCK_DELAY);
    const items = loadData();
    const index = items.findIndex(t => t.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    items[index] = { ...items[index], isFeatured: !items[index].isFeatured };
    saveData(items);
    return {
      success: true,
      data: items[index],
      error: null
    };
  },

  delete: async (id) => {
    await delay(MOCK_DELAY);
    const items = loadData();
    const index = items.findIndex(t => t.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    items.splice(index, 1);
    saveData(items);
    return {
      success: true,
      data: { success: true },
      error: null
    };
  }
};
