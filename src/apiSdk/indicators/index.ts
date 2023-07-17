import axios from 'axios';
import queryString from 'query-string';
import { IndicatorInterface, IndicatorGetQueryInterface } from 'interfaces/indicator';
import { GetQueryInterface } from '../../interfaces';

export const getIndicators = async (query?: IndicatorGetQueryInterface) => {
  const response = await axios.get(`/api/indicators${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createIndicator = async (indicator: IndicatorInterface) => {
  const response = await axios.post('/api/indicators', indicator);
  return response.data;
};

export const updateIndicatorById = async (id: string, indicator: IndicatorInterface) => {
  const response = await axios.put(`/api/indicators/${id}`, indicator);
  return response.data;
};

export const getIndicatorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/indicators/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteIndicatorById = async (id: string) => {
  const response = await axios.delete(`/api/indicators/${id}`);
  return response.data;
};
