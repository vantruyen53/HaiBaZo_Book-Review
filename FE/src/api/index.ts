import axios from 'axios';

import type { BaseAuthorDTO } from '../DTO/AuthorDTO';
import type {BaseBookDTO } from '../DTO/BookDTO';
import type {BaseReviewDT } from '../DTO/ReviewDTO';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

export const authorApi = {
  getAll: (page=0, size=3) => API.get(`/authors?page=${page}&size=${size}`),
  getById: (id: number) => API.get(`/authors/${id}`),
  create: (data: BaseAuthorDTO) => API.post('/authors', data),
  update: (id: number, data: BaseAuthorDTO) => API.put(`/authors/${id}`, data),
  delete: (id: number) => API.delete(`/authors/${id}`),
};

export const bookApi = {
  getAll: (page=0, size=3) => API.get(`/books?page=${page}&size=${size}`),
  getById: (id: number) => API.get(`/books/${id}`),
  create: (data: BaseBookDTO) => API.post('/books', data),
  update: (id: number, data: BaseBookDTO) => API.put(`/books/${id}`, data),
  delete: (id: number) => API.delete(`/books/${id}`),
};

export const reviewApi = {
  getAll: (page=0, size=3) => API.get(`/reviews?page=${page}&size=${size}`),
  getById: (id: number) => API.get(`/reviews/${id}`),
  create: (data: BaseReviewDT) => API.post('/reviews', data),
  update: (id: number, data: BaseReviewDT) => API.put(`/reviews/${id}`, data),
  delete: (id: number) => API.delete(`/reviews/${id}`),
};