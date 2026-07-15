const MOCK_DELAY = 500;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let mockPortfolio = [
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

export const portfolioService = {
  getAll: async () => {
    await delay(MOCK_DELAY);
    return {
      success: true,
      data: [...mockPortfolio].sort((a, b) => a.sortOrder - b.sortOrder),
      error: null
    };
  },

  getById: async (id) => {
    await delay(MOCK_DELAY);
    const item = mockPortfolio.find(p => p.id === id);
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
    const newItem = { 
      id: Date.now().toString(), 
      createdAt: new Date().toISOString(), 
      sortOrder: mockPortfolio.length,
      visible: true,
      featured: false,
      altText: '',
      ...data 
    };
    mockPortfolio.push(newItem);
    return {
      success: true,
      data: newItem,
      error: null
    };
  },

  update: async (id, data) => {
    await delay(MOCK_DELAY);
    const index = mockPortfolio.findIndex(p => p.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    mockPortfolio[index] = { ...mockPortfolio[index], ...data };
    return {
      success: true,
      data: mockPortfolio[index],
      error: null
    };
  },

  delete: async (id) => {
    await delay(MOCK_DELAY);
    const index = mockPortfolio.findIndex(p => p.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    mockPortfolio.splice(index, 1);
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

  reorder: async (items) => {
    await delay(MOCK_DELAY);
    // Expects items to be an array of objects: { id: string, sortOrder: number }
    items.forEach(({ id, sortOrder }) => {
      const index = mockPortfolio.findIndex(p => p.id === id);
      if (index !== -1) {
        mockPortfolio[index].sortOrder = sortOrder;
      }
    });
    
    // Sort array in memory
    mockPortfolio.sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      success: true,
      data: { success: true },
      error: null
    };
  },

  toggleVisibility: async (id) => {
    await delay(MOCK_DELAY);
    const index = mockPortfolio.findIndex(p => p.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    mockPortfolio[index].visible = !mockPortfolio[index].visible;
    return {
      success: true,
      data: mockPortfolio[index],
      error: null
    };
  },

  toggleFeatured: async (id) => {
    await delay(MOCK_DELAY);
    const index = mockPortfolio.findIndex(p => p.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    mockPortfolio[index].featured = !mockPortfolio[index].featured;
    return {
      success: true,
      data: mockPortfolio[index],
      error: null
    };
  }
};
