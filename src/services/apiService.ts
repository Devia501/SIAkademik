import api from './api';
import { AxiosResponse } from 'axios';

// ============================================
// 📋 TYPES & INTERFACES (Disesuaikan dengan Laravel)
// ============================================

// Common response types
interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Registration Types
export interface DocumentType {
  id_document_type: number;
  name: string;
  description?: string;
  is_required: boolean;
}

export interface Profile {
  id_profile?: number;
  id_user?: number;
  id_program?: number;
  registration_number?: string;
  registration_status?: 'draft' | 'submitted' | 'approved' | 'rejected';
  full_name: string;
  gender?: 'L' | 'P';
  religion?: string;
  birth_place?: string;
  birth_date?: string; // Format: YYYY-MM-DD
  nik?: string;
  birth_certificate_number?: string;
  no_kk?: string;
  citizenship?: string;
  birth_order?: number;
  number_of_siblings?: number;
  full_address?: string;
  dusun?: string;
  kelurahan?: string;
  kecamatan?: string;
  city_regency?: string;
  province?: string;
  postal_code?: string;
  phone_number?: string;
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
  file_url?: string; // Computed attribute dari Laravel
}

export interface Guardian {
  id_guardian?: number;
  id_profile?: number;
  relationship_type: string; // 'father', 'mother', 'guardian'
  full_name: string;
  address?: string;
  phone_number?: string;
  occupation?: string;
  last_education?: string;
  income_range?: string;
}

export interface Achievement {
  id_achievement?: number;
  id_profile?: number;
  achievement_name: string;
  level?: string;
  year?: number;
  certificate_file?: string;
}

export interface RegistrationStatus {
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submitted_at?: string;
  reviewed_at?: string;
  notes?: string;
  completeness_percentage: number;
}

// Admin Types
export interface Applicant {
  id_profile: number;
  full_name: string;
  registration_number?: string;
  registration_status: string;
  created_at: string;
  user?: {
    id_user: number;
    email: string;
  };
  program?: {
    id_program: number;
    name: string;
  };
}

export interface Statistics {
  total_applicants: number;
  pending_review: number;
  approved: number;
  rejected: number;
}

export interface UserManagement {
  id_user: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'pendaftar';
  created_at: string;
}

export interface Program {
  id_program: number;
  name: string;
  description?: string;
  is_active: boolean;
}

// ============================================
// 🎓 REGISTRATION SERVICE (untuk Pendaftar)
// ============================================
export const registrationService = {
  /**
   * Get available document types
   * GET /api/registration/document-types
   */
  getDocumentTypes: async (): Promise<DocumentType[]> => {
    const response = await api.get<DocumentType[]>('/registration/document-types');
    return response.data;
  },

  /**
   * Create or update profile
   * POST /api/registration/profile
   */
  storeProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const response = await api.post<Profile>('/registration/profile', data);
    return response.data;
  },

  /**
   * Get current user profile
   * GET /api/registration/profile
   */
  getProfile: async (): Promise<Profile> => {
    const response = await api.get<Profile>('/registration/profile');
    return response.data;
  },

  /**
   * Upload document
   * POST /api/registration/documents
   * FormData harus berisi: file, id_document_type
   */
  uploadDocument: async (formData: FormData): Promise<Document> => {
    const response = await api.post<Document>('/registration/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Get uploaded documents
   * GET /api/registration/documents
   */
  getDocuments: async (): Promise<Document[]> => {
    const response = await api.get<Document[]>('/registration/documents');
    return response.data;
  },

  /**
   * Delete document
   * DELETE /api/registration/documents/{id_document}
   */
  deleteDocument: async (id_document: number): Promise<void> => {
    await api.delete(`/registration/documents/${id_document}`);
  },

  /**
   * Add guardian
   * POST /api/registration/guardians
   */
  addGuardian: async (data: Partial<Guardian>): Promise<Guardian> => {
    const response = await api.post<Guardian>('/registration/guardians', data);
    return response.data;
  },

  /**
   * Get guardians
   * GET /api/registration/guardians
   */
  getGuardians: async (): Promise<Guardian[]> => {
    const response = await api.get<Guardian[]>('/registration/guardians');
    return response.data;
  },

  /**
   * Update guardian
   * PUT /api/registration/guardians/{id_guardian}
   */
  updateGuardian: async (id_guardian: number, data: Partial<Guardian>): Promise<Guardian> => {
    const response = await api.put<Guardian>(`/registration/guardians/${id_guardian}`, data);
    return response.data;
  },

  /**
   * Delete guardian
   * DELETE /api/registration/guardians/{id_guardian}
   */
  deleteGuardian: async (id_guardian: number): Promise<void> => {
    await api.delete(`/registration/guardians/${id_guardian}`);
  },

  /**
   * Add achievement
   * POST /api/registration/achievements
   */
  addAchievement: async (data: Partial<Achievement>): Promise<Achievement> => {
    const response = await api.post<Achievement>('/registration/achievements', data);
    return response.data;
  },

  /**
   * Get achievements
   * GET /api/registration/achievements
   */
  getAchievements: async (): Promise<Achievement[]> => {
    const response = await api.get<Achievement[]>('/registration/achievements');
    return response.data;
  },

  /**
   * Submit registration
   * POST /api/registration/submit
   */
  submitRegistration: async (): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/registration/submit');
    return response.data;
  },

  /**
   * Get registration status
   * GET /api/registration/status
   */
  getRegistrationStatus: async (): Promise<RegistrationStatus> => {
    const response = await api.get<RegistrationStatus>('/registration/status');
    return response.data;
  },
};

// ============================================
// 👔 ADMIN SERVICE (untuk Manager & Admin)
// ============================================
export const adminService = {
  /**
   * Get all applicants
   * GET /api/admin/applicants
   */
  getApplicants: async (params?: {
    page?: number;
    per_page?: number;
    status?: string;
    search?: string;
  }): Promise<PaginatedResponse<Applicant>> => {
    const response = await api.get<PaginatedResponse<Applicant>>('/admin/applicants', { params });
    return response.data;
  },

  /**
   * Get applicant detail
   * GET /api/admin/applicants/{id_profile}
   */
  getApplicantDetail: async (id_profile: number): Promise<any> => {
    const response = await api.get(`/admin/applicants/${id_profile}`);
    return response.data;
  },

  /**
   * Get statistics
   * GET /api/admin/statistics
   */
  getStatistics: async (): Promise<Statistics> => {
    const response = await api.get<Statistics>('/admin/statistics');
    return response.data;
  },

  /**
   * Create user (Admin only)
   * POST /api/admin/users
   */
  createUser: async (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'admin' | 'manager' | 'pendaftar';
    username?: string;
    phone?: string;
  }): Promise<UserManagement> => {
    const response = await api.post<UserManagement>('/admin/users', data);
    return response.data;
  },

  /**
   * List users (Admin only)
   * GET /api/admin/users
   */
  listUsers: async (params?: {
    page?: number;
    per_page?: number;
    role?: string;
  }): Promise<PaginatedResponse<UserManagement>> => {
    const response = await api.get<PaginatedResponse<UserManagement>>('/admin/users', { params });
    return response.data;
  },

  /**
   * Update user (Admin only)
   * PUT /api/admin/users/{id_user}
   */
  updateUser: async (id_user: number, data: Partial<UserManagement>): Promise<UserManagement> => {
    const response = await api.put<UserManagement>(`/admin/users/${id_user}`, data);
    return response.data;
  },

  /**
   * Delete user (Admin only)
   * DELETE /api/admin/users/{id_user}
   */
  deleteUser: async (id_user: number): Promise<void> => {
    await api.delete(`/admin/users/${id_user}`);
  },
};

// ============================================
// 🌐 PUBLIC SERVICE (tanpa auth)
// ============================================
export const publicService = {
  /**
   * Get active programs
   * GET /api/programs
   */
  getActivePrograms: async (): Promise<Program[]> => {
    const response = await api.get<Program[]>('/programs');
    return response.data;
  },
};

// ============================================
// 📦 EXPORT DEFAULT
// ============================================
export default {
  registration: registrationService,
  admin: adminService,
  public: publicService,
};