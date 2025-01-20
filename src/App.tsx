import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import EditableForm from "./components/EditableForm";
import Loading from "./components/Loading";

interface UserData {
  [key: string]: any;
}

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLiffReady, setIsLiffReady] = useState<boolean>(false);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        setIsLiffReady(true);
      } catch (err: any) {
        setError(`LIFF initialization failed: ${err.message}`);
      }
    };

    const fetchData = async () => {
      try {
        if (!isLiffReady) return;

        const context = liff.getContext();
        if (!context || !context.userId) {
          throw new Error("User ID not found.");
        }

        setUserId(context.userId);

        const response = await fetch(`https://test241201.onrender.com/get/${context.userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    initializeLiff().then(fetchData);
  }, [isLiffReady]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isLiffReady) {
    return <Loading message="Initializing LIFF..." />;
  }

  return (
    <div className="App">
      <h1>User Information</h1>
      {userData ? (
        <EditableForm userId={userId} initialData={userData} />
      ) : (
        <Loading message="Loading User Data..." />
      )}
    </div>
  );
};

export default App;
