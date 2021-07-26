import axios from 'axios';
import { server } from '../api/serverUrl';


export const newAds = async (payload) => {
  const result = await axios.post(`${server}/ads`, payload)
  return result;
}

export const getAds = async () => {
  const result = await axios.get(`${server}/ads`, )
  return result;
}
export const getAdsById = async (payload) => {
  const result = await axios.get(`${server}/ads/${payload}`, )
  return result;
}


export const updateAds = async (payload) => {
  const result = await axios.get(`${server}/ads/${payload.id}`, payload)
  return result;
}

export const getAdsByCategories = async (payload) => {
  const result = await axios.post(`${server}/category`, payload)
  return result
}

export const deleteTheAds = async (payload) => {
  const result = await axios.delete(`${server}/ads/${payload.id}`, )
  return result;
}