import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'luxe_beauty_testimonials_v1';

// --- SUPABASE SERVICE MIGRATION ---
const mapToCamelCase = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    clientName: row.client_name,
    clientPhoto: row.client_photo,
    service: row.service,
    text: row.text,
    rating: row.rating,
    status: row.status,
    isFeatured: row.is_featured,
    source: row.source,
    googleReviewId: row.google_review_id,
    createdAt: row.created_at
  };
};

export const testimonialService = {
  reset: async () => {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true, data: { success: true }, error: null };
  },

  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return {
        success: true,
        data: data.map(mapToCamelCase),
        error: null
      };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  getById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return {
        success: true,
        data: mapToCamelCase(data),
        error: null
      };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  create: async (data) => {
    try {
      const newItem = {
        id: Date.now().toString(),
        client_name: data.clientName,
        client_photo: data.clientPhoto || null,
        service: data.service || 'Client',
        text: data.text,
        rating: data.rating,
        status: data.status || 'approved',
        is_featured: data.isFeatured || false,
        source: data.source || 'manual',
        created_at: data.createdAt || new Date().toISOString()
      };

      const { data: insertedData, error } = await supabase
        .from('testimonials')
        .insert([newItem])
        .select()
        .single();

      if (error) throw error;
      return {
        success: true,
        data: mapToCamelCase(insertedData),
        error: null
      };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  update: async (id, data) => {
    try {
      const mappedUpdates = {};
      if (data.clientName !== undefined) mappedUpdates.client_name = data.clientName;
      if (data.clientPhoto !== undefined) mappedUpdates.client_photo = data.clientPhoto;
      if (data.service !== undefined) mappedUpdates.service = data.service;
      if (data.text !== undefined) mappedUpdates.text = data.text;
      if (data.rating !== undefined) mappedUpdates.rating = data.rating;
      if (data.status !== undefined) mappedUpdates.status = data.status;
      if (data.isFeatured !== undefined) mappedUpdates.is_featured = data.isFeatured;
      if (data.source !== undefined) mappedUpdates.source = data.source;

      const { data: updatedData, error } = await supabase
        .from('testimonials')
        .update(mappedUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return {
        success: true,
        data: mapToCamelCase(updatedData),
        error: null
      };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  toggleFeatured: async (id) => {
    try {
      const { data: item, error: fetchError } = await supabase
        .from('testimonials')
        .select('is_featured')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;

      const { data, error } = await supabase
        .from('testimonials')
        .update({ is_featured: !item.is_featured })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return {
        success: true,
        data: mapToCamelCase(data),
        error: null
      };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  delete: async (id) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return {
        success: true,
        data: { success: true },
        error: null
      };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  }
};

