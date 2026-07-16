import { supabase } from '../lib/supabase';

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

// --- SUPABASE MAPPERS ---
const mapToCamelCase = (row) => {
  if (!row) return null;
  return {
    brandName: row.brand_name || defaultSettings.brandName,
    professionalTitle: row.professional_title || defaultSettings.professionalTitle,
    brandBio: row.brand_bio || defaultSettings.brandBio,
    primaryService: row.primary_service || defaultSettings.primaryService,
    contactEmail: row.contact_email || defaultSettings.contactEmail,
    contactPhone: row.contact_phone || defaultSettings.contactPhone,
    socialInstagram: row.social_instagram || defaultSettings.socialInstagram,
    socialBehance: row.social_behance || defaultSettings.socialBehance,
    socialYoutube: row.social_youtube || defaultSettings.socialYoutube,
    socialPinterest: row.social_pinterest || defaultSettings.socialPinterest,
    themeColor: row.theme_color || defaultSettings.themeColor,
    themeTypography: row.theme_typography || defaultSettings.themeTypography,
    pushNotifications: row.push_notifications ?? defaultSettings.pushNotifications,
    darkMode: row.dark_mode ?? defaultSettings.darkMode,
    lastUpdated: row.updated_at || defaultSettings.lastUpdated
  };
};

const mapToSnakeCase = (settings) => {
  return {
    id: 1, // Enforce single row
    brand_name: settings.brandName,
    professional_title: settings.professionalTitle,
    brand_bio: settings.brandBio,
    primary_service: settings.primaryService,
    contact_email: settings.contactEmail,
    contact_phone: settings.contactPhone,
    social_instagram: settings.socialInstagram,
    social_behance: settings.socialBehance,
    social_youtube: settings.socialYoutube,
    social_pinterest: settings.socialPinterest,
    theme_color: settings.themeColor,
    theme_typography: settings.themeTypography,
    push_notifications: settings.pushNotifications,
    dark_mode: settings.darkMode,
    updated_at: new Date().toISOString()
  };
};

export const settingsService = {
  getSettings: async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();
      
      let finalSettings;
      if (error || !data) {
        // Fallback to local cache or defaults if no DB record found
        finalSettings = settingsService.getSettingsSync();
      } else {
        finalSettings = mapToCamelCase(data);
        // Silently update local cache
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(finalSettings));
      }
      return { success: true, data: finalSettings };
    } catch (error) {
      console.error('Settings fetch error:', error);
      // Fallback on error
      return { success: true, data: settingsService.getSettingsSync() };
    }
  },

  updateSettings: async (updates) => {
    try {
      const currentRes = await settingsService.getSettings();
      const currentSettings = currentRes.data;
      
      const newSettings = {
        ...currentSettings,
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      
      const snakeCaseData = mapToSnakeCase(newSettings);
      
      const { data, error } = await supabase
        .from('site_settings')
        .upsert(snakeCaseData, { onConflict: 'id' })
        .select()
        .single();

      if (error) throw error;
      
      const finalSettings = mapToCamelCase(data);
      
      // Update local cache
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(finalSettings));
      
      // Notify listeners
      settingsEventTarget.dispatchEvent(new CustomEvent('settingsUpdated', { detail: finalSettings }));
      
      return { success: true, data: finalSettings };
    } catch (error) {
      console.error('Settings update error:', error);
      return { success: false, data: null, error: error.message };
    }
  },
  
  // Method to subscribe to changes across components
  subscribe: (callback) => {
    const handler = (e) => callback(e.detail);
    settingsEventTarget.addEventListener('settingsUpdated', handler);
    return () => settingsEventTarget.removeEventListener('settingsUpdated', handler);
  },
  
  // Synchronous get for immediate mount logic
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

