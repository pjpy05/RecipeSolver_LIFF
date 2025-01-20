const API_BASE_URL = "https://test241201.onrender.com";

export const getUserData = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/get/${userId}`);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
};

export const postUserData = async (userId: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/post/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Error posting data: ${response.statusText}`);
  }
  return response.json();
};
