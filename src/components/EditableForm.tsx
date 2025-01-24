import React, { useState } from "react";
import { postUserData } from "../services/api";
import InputField from "./InputField";
import "./EditableTextBox.css";


interface Props {
  userId: string;
}

const EditableForm: React.FC<Props> = ({ userId }) => {
  const [formData, setFormData] = useState({
    category: "",
    manufacturer: "",
    product_name: "",
    gram_per_unit: "",
    measurement_unit: "",
    calories: "",
    protein: "",
    fat: "",
    carbohydrates: "",
    sodium: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await postUserData(userId, formData);
      alert("データ送信成功: " + response.message);
    } catch (error) {
      console.error("データ送信エラー:", error);
      alert("データ送信失敗");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>データ入力フォーム</h1>
      <form>
        {Object.keys(formData).map((key) => (
          <InputField
            key={key}
            name={key}
            value={formData[key as keyof typeof formData]}
            onChange={handleChange}
          />
        ))}
        <button type="button" onClick={handleSubmit} style={{ padding: "10px 20px" }}>
          送信
        </button>
      </form>
    </div>
  );
};

export default EditableForm;
