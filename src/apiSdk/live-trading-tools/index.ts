import axios from 'axios';
import queryString from 'query-string';
import { LiveTradingToolInterface, LiveTradingToolGetQueryInterface } from 'interfaces/live-trading-tool';
import { GetQueryInterface } from '../../interfaces';

export const getLiveTradingTools = async (query?: LiveTradingToolGetQueryInterface) => {
  const response = await axios.get(`/api/live-trading-tools${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLiveTradingTool = async (liveTradingTool: LiveTradingToolInterface) => {
  const response = await axios.post('/api/live-trading-tools', liveTradingTool);
  return response.data;
};

export const updateLiveTradingToolById = async (id: string, liveTradingTool: LiveTradingToolInterface) => {
  const response = await axios.put(`/api/live-trading-tools/${id}`, liveTradingTool);
  return response.data;
};

export const getLiveTradingToolById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/live-trading-tools/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLiveTradingToolById = async (id: string) => {
  const response = await axios.delete(`/api/live-trading-tools/${id}`);
  return response.data;
};
