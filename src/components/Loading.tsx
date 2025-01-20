import React from "react";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <p>{message}</p>
    </div>
  );
};

export default Loading;
