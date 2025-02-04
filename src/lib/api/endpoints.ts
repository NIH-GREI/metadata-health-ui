'use client'

import { apiClient } from './client';
import {
  Provider,
  Client,
  ApiResponse,
  ClientFetchError,
  ProviderFetchError
} from '../types/api';

import { fetchProviderData } from '@/utils/api';

const API_BASE = '/api/v1';

export const getProviders = async (): Promise<Provider[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Provider[]>>(`${API_BASE}/providers/attributes`);
    return response.data.data;
  } catch (error) {
    throw new ProviderFetchError('Failed to fetch providers', 'all', undefined, error);
  }
};

export const getProviderDetails = async (providerId: string): Promise<Provider> => {
  try {
    // First, try to get the data from the uploaded file
    const response = await fetchProviderData(providerId);

    if (response.data) {
      // If we found the uploaded file, return its data
      // const data = await response.json();
      // return data;
      const temp = response.data.data;
      console.log("DATA", temp);
      return temp;
    }

    // If no local file is found, try the API
    const apiResponse = await apiClient.get<ApiResponse<Provider>>(`${API_BASE}/providers/${providerId}`);
    return apiResponse.data.data;
  } catch (error) {
    throw new ProviderFetchError('Failed to fetch provider details', providerId, undefined, error);
  }
};

export const getProviderStats = async (providerId: string): Promise<Provider> => {
  try {
    const response = await apiClient.get<ApiResponse<Provider>>(`${API_BASE}/providers/${providerId}/stats`);
    return response.data.data;
  } catch (error) {
    throw new ProviderFetchError('Failed to fetch provider stats', providerId, undefined, error);
  }
};

export const getProviderClientsList = async (providerId: string): Promise<Client[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Client[]>>(`${API_BASE}/providers/${providerId}/clients`);
    return response.data.data;
  } catch (error) {
    throw new ProviderFetchError('Failed to fetch provider clients list', providerId, undefined, error);
  }
};

export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Client[]>>(`${API_BASE}/clients/attributes`);
    return response.data.data;
  } catch (error) {
    throw new ClientFetchError('Failed to fetch clients', 'all', undefined, error);
  }
};

export const getClient = async (clientId: string): Promise<Client> => {
  try {
    const response = await apiClient.get<ApiResponse<Client>>(`${API_BASE}/clients/${clientId}`);
    return response.data.data;
  } catch (error) {
    throw new ClientFetchError('Failed to fetch client', clientId, undefined, error);
  }
};

export const getClientStats = async (clientId: string): Promise<Client> => {
  try {
    const response = await apiClient.get<ApiResponse<Client>>(`${API_BASE}/clients/${clientId}/stats`);
    return response.data.data;
  } catch (error) {
    throw new ClientFetchError('Failed to fetch client stats', clientId, undefined, error);
  }
};