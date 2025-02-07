import React, { useEffect, useState } from "react";
import EditableForm from "./EditableForm";
import { initializeLiff, getLiffContext } from "../services/liffService";
import { fetchUserData } from "../services/apiService";
import { UserData } from "../types/user";

const UserComponent: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLiffReady, setIsLiffReady] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID || "";
        await initializeLiff(liffId);
        setIsLiffReady(true);

        const context = getLiffContext();
        if (!context || !context.userId) {
          throw new Error("User ID not found.");
        }
        setUserId(context.userId);

        const data = await fetchUserData(context.userId);
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    init();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!isLiffReady) return <div>Initializing LIFF...</div>;
  if (!userData) return <div>Loading User Data...</div>;

  return (
    <div>
      <h1>User Information</h1>
      <EditableForm userId={userId!} />
    </div>
  );
};

export default UserComponent;
