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

interface UserData {
  [key: string]: any;
}

const UserComponent: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize LIFF
        if (!liff.isInClient()) {
          throw new Error("This feature is only available in the LINE app.");
        }

        const context = liff.getContext();
        if (!context || !context.userId) {
          throw new Error("User ID not found.");
        }

        setUserId(context.userId);

        // Fetch data from API using userId
        const response = await fetch(`https://example.com/api/user/${context.userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
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
