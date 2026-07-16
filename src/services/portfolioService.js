import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'luxe_beauty_portfolio_v1';

// --- SUPABASE SERVICE MIGRATION ---

const mapToCamelCase = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    imageUrl: row.image_url,
    altText: row.alt_text,
    featured: row.featured,
    visible: row.visible,
    sortOrder: row.sort_order,
    createdAt: row.created_at
  };
};

export const portfolioService = {
  reset: async () => {
    // For playground purposes, we could delete all from supabase, but we'll leave it as a no-op or local clear for safety.
    localStorage.removeItem(STORAGE_KEY);
    return { success: true, data: { success: true }, error: null };
  },

  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('sort_order', { ascending: true });

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
        .from('portfolio_items')
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
      // First, get the max sort order
      const { data: maxItem, error: maxError } = await supabase
        .from('portfolio_items')
        .select('sort_order')
        .order('sort_order', { ascending: false })
        .limit(1)
        .single();
        
      const nextSortOrder = (maxItem?.sort_order ?? -1) + 1;

      const newItem = {
        id: Date.now().toString(), // Strict requirement: string ID
        title: data.title,
        category: data.category,
        image_url: data.imageUrl,
        alt_text: data.altText || '',
        featured: data.featured || false,
        visible: data.visible !== undefined ? data.visible : true,
        sort_order: nextSortOrder,
        created_at: new Date().toISOString()
      };

      const { data: insertedData, error } = await supabase
        .from('portfolio_items')
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

  update: async (id, updates) => {
    try {
      const mappedUpdates = {};
      if (updates.title !== undefined) mappedUpdates.title = updates.title;
      if (updates.category !== undefined) mappedUpdates.category = updates.category;
      if (updates.imageUrl !== undefined) mappedUpdates.image_url = updates.imageUrl;
      if (updates.altText !== undefined) mappedUpdates.alt_text = updates.altText;
      if (updates.featured !== undefined) mappedUpdates.featured = updates.featured;
      if (updates.visible !== undefined) mappedUpdates.visible = updates.visible;
      if (updates.sortOrder !== undefined) mappedUpdates.sort_order = updates.sortOrder;

      const { data, error } = await supabase
        .from('portfolio_items')
        .update(mappedUpdates)
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
        .from('portfolio_items')
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
  },

  uploadImage: async (file) => {
    if (!file) {
      return {
        success: false,
        data: null,
        error: 'No file provided'
      };
    }
    
    try {
      const ext = file.name.split('.').pop();
      const fileName = `portfolio/${Date.now()}-${crypto.randomUUID()}.${ext}`;
      
      const { data, error } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file);

      if (error) throw error;
      
      const { data: publicUrlData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);
        
      return {
        success: true,
        data: { url: publicUrlData.publicUrl },
        error: null
      };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  reorder: async (updatedItems) => {
    try {
      // updatedItems is an array: { id: string, sortOrder: number }
      // Supabase doesn't easily support bulk updating different values per row in a single query
      // without using raw SQL or an upsert with all fields.
      // We will perform a series of updates.
      
      const updatePromises = updatedItems.map(item => 
        supabase
          .from('portfolio_items')
          .update({ sort_order: item.sortOrder })
          .eq('id', item.id)
      );

      await Promise.all(updatePromises);

      return {
        success: true,
        data: { success: true },
        error: null
      };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  toggleVisibility: async (id) => {
    try {
      const { data: item, error: fetchError } = await supabase
        .from('portfolio_items')
        .select('visible')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;

      const { data, error } = await supabase
        .from('portfolio_items')
        .update({ visible: !item.visible })
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

  toggleFeatured: async (id) => {
    try {
      const { data: item, error: fetchError } = await supabase
        .from('portfolio_items')
        .select('featured')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;

      const { data, error } = await supabase
        .from('portfolio_items')
        .update({ featured: !item.featured })
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
  }
};

