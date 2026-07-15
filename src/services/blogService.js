const MOCK_DELAY = 500;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockBlogs = [
  { id: '1', title: 'Skincare Routine for Brides-to-be', excerpt: 'Get glowing skin before your big day...', content: '<p>Get glowing skin before your big day with these simple steps.</p>', author: 'Abhilasha', status: 'published', publishedAt: '2023-10-10T09:00:00Z', createdAt: '2023-10-09T14:00:00Z', coverImageUrl: '/blog-1.jpg' },
  { id: '2', title: 'Summer Glow Essentials', excerpt: 'Must haves for summer.', content: '<p>Must haves for summer.</p>', author: 'Abhilasha', status: 'draft', publishedAt: null, createdAt: '2023-10-11T11:00:00Z', coverImageUrl: '/blog-2.jpg' }
];

export const blogService = {
  getAll: async () => {
    await delay(MOCK_DELAY);
    return {
      success: true,
      data: [...mockBlogs],
      error: null
    };
  },

  getById: async (id) => {
    await delay(MOCK_DELAY);
    const item = mockBlogs.find(b => b.id === id);
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
    const newItem = { id: Date.now().toString(), ...data };
    mockBlogs.push(newItem);
    return {
      success: true,
      data: newItem,
      error: null
    };
  },

  update: async (id, data) => {
    await delay(MOCK_DELAY);
    const index = mockBlogs.findIndex(b => b.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    mockBlogs[index] = { ...mockBlogs[index], ...data };
    return {
      success: true,
      data: mockBlogs[index],
      error: null
    };
  },

  delete: async (id) => {
    await delay(MOCK_DELAY);
    const index = mockBlogs.findIndex(b => b.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    mockBlogs.splice(index, 1);
    return {
      success: true,
      data: { success: true },
      error: null
    };
  }
};
