import React, { useState } from "react";
import axios from "axios";

interface EditableFormProps {
  userId: string | null;
  initialData: Record<string, any>;
}

const EditableForm: React.FC<EditableFormProps> = ({ userId, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  // 表示する項目とラベルを定義
  const displayFields: Record<keyof typeof initialData, string> = {
    category:"種類",
    manufacturer:"メーカー",
    product_name:"商品名",
    gram_per_unit:"〇〇g当たり",
    measurement_unit:"g以外の単位",
    calories:"熱量（kcal）",
    protein:"たんぱく質（g）",
    fat:"脂質（g）",
    carbohydrates:"炭水化物（g）",
    sodium:"食塩相当量（g）",
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!userId) throw new Error("User ID is missing");
  
      // axiosでJSON形式のデータをPOST
      const response = await axios.post(
        `https://test241201.onrender.com/post/${userId}`,
        formData, // 送信データ（自動的にJSONに変換される）
        {
          headers: {
            "Content-Type": "application/json", // JSON形式で送信するためのヘッダー
          },
        }
      );
  
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
        {Object.keys(displayFields).map((key) => (
          <div key={key} style={{ marginBottom: "10px" }}>
            <label>{displayFields[key]}:</label>
            <input
              type="text"
              name={key}
              value={formData[key as keyof typeof initialData] || ""}
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
