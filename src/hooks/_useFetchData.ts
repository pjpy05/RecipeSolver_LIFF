import { useState, useEffect } from "react";

const useFetchData = (userId: string | null) => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;

        const response = await fetch(`https://test241201.onrender.com/get/${userId}`);
        if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);

        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, [userId]);

  return { userData, error };
};

export default useFetchData;
