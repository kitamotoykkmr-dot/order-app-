"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const { jan } = useParams();

  const [qty, setQty] = useState(1);
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      const res = await fetch(`/api/products/${jan}`);
      const data = await res.json();
      setItem(data);
    }
    if (jan) fetchItem();
  }, [jan]);

  if (!item) return <p>読み込み中...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.model}</h1>

      {/* ★ 画像を表示（image_url を使う） */}
      {item.image_url && (
        <img
          src={item.image_url}
          alt={item.model}
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />
      )}

      <p>JAN: {item.jan}</p>
      <p>価格: {item.price}円</p>

      <div style={{ marginTop: "20px" }}>
        <label>数量：</label>
        <input
          type="number"
          value={qty}
          min="1"
          onChange={(e) => setQty(Number(e.target.value))}
        />
      </div>

      {/* カートに追加（image_url が確実に入る） */}
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#c0a27a",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          width: "fit-content",
          display: "block",
        }}
        onClick={() => {
          const cart = JSON.parse(localStorage.getItem("cart") || "[]");
          cart.push({ ...item, qty }); // ★ image_url も含まれる
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("カートに追加しました");
        }}
      >
        カートに追加
      </button>

      {/* 商品一覧に戻る */}
      <button
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#ccc",
          border: "none",
          borderRadius: "5px",
          width: "fit-content",
          display: "block",
        }}
        onClick={() => {
          window.location.href = "/products";
        }}
      >
        商品一覧に戻る
      </button>

      {/* カートを見る */}
      <button
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#c0a27a",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          width: "fit-content",
          display: "block",
        }}
        onClick={() => {
          window.location.href = "/cart";
        }}
      >
        カートを見る
      </button>
    </div>
  );
}
