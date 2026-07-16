import { supabase } from '../lib/supabase';

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

// --- SUPABASE MAPPERS ---
const mapToCamelCase = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    status: row.status,
    category: row.category,
    tags: row.tags || [],
    readingTime: row.reading_time,
    views: row.views,
    comments: row.comments,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    coverImageUrl: row.cover_image_url
  };
};

const mapToSnakeCase = (post) => {
  const result = {};
  if (post.id !== undefined) result.id = post.id;
  if (post.title !== undefined) result.title = post.title;
  if (post.slug !== undefined) result.slug = post.slug;
  if (post.excerpt !== undefined) result.excerpt = post.excerpt;
  if (post.content !== undefined) result.content = post.content;
  if (post.author !== undefined) result.author = post.author;
  if (post.status !== undefined) result.status = post.status;
  if (post.category !== undefined) result.category = post.category;
  if (post.tags !== undefined) result.tags = post.tags;
  if (post.readingTime !== undefined) result.reading_time = post.readingTime;
  if (post.views !== undefined) result.views = post.views;
  if (post.comments !== undefined) result.comments = post.comments;
  if (post.publishedAt !== undefined) result.published_at = post.publishedAt;
  if (post.createdAt !== undefined) result.created_at = post.createdAt;
  if (post.updatedAt !== undefined) result.updated_at = post.updatedAt;
  if (post.coverImageUrl !== undefined) result.cover_image_url = post.coverImageUrl;
  return result;
};


export const blogService = {
  reset: async () => {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true, data: { success: true }, error: null };
  },

  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data: data.map(mapToCamelCase), error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  getById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { success: true, data: mapToCamelCase(data), error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  getBySlug: async (slug) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return { success: true, data: mapToCamelCase(data), error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  getRelatedByCategory: async (category, excludeId, limit = 3) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .eq('category', category)
        .neq('id', excludeId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { success: true, data: data.map(mapToCamelCase), error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  create: async (data) => {
    try {
      const now = new Date().toISOString();
      const readingTime = calculateReadingTime(data.content || '');
      
      let baseSlug = generateSlug(data.title || 'untitled');
      let finalSlug = baseSlug;
      let counter = 1;

      // Ensure slug uniqueness
      while (true) {
        const { count } = await supabase
          .from('blog_posts')
          .select('slug', { count: 'exact', head: true })
          .eq('slug', finalSlug);
          
        if (count === 0) break;
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }

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
        slug: finalSlug,
        readingTime,
        createdAt: now,
        updatedAt: now
      };

      const snakeCaseData = mapToSnakeCase(newItem);

      const { data: insertedData, error } = await supabase
        .from('blog_posts')
        .insert([snakeCaseData])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data: mapToCamelCase(insertedData), error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  update: async (id, data) => {
    try {
      const updatedData = { ...data };
      if (updatedData.content !== undefined) {
        updatedData.readingTime = calculateReadingTime(updatedData.content);
      }
      if (updatedData.title !== undefined) {
        updatedData.slug = generateSlug(updatedData.title);
      }
      updatedData.updatedAt = new Date().toISOString();

      const snakeCaseData = mapToSnakeCase(updatedData);

      const { data: resultData, error } = await supabase
        .from('blog_posts')
        .update(snakeCaseData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data: mapToCamelCase(resultData), error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
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
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-assets')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('blog-assets')
        .getPublicUrl(filePath);

      return {
        success: true,
        data: { url: data.publicUrl },
        error: null
      };
    } catch (error) {
      console.error('Error uploading blog image:', error);
      return { success: false, data: null, error: error.message };
    }
  },

  delete: async (id) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true, data: { success: true }, error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  }
};

