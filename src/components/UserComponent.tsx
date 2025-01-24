import React from "react";
import { useLiff } from "../hooks/useLiff";
import EditableForm from "./EditableForm";
import { fetchUserData } from "../services/api";

const UserComponent: React.FC = () => {
  const { isReady, error, userId } = useLiff();
  const [userData, setUserData] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (!userId) return;

    const getData = async () => {
      try {
        const data = await fetchUserData(userId);
        setUserData(data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
      }
    };

    getData();
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!isReady) return <div>Initializing LIFF...</div>;

  return (
    <div>
      <h1>User Information</h1>
      {userData ? <EditableForm userId={userId} /> : <p>Loading User Data...</p>}
    </div>
  );
};

export default UserComponent;
