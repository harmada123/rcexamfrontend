import axios from 'axios';
import { server } from '../api/serverUrl';

export const login = async (payload) => {
  try {
    const result = await axios.post(`${server}/login`, payload )
    return result;
  }
  catch (err) {
    return err
  }

}

export const validateToken = async (payload) => {
  const result = await axios.post(`${server}/protected?token=${payload.token}`, payload )
  return result;
}