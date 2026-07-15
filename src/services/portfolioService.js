const MOCK_DELAY = 500;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'luxe_beauty_portfolio_v1';

const seedData = [
  { 
    id: '1', 
    title: 'Bridal Glamour', 
    category: 'Bridal', 
    imageUrl: '/mock-image-1.jpg', 
    altText: 'A stunning bridal makeup look highlighting natural features',
    featured: true, 
    visible: true,
    sortOrder: 0, 
    createdAt: '2023-10-01T10:00:00Z' 
  },
  { 
    id: '2', 
    title: 'Editorial Look', 
    category: 'Editorial', 
    imageUrl: '/mock-image-2.jpg', 
    altText: 'High fashion editorial makeup with bold colors',
    featured: false, 
    visible: true,
    sortOrder: 1, 
    createdAt: '2023-10-05T12:00:00Z' 
  }
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

export const portfolioService = {
  reset: async () => {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true, data: { success: true }, error: null };
  },

  getAll: async () => {
    await delay(MOCK_DELAY);
    const data = loadData();
    return {
      success: true,
      data: data.sort((a, b) => a.sortOrder - b.sortOrder),
      error: null
    };
  },

  getById: async (id) => {
    await delay(MOCK_DELAY);
    const data = loadData();
    const item = data.find(p => p.id === id);
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
    const newItem = { 
      id: Date.now().toString(), 
      createdAt: new Date().toISOString(), 
      sortOrder: items.length,
      visible: true,
      featured: false,
      altText: '',
      ...data 
    };
    items.push(newItem);
    saveData(items);
    return {
      success: true,
      data: newItem,
      error: null
    };
  },

  update: async (id, updates) => {
    await delay(MOCK_DELAY);
    const items = loadData();
    const index = items.findIndex(p => p.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    items[index] = { ...items[index], ...updates };
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
    const index = items.findIndex(p => p.id === id);
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
  },

  uploadImage: async (file) => {
    await delay(MOCK_DELAY * 2); // Simulate slower network for upload
    if (!file) {
      return {
        success: false,
        data: null,
        error: 'No file provided'
      };
    }
    return {
      success: true,
      data: { url: `https://mock-image-server.com/uploads/${Date.now()}.jpg` },
      error: null
    };
  },

  reorder: async (updatedItems) => {
    await delay(MOCK_DELAY);
    const items = loadData();
    // Expects updatedItems to be an array of objects: { id: string, sortOrder: number }
    updatedItems.forEach(({ id, sortOrder }) => {
      const index = items.findIndex(p => p.id === id);
      if (index !== -1) {
        items[index].sortOrder = sortOrder;
      }
    });
    
    // Sort array in memory before saving
    items.sort((a, b) => a.sortOrder - b.sortOrder);
    saveData(items);

    return {
      success: true,
      data: { success: true },
      error: null
    };
  },

  toggleVisibility: async (id) => {
    await delay(MOCK_DELAY);
    const items = loadData();
    const index = items.findIndex(p => p.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    items[index].visible = !items[index].visible;
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
    const index = items.findIndex(p => p.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    items[index].featured = !items[index].featured;
    saveData(items);
    return {
      success: true,
      data: items[index],
      error: null
    };
  }
};
