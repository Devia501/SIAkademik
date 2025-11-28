// src/services/apiService.ts

import api from './api';
import { AxiosResponse } from 'axios';

// ============================================
// 📋 TYPES & INTERFACES
// ============================================

// Laravel API Response Wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  errors?: Record<string, string[]>; // Laravel validation errors
}

// Common response types
interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// 🔑 Interface untuk data Wilayah (Provinsi/Kota)
export interface Region {
  id_province?: number;
  id_city?: number;
  id?: number; // Terkadang API Laravel menggunakan 'id' generik
  name: string;
  type?: string; // (Untuk Kota/Kabupaten)
}


export interface DocumentType {
  id_document_type: number;
  document_name: string;        
  description?: string;
  is_mandatory?: boolean;     
  is_active: boolean;
}

export interface Profile {
  id_profile?: number;
  id_user?: number;
  id_program?: number;
  id_program_2?: number; 
  id_program_3?: number; 
  registration_number?: string;
  registration_status?: 'draft' | 'submitted' | 'approved' | 'rejected';
  full_name: string;
  gender?: string; 
  religion?: string;
  birth_place?: string;
  birth_date?: string; 
  nik?: string;
  birth_certificate_number?: string;
  no_kk?: string;
  citizenship?: string;
  birth_order?: number;
  number_of_siblings?: number;
  // FIELD ALAMAT
  full_address?: string;
  dusun?: string;
  kelurahan?: string;
  kecamatan?: string;
  city_regency?: string; 
  province?: string;     
  postal_code?: string;
  phone_number?: string;
  email?: string;
  // FIELD AKADEMIK
  previous_school?: string;
  graduation_status?: string;
  last_ijazah?: string;
}

export interface Document {
  id_document?: number;
  id_profile?: number;
  id_document_type: number;
  file_path: string;
  verification_status?: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  upload_date?: string;
  document_type?: DocumentType;
  file_url?: string;
}

export interface Guardian {
  id_guardian?: number;
  id_profile?: number;
  relationship_type: string;
  full_name: string;
  address?: string;
  phone_number?: string;
  occupation?: string;
  last_education?: string;
  income_range?: string;
}

// 🔑 BARU: Achievement Interface yang disesuaikan dengan DB
export interface Achievement {
  id_achievement?: number;
  id_profile?: number;
  achievement_name: string;
  level?: string; // Digunakan sebagai fallback, tapi API/DB menggunakan 'achievement_level'
  year?: number; // Mapped dari 'year' DB field
  achievement_type?: string; // Mapped dari 'achievement_type' DB field (Jenis Prestasi)
  achievement_level?: string; // Mapped dari 'achievement_level' DB field (Tingkat Prestasi)
  organizer?: string; // Mapped dari 'organizer' DB field (Penyelenggara)
  ranking?: string; // Mapped dari 'ranking' DB field (Peringkat)
  certificate_path?: string; // Mapped dari 'certificate_path'
}

export interface RegistrationStatus {
  registration_number: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  full_name: string;
  email: string;
}

export interface Program {
  id_program: number;
  name: string;
  description?: string;
  is_active: boolean;
}

// ============================================
// 🎓 REGISTRATION SERVICE
// ============================================
export const registrationService = {
  /**
   * Get available document types
   * GET /api/registration/document-types
   */
  getDocumentTypes: async (): Promise<DocumentType[]> => {
    const response = await api.get<ApiResponse<DocumentType[]>>('/registration/document-types');
    return response.data.data; 
  },

  /**
   * Create or update profile
   * POST /api/registration/profile
   */
  storeProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const response = await api.post<ApiResponse<Profile>>('/registration/profile', data);
    return response.data.data; 
  },

  /**
   * Get current user profile
   * GET /api/registration/profile
   */
  getProfile: async (): Promise<Profile> => {
    const response = await api.get<ApiResponse<Profile>>('/registration/profile');
    return response.data.data; 
  },

  /**
   * Upload document
   * POST /api/registration/documents
   */
  uploadDocument: async (formData: FormData): Promise<Document> => {
    const response = await api.post<ApiResponse<Document>>('/registration/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data; 
  },

  /**
   * Get uploaded documents
   * GET /api/registration/documents
   */
  getDocuments: async (): Promise<Document[]> => {
    const response = await api.get<ApiResponse<Document[]>>('/registration/documents');
    return response.data.data; 
  },

  /**
   * Delete document
   * DELETE /api/registration/documents/{id_document}
   */
  deleteDocument: async (id_document: number): Promise<void> => {
    await api.delete(`/registration/documents/${id_document}`);
  },

  // 🔑 FUNGSI CRUD PRESTASI BARU
  /**
   * Add achievement
   * POST /api/registration/achievements
   */
  addAchievement: async (data: Partial<Achievement>): Promise<Achievement> => {
    const response = await api.post<ApiResponse<Achievement>>('/registration/achievements', data);
    return response.data.data; 
  },

  /**
   * Get achievements
   * GET /api/registration/achievements
   */
  getAchievements: async (): Promise<Achievement[]> => {
    const response = await api.get<ApiResponse<Achievement[]>>('/registration/achievements');
    return response.data.data; 
  },

  /**
   * Delete achievement
   * DELETE /api/registration/achievements/{id_achievement}
   */
  deleteAchievement: async (id_achievement: number): Promise<void> => {
    await api.delete(`/registration/achievements/${id_achievement}`);
  },
  // AKHIR FUNGSI PRESTASI

  /**
   * Add guardian
   * POST /api/registration/guardians
   */
  addGuardian: async (data: Partial<Guardian>): Promise<Guardian> => {
    const response = await api.post<ApiResponse<Guardian>>('/registration/guardians', data);
    return response.data.data; 
  },

  /**
   * Get guardians
   * GET /api/registration/guardians
   */
  getGuardians: async (): Promise<Guardian[]> => {
    const response = await api.get<ApiResponse<Guardian[]>>('/registration/guardians');
    return response.data.data; 
  },

  /**
   * Update guardian
   * PUT /api/registration/guardians/{id_guardian}
   */
  updateGuardian: async (id_guardian: number, data: Partial<Guardian>): Promise<Guardian> => {
    const response = await api.put<ApiResponse<Guardian>>(`/registration/guardians/${id_guardian}`, data);
    return response.data.data; 
  },

  /**
   * Delete guardian
   * DELETE /api/registration/guardians/{id_guardian}
   */
  deleteGuardian: async (id_guardian: number): Promise<void> => {
    await api.delete(`/registration/guardians/${id_guardian}`);
  },

  /**
   * Submit registration
   * POST /api/registration/submit
   */
  submitRegistration: async (): Promise<Profile> => {
    const response = await api.post<ApiResponse<Profile>>('/registration/submit');
    return response.data.data; 
  },

  /**
   * Get registration status
   * GET /api/registration/status
   */
  getRegistrationStatus: async (): Promise<RegistrationStatus> => {
    const response = await api.get<ApiResponse<RegistrationStatus>>('/registration/status');
    return response.data.data; 
  },
};

// ============================================
// 🌐 PUBLIC SERVICE
// ============================================
export const publicService = {
  /**
   * Get active programs
   * GET /api/programs
   */
  getActivePrograms: async (): Promise<Program[]> => {
    const response = await api.get<ApiResponse<Program[]>>('/programs');
    return response.data.data; 
  },

  // Get list of all provinces
  // GET /api/public/provinces
  getProvinces: async (): Promise<Region[]> => {
    const response = await api.get<ApiResponse<Region[]>>('/public/provinces');
    return response.data.data; 
  },

  // Get list of cities/regencies by province ID
  // GET /api/public/cities/{id_province}
  getCities: async (provinceId: number): Promise<Region[]> => {
      if (!provinceId) {
          throw new Error("Province ID is missing.");
      }
      const response = await api.get<ApiResponse<Region[]>>(`/public/cities/${provinceId}`);
      return response.data.data;
  },
};

// ============================================
// 📦 EXPORT
// ============================================
export default {
  registration: registrationService,
  public: publicService,
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 422) {
      // Transform Laravel validation errors jadi string
      const errors = error.response.data.errors;
      if (errors) {
        const messages = Object.values(errors).flat() as string[];
        error.userMessage = messages.join('\n');
      } else {
        error.userMessage = error.response.data.message || 'Validasi gagal';
      }
    } else if (error.response?.status === 401) {
      error.userMessage = 'Sesi login habis. Silakan login ulang.';
    } else if (error.response?.status === 500) {
      error.userMessage = 'Terjadi kesalahan server. Coba lagi nanti.';
    }
    return Promise.reject(error);
  }
);