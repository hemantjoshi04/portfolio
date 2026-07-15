const MOCK_DELAY = 500;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const calculateReadingTime = (content) => {
  if (!content) return 1;
  const text = content.replace(/<[^>]*>?/gm, '');
  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
};

const generateSlug = (title) => {
  if (!title) return '';
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const STORAGE_KEY = 'luxe_beauty_blogs_v1';

const seedData = [
  { id: '1', title: 'The Art of Bridal Contouring: 2024 Trends', slug: 'art-of-bridal-contouring-2024', excerpt: 'Exploring the shift from heavy baking to luminous, skin-focused bridal sculpting.', content: '<p>Exploring the shift from heavy baking to luminous, skin-focused bridal sculpting.</p>', author: 'Abhilasha Singh', status: 'published', category: 'Bridal', tags: ['Bridal', 'Trends', 'Contouring'], readingTime: 12, views: 1200, comments: 42, publishedAt: '2023-10-24T12:00:00Z', createdAt: '2023-10-20T09:00:00Z', updatedAt: '2023-10-24T12:00:00Z', coverImageUrl: null },
  { id: '2', title: 'Seasonal Skincare for Professional MUA\'s', slug: 'seasonal-skincare-mua', excerpt: 'A guide to seasonal skincare.', content: '<p>A guide to seasonal skincare.</p>', author: 'Abhilasha', status: 'draft', category: 'Editorial', tags: ['Skincare', 'Professional'], readingTime: 5, views: 0, comments: 0, publishedAt: null, createdAt: '2023-10-26T10:00:00Z', updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), coverImageUrl: null },
  { id: '3', title: 'Summer Glow Skin Preparation', slug: 'summer-glow-skin-prep', excerpt: 'Summer glow essentials.', content: '<p>Summer glow essentials.</p>', author: 'Abhilasha', status: 'scheduled', category: 'Tutorial', tags: ['Summer', 'Glow'], readingTime: 4, views: 0, comments: 0, publishedAt: '2024-07-12T09:00:00Z', createdAt: '2023-10-27T10:00:00Z', updatedAt: '2023-10-27T10:00:00Z', coverImageUrl: null }
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

export const blogService = {
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
    const item = items.find(b => b.id === id);
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
    const now = new Date().toISOString();
    const readingTime = calculateReadingTime(data.content || '');
    const slug = generateSlug(data.title || 'untitled');
    
    const newItem = { 
      id: Date.now().toString(),
      author: 'Abhilasha Singh',
      status: 'draft',
      category: 'Uncategorized',
      tags: [],
      views: 0,
      comments: 0,
      publishedAt: null,
      coverImageUrl: null,
      ...data,
      slug,
      readingTime,
      createdAt: now,
      updatedAt: now
    };
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
    const index = items.findIndex(b => b.id === id);
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Not found'
      };
    }
    
    const updatedData = { ...data };
    if (updatedData.content !== undefined) {
      updatedData.readingTime = calculateReadingTime(updatedData.content);
    }
    if (updatedData.title !== undefined) {
      updatedData.slug = generateSlug(updatedData.title);
    }
    updatedData.updatedAt = new Date().toISOString();
    
    items[index] = { ...items[index], ...updatedData };
    saveData(items);
    return {
      success: true,
      data: items[index],
      error: null
    };
  },

  publish: async (id) => {
    return blogService.update(id, { 
      status: 'published', 
      publishedAt: new Date().toISOString() 
    });
  },

  unpublish: async (id) => {
    return blogService.update(id, { 
      status: 'draft', 
      publishedAt: null 
    });
  },

  uploadImage: async (file) => {
    await delay(MOCK_DELAY);
    // Mock local placeholder
    return {
      success: true,
      data: {
        url: '/images/placeholders/blog-placeholder.jpg'
      },
      error: null
    };
  },

  delete: async (id) => {
    await delay(MOCK_DELAY);
    const items = loadData();
    const index = items.findIndex(b => b.id === id);
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
