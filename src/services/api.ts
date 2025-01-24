import axios from "axios";

const API_BASE_URL = "https://test241201.onrender.com";

export const fetchUserData = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/get/${userId}`);
  return response.data;
};

export const postUserData = async (userId: string, data: any) => {
  const response = await axios.post(`${API_BASE_URL}/post/${userId}`, data);
  return response.data;
};
