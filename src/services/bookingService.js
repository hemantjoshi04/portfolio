import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'luxe_beauty_bookings_v1';

// --- SUPABASE MAPPERS ---
const mapToCamelCase = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    clientName: row.client_name,
    clientEmail: row.client_email,
    clientPhone: row.client_phone,
    clientAvatar: row.client_avatar,
    type: row.service_type,
    date: row.event_date,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at
  };
};

const mapToSnakeCase = (booking) => {
  const result = {};
  if (booking.id !== undefined) result.id = booking.id;
  if (booking.clientName !== undefined) result.client_name = booking.clientName;
  if (booking.clientEmail !== undefined) result.client_email = booking.clientEmail;
  if (booking.clientPhone !== undefined) result.client_phone = booking.clientPhone;
  if (booking.clientAvatar !== undefined) result.client_avatar = booking.clientAvatar;
  if (booking.type !== undefined) result.service_type = booking.type;
  if (booking.date !== undefined) result.event_date = booking.date;
  if (booking.status !== undefined) result.status = booking.status;
  if (booking.notes !== undefined) result.notes = booking.notes;
  if (booking.createdAt !== undefined) result.created_at = booking.createdAt;
  return result;
};


export const bookingService = {
  reset: async () => {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true, data: { success: true }, error: null };
  },

  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
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
        .from('bookings')
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
        ...data,
        id: Date.now().toString(),
        status: data.status || 'pending',
        createdAt: new Date().toISOString()
      };
      
      const snakeCaseData = mapToSnakeCase(newItem);

      const { data: insertedData, error } = await supabase
        .from('bookings')
        .insert([snakeCaseData])
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
      const snakeCaseData = mapToSnakeCase(data);
      
      const { data: updatedData, error } = await supabase
        .from('bookings')
        .update(snakeCaseData)
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
  
  updateStatus: async (id, status) => {
    return bookingService.update(id, { status });
  },

  delete: async (id) => {
    try {
      const { error } = await supabase
        .from('bookings')
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

