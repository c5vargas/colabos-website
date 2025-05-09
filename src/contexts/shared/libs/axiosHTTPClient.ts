/**
 * Cliente HTTP basado en Axios para ColabOS
 * Proporciona funcionalidad para realizar peticiones HTTP autenticadas y no autenticadas
 */
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { useAuth } from '@clerk/clerk-react';

// Tipos para mejorar la legibilidad y mantenibilidad
export type ApiResponse<T> = Promise<AxiosResponse<T>>;
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

// Interfaces para los tipos de datos
export interface RequestData {
  [key: string]: unknown;
}

// Configuración base para todas las instancias de axios
const createAxiosConfig = (customConfig?: AxiosRequestConfig): AxiosRequestConfig => ({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  ...customConfig,
});

// Instancia base de axios
const axiosClient: AxiosInstance = axios.create(createAxiosConfig());

/**
 * Hook para obtener un cliente HTTP autenticado con el token de Clerk
 * @returns Cliente HTTP con interceptor para añadir token de autenticación
 */
export const useAuthenticatedClient = () => {
  const { getToken } = useAuth();

  axiosClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  });

  // Función para crear una nueva instancia con la misma configuración
  const createCustomClient = (customConfig?: AxiosRequestConfig): AxiosInstance => {
    return axios.create(createAxiosConfig(customConfig));
  };

  // Objeto con métodos helper para peticiones autenticadas
  const authClient = {
    get: <T>(url: string, config?: AxiosRequestConfig): ApiResponse<T> =>
      axiosClient.get<T>(url, config),
    post: <T>(url: string, data?: RequestData, config?: AxiosRequestConfig): ApiResponse<T> =>
      axiosClient.post<T>(url, data, config),
    put: <T>(url: string, data?: RequestData, config?: AxiosRequestConfig): ApiResponse<T> =>
      axiosClient.put<T>(url, data, config),
    patch: <T>(url: string, data?: RequestData, config?: AxiosRequestConfig): ApiResponse<T> =>
      axiosClient.patch<T>(url, data, config),
    delete: <T>(url: string, config?: AxiosRequestConfig): ApiResponse<T> =>
      axiosClient.delete<T>(url, config),
    instance: axiosClient,
    createCustomClient,
  };

  return authClient;
};

/**
 * Cliente HTTP para peticiones sin autenticación
 */
const createApiClient = (instance: AxiosInstance) => ({
  get: <T>(url: string, config?: AxiosRequestConfig): ApiResponse<T> =>
    instance.get<T>(url, config),
  post: <T>(url: string, data?: RequestData, config?: AxiosRequestConfig): ApiResponse<T> =>
    instance.post<T>(url, data, config),
  put: <T>(url: string, data?: RequestData, config?: AxiosRequestConfig): ApiResponse<T> =>
    instance.put<T>(url, data, config),
  patch: <T>(url: string, data?: RequestData, config?: AxiosRequestConfig): ApiResponse<T> =>
    instance.patch<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig): ApiResponse<T> =>
    instance.delete<T>(url, config),
  instance,
});

// Cliente HTTP para peticiones sin autenticación
export const httpClient = createApiClient(axiosClient);

// Exportación por defecto para mantener compatibilidad con código existente
export default httpClient;
