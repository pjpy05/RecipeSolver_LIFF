import React, { useState, useEffect } from "react";
import { postUserData } from "../services/apiService";
import { UserData } from "../types/user";
import liff from "@line/liff"; // 追加

interface EditableFormProps {
  userId: string;
  initialData: UserData;
}

const EditableForm: React.FC<EditableFormProps> = ({ userId, initialData }) => {
  const [formData, setFormData] = useState<UserData>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const result = await postUserData(userId, formData);
      alert("データを送信しました: " + result.message);
      liff.closeWindow();  // 送信後、LIFFウィンドウを閉じる
    } catch (error) {
      console.error("データ送信エラー:", error);
      alert("データ送信に失敗しました");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>データ入力フォーム</h1>
      <form>
        {/* 各入力フィールド */}
        <div style={{ marginBottom: "10px" }}>
          <label>種類:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        {/* ... 他の項目も同様に ... */}
        <button type="button" onClick={handleSubmit} style={{ padding: "10px 20px" }}>
          送信
        </button>
      </form>
    </div>
  );
};

export default EditableForm;
