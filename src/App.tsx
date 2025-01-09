// import { useEffect, useState } from "react";
// import liff from "@line/liff";
// import "./App.css";

// function App() {
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     liff
//       .init({
//         liffId: import.meta.env.VITE_LIFF_ID
//       })
//       .then(() => {
//         setMessage("LIFF init succeeded.");
//       })
//       .catch((e: Error) => {
//         setMessage("LIFF init failed.");
//         setError(`${e}`);
//       });
//   });

//   return (
//     <div className="App">
//       <h1>create-liff-app</h1>
//       {message && <p>{message}</p>}
//       {error && (
//         <p>
//           <code>{error}</code>
//         </p>
//       )}
//       <a
//         href="https://developers.line.biz/ja/docs/liff/"
//         target="_blank"
//         rel="noreferrer"
//       >
//         LIFF Documentation
//       </a>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

interface UserData {
  [key: string]: any;
}

const UserComponent: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLiffReady, setIsLiffReady] = useState<boolean>(false);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        // LIFF初期化
        await liff.init({liffId: import.meta.env.VITE_LIFF_ID});

        if (!liff.isLoggedIn()) {
          liff.login(); // ログインが必要な場合、自動でログイン
        }

        setIsLiffReady(true);
      } catch (err: any) {
        setError(`LIFF initialization failed: ${err.message}`);
      }
    };

    const fetchData = async () => {
      try {
        if (!isLiffReady) return; // LIFF初期化が完了していなければ待機

        const context = liff.getContext();
        if (!context || !context.userId) {
          throw new Error("User ID not found.");
        }

        setUserId(context.userId);

        // APIリクエスト
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
    return <div>Initializing LIFF...</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      {userId ? <p>User ID: {userId}</p> : <p>Loading User ID...</p>}
      {userData ? (
        <div>
          <h2>Data:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading User Data...</p>
      )}
    </div>
  );
};

export default UserComponent;
