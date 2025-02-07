import liff from "@line/liff";

export const initializeLiff = async (liffId: string): Promise<void> => {
  try {
    await liff.init({ liffId });
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  } catch (error: any) {
    throw new Error(`LIFF initialization failed: ${error.message}`);
  }
};

export const getLiffContext = (): { userId: string } | null => {
  const context = liff.getContext();
  if (context && context.userId) {
    return { userId: context.userId };
  }
  return null;
};
