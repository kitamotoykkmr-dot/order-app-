"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>カートの中</h2>

      {cart.map((item, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <p>商品名：{item.model}</p>
          <p>型番：{item.type}</p>
          <p>色：{item.color}</p>
          <p>JAN：{item.jan}</p>
          <p>数量：{item.qty}</p>
        </div>
      ))}

      <button
        onClick={() => {
          window.location.href = "/complete";
        }}
      >
        発注を確定する
      </button>
    </div>
  );
}
