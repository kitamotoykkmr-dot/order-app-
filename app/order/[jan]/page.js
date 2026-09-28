"use client";

import { useState, useEffect } from "react";

export default function OrderPage({ params }) {
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const selected = localStorage.getItem("selectedItem");
    if (selected) {
      setItem(JSON.parse(selected));
    }
  }, []);

  if (!item) return <p>商品情報がありません。</p>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...item, qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "/order/confirm";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>発注画面</h2>

      <button
        onClick={() => (window.location.href = "/products")}
        style={{
          marginBottom: "20px",
          padding: "8px 15px",
          background: "#999",
          color: "#fff",
          borderRadius: "5px",
        }}
      >
        商品一覧に戻る
      </button>

      <img
        src={`/images/${item.jan}.jpg`}
        alt={item.model}
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />

      <p>商品名：{item.model}</p>
      <p>型番：{item.type}</p>
      <p>色：{item.color}</p>
      <p>JAN：{item.jan}</p>

      <div style={{ marginTop: "20px" }}>
        <label>数量：</label>
        <input
          type="number"
          value={qty}
          min="1"
          onChange={(e) => setQty(e.target.value)}
          style={{ width: "80px", padding: "5px", marginLeft: "10px" }}
        />
      </div>

      <button
        onClick={addToCart}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#c0a27a",
          color: "#fff",
          borderRadius: "5px",
        }}
      >
        カートに入れる
      </button>

      <button
        onClick={() => (window.location.href = "/products")}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          background: "#666",
          color: "#fff",
          borderRadius: "5px",
        }}
      >
        取消
      </button>
    </div>
  );
}
