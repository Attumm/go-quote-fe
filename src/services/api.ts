import axios from 'axios';
import {
  GenericApiResponse,
  PaginatedQuotes,
  PaginatedAuthors,
  PaginatedTags,
  AuthorQuotes,
  ResponseQuote,
} from '../types/api';

//const API_BASE_URL = 'http://127.0.0.1:8000';
const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:8000`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const api = {
  getQuotes: async (page: number = 1, pageSize: number = 20) => {
    const { data } = await axiosInstance.get<GenericApiResponse<PaginatedQuotes>>('/quotes', {
      params: { page, page_size: pageSize, format: 'json' },
    });
    return data;
  },

  getRandomQuote: async () => {
    const { data } = await axiosInstance.get<GenericApiResponse<ResponseQuote>>('/random-quote', {
      params: { format: 'json' },
    });
    return data;
  },

  getQuoteById: async (quoteId: number) => {
    const { data } = await axiosInstance.get<GenericApiResponse<ResponseQuote>>(
      `/quotes/${quoteId}`,
      {
        params: { format: 'json' },
      }
    );
    return data;
  },

  getTags: async (page: number = 1, pageSize: number = 20) => {
    const { data } = await axiosInstance.get<GenericApiResponse<PaginatedTags>>('/tags', {
      params: { page, page_size: pageSize, format: 'json' },
    });
    return data;
  },

  getQuotesByTag: async (tagId: string, page: number = 1, pageSize: number = 20) => {
    const { data } = await axiosInstance.get<GenericApiResponse<PaginatedQuotes>>(
      `/tags/${tagId}`,
      {
        params: { page, page_size: pageSize, format: 'json' },
      }
    );
    return data;
  },

  getAuthors: async (page: number = 1, pageSize: number = 20) => {
    const { data } = await axiosInstance.get<GenericApiResponse<PaginatedAuthors>>('/authors', {
      params: { page, page_size: pageSize, format: 'json' },
    });
    return data;
  },

  getQuotesByAuthor: async (authorId: string, page: number = 1, pageSize: number = 20) => {
    const { data } = await axiosInstance.get<GenericApiResponse<AuthorQuotes>>(
      `/authors/${authorId}`,
      {
        params: { page, page_size: pageSize, format: 'json' },
      }
    );
    return data;
  },
};
