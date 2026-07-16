import { supabase } from '../lib/supabase';

export const authService = {
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return { success: true, data, error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true, data: { success: true }, error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { success: true, data: { session }, error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  }
};
