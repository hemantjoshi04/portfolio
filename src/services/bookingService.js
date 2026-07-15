const MOCK_DELAY = 500;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'luxe_beauty_bookings_v1';

const seedData = [
  { id: '1', clientName: 'Elena Salvatore', clientEmail: 'elena.s@example.com', clientPhone: '+1 (555) 012-3456', clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-QrplE9STovfdYC2u6Ffex5SdUZfo-kTCHqNu7sCAKe3tHEFUetEiDw1EPQ9pODYgJx3Ivh1ciKtW4i79X0ubw9ijZROcbTJnBFQOgRDC70eZ3-UzqsDk5ZpFPe02JdT5MWOvMQ4EjEKiDTws54xXCwQ8GEHDnTbIzkrlOB3ByxVNyWIE5vPKQONRH8QswhfPgLTSxB4XuIJxwLyAho25dJb8XF2JLis9q477lvyScFVqsDHv8sJ_2HnwtU9xTZL0Ya5jeqix7w7w', type: 'Bridal Editorial', date: '2023-10-24T10:00:00Z', status: 'pending', notes: 'Looking for a timeless, glowing bridal look for a winter wedding. Interested in airbrush finish.', createdAt: '2023-10-20T11:00:00Z' },
  { id: '2', clientName: 'Marcus Wright', clientEmail: 'm.wright@studio.com', clientPhone: '+1 (555) 987-6543', clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIhHnHlvW3piELignZzZnozTX8b7JmDf11X1N2iLmtBSH7_fYh2t2d6qsLRpRp8NIno6zmaATsGsZOR8TN5ktR5hVculTdTO5d6WL_-o2xjHy6NtTjJqbPUfNqfRFF11X6iQhq39apFsDZgJ8qPi9KgmYgS_QD0lnhYh1d_v9_rtYnBIzix-w3Bb3DJob0xifK04VYEoCWqiJS0mJ25ajVrXT1Qg2uk0rOpJuA5UXe1OPvJpteNltAPQ6kz1Ijq-EP_NTlb3E7J-4', type: 'High-Fashion Look', date: '2023-10-26T14:30:00Z', status: 'confirmed', notes: 'Studio shoot.', createdAt: '2023-10-21T09:30:00Z' },
  { id: '3', clientName: 'Lydia Bennet', clientEmail: 'lydia.b@couture.fr', clientPhone: '+33 6 12 34 56 78', clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxeEzGolyyteGv7D2bs_luBc9qll4qvJVs0xgZgnoNOMJQmtb7e10N9H2_-uPryR6U_dcxk3n8B1SMhGa5qBRGJIKx6Y0udLM-FxJHt375oJvcmFngRLXv-8QngvPQZ2UzAPzKBjN6TZBOlhDHsrf6io24-SHYgr6SgW1dddF-0uiOVMiFm79WvfrPkkUfnVdl3nUIj93ZbJTBKPQblytPu_V5Q82IpqPBAVKRzsJqkpWhmzmkqPD3ZsBPUgcfnkvrjt9oEZ8MioEz', type: 'Red Carpet Gala', date: '2023-11-02T18:00:00Z', status: 'pending', notes: 'Gala event.', createdAt: '2023-10-22T10:00:00Z' },
  { id: '4', clientName: 'Sophia Jensen', clientEmail: 'sjensen@vogue.co.uk', clientPhone: '+44 20 7946 0958', clientAvatar: '', type: 'Vogue Feature', date: '2023-10-15T09:00:00Z', status: 'cancelled', notes: 'Rescheduled for next month.', createdAt: '2023-10-10T09:00:00Z' },
  { id: '5', clientName: 'Amara Khan', clientEmail: 'amara.khan@global.com', clientPhone: '+91 98765 43210', clientAvatar: '', type: 'Cultural Event', date: '2023-11-12T16:00:00Z', status: 'pending', notes: 'Need traditional touch.', createdAt: '2023-10-23T11:00:00Z' }
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

export const bookingService = {
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
    const newItem = { id: Date.now().toString(), status: 'pending', ...data };
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
    items[index] = { ...items[index], ...data };
    saveData(items);
    return {
      success: true,
      data: items[index],
      error: null
    };
  },
  
  updateStatus: async (id, status) => {
      return bookingService.update(id, { status });
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
