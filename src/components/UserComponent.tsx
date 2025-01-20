import React from "react";
import useLiff from "../hooks/useLiff";
import useFetchData from "../hooks/useFetchData";
import EditableForm from "./EditableForm";
import Loading from "./Loading";
import liff from "@line/liff";

const UserComponent: React.FC = () => {
  const { isLiffReady, error: liffError } = useLiff();
  const userId = liff.getContext()?.userId || null;
  const { userData, error: dataError } = useFetchData(userId);

  if (liffError) return <div>Error: {liffError}</div>;
  if (!isLiffReady) return <Loading message="Initializing LIFF..." />;
  if (dataError) return <div>Error: {dataError}</div>;

  return (
    <div>
      <h1>User Information</h1>
      {userData ? <EditableForm userId={userId} initialData={userData} /> : <Loading message="Loading User Data..." />}
    </div>
  );
};

export default UserComponent;
