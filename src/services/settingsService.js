const SETTINGS_STORAGE_KEY = 'luxe_beauty_settings';

const defaultSettings = {
  brandName: 'Artistry By Abhilasha',
  professionalTitle: 'Creative Director & Senior MUA',
  brandBio: 'Luxury beauty services specializing in editorial, bridal, and high-fashion makeup artistry. Curating elegance through professional techniques and premium products.',
  primaryService: 'Bridal Artistry',
  contactEmail: 'hello@artistrybyabhilasha.com',
  contactPhone: '+91 98765 43210',
  socialInstagram: '@abhilasha_artistry',
  socialBehance: 'behance.net/abhilashamua',
  socialYoutube: 'youtube.com/c/ArtistryByAbhilasha',
  socialPinterest: 'pinterest.com/abhilashamua',
  themeColor: 'Gold',
  themeTypography: 'Playfair Display',
  pushNotifications: true,
  darkMode: false,
  lastUpdated: new Date().toISOString()
};

// Event target to notify listeners of changes
const settingsEventTarget = new EventTarget();

export const settingsService = {
  getSettings: async () => {
    // Simulate slight network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      try {
        return { success: true, data: JSON.parse(stored) };
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
    return { success: true, data: { ...defaultSettings } };
  },

  updateSettings: async (updates) => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate save delay
    const currentRes = await settingsService.getSettings();
    const currentSettings = currentRes.data;
    
    const newSettings = {
      ...currentSettings,
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    
    // Notify listeners
    settingsEventTarget.dispatchEvent(new CustomEvent('settingsUpdated', { detail: newSettings }));
    
    return { success: true, data: newSettings };
  },
  
  // Method to subscribe to changes across components
  subscribe: (callback) => {
    const handler = (e) => callback(e.detail);
    settingsEventTarget.addEventListener('settingsUpdated', handler);
    return () => settingsEventTarget.removeEventListener('settingsUpdated', handler);
  },
  
  // Synchronous get for immediate mount logic if needed
  getSettingsSync: () => {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // ignore
      }
    }
    return { ...defaultSettings };
  }
};
