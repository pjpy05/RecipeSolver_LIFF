import { UserData } from "../types/user";
import axios from "axios";

// ユーザーデータ取得
export const fetchUserData = async (userId: string): Promise<UserData> => {
  const response = await fetch(`https://test241201.onrender.com/get/${userId}`);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return await response.json();
};

// ユーザーデータ送信
export const postUserData = async (userId: string, data: UserData): Promise<any> => {
  const response = await axios.post(`https://test241201.onrender.com/post/${userId}`, data);
  return response.data;
};
