import React, { useState, useEffect } from "react";
import { postUserData } from "../services/apiService";
import { UserData } from "../types/user";

interface EditableFormProps {
  userId: string;
  initialData: UserData;
  onSubmitSuccess?: () => void;
}

const EditableForm: React.FC<EditableFormProps> = ({ userId, initialData, onSubmitSuccess }) => {
  // propsの初期データを内部stateとして管理
  const [formData, setFormData] = useState<UserData>(initialData);
  // フォームの表示状態管理
  const [isVisible, setIsVisible] = useState(true);

  // 初期データが更新された場合に内部stateも更新する
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
      // 送信成功時にフォームを閉じる
      setIsVisible(false);
      // 親コンポーネントでのデータ再取得を実施
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("データ送信エラー:", error);
      alert("データ送信に失敗しました");
    }
  };

  // isVisibleがfalseならフォームを非表示（nullを返す）
  if (!isVisible) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>データ入力フォーム</h1>
      <form>
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
        <div style={{ marginBottom: "10px" }}>
          <label>メーカー:</label>
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>商品名:</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>〇〇g当たり:</label>
          <input
            type="text"
            name="gram_per_unit"
            value={formData.gram_per_unit}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>g以外の単位:</label>
          <input
            type="text"
            name="measurement_unit"
            value={formData.measurement_unit}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>熱量（kcal）:</label>
          <input
            type="text"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>たんぱく質（g）:</label>
          <input
            type="text"
            name="protein"
            value={formData.protein}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>脂質（g）:</label>
          <input
            type="text"
            name="fat"
            value={formData.fat}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>炭水化物（g）:</label>
          <input
            type="text"
            name="carbohydrates"
            value={formData.carbohydrates}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>食塩相当量（g）:</label>
          <input
            type="text"
            name="sodium"
            value={formData.sodium}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
      </form>
      <button type="button" onClick={handleSubmit} style={{ padding: "10px 20px" }}>
        送信
      </button>
    </div>
  );
};

export default EditableForm;
