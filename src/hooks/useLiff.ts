import { useEffect, useState } from "react";
import liff from "@line/liff";

export const useLiff = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        const context = liff.getContext();
        if (context?.userId) setUserId(context.userId);
        setIsReady(true);
      } catch (err: any) {
        setError(err.message);
      }
    };
    initializeLiff();
  }, []);

  return { isReady, error, userId };
};
