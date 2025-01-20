import React, { useState } from "react";
import axios from "axios";

interface EditableFormProps {
  userId: string | null;
  initialData: Record<string, any>;
}

const EditableForm: React.FC<EditableFormProps> = ({ userId, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!userId) throw new Error("User ID is missing");
      const response = await axios.post(`https://test241201.onrender.com/post/${userId}`, formData);
      alert("データを送信しました: " + response.data.message);
    } catch (error: any) {
      console.error("データ送信エラー:", error);
      alert("データ送信に失敗しました");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>データ入力フォーム</h1>
      <form>
        {Object.keys(initialData).map((key) => (
          <div key={key} style={{ marginBottom: "10px" }}>
            <label>{key}:</label>
            <input
              type="text"
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            />
          </div>
        ))}
        <button type="button" onClick={handleSubmit} style={{ padding: "10px 20px" }}>
          送信
        </button>
      </form>
    </div>
  );
};

export default EditableForm;
