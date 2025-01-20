import { useState, useEffect } from "react";
import liff from "@line/liff";

const useLiff = () => {
  const [isLiffReady, setIsLiffReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        if (!liff.isLoggedIn()) liff.login();
        setIsLiffReady(true);
      } catch (err: any) {
        setError(`LIFF initialization failed: ${err.message}`);
      }
    };

    initializeLiff();
  }, []);

  return { isLiffReady, error };
};

export default useLiff;
