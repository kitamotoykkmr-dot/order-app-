"use client";

import products from "@/data/products.json";

export default function ProductsPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>商品一覧</h2>

      {/* 自動で列数が変わるレスポンシブGrid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((item) => (
          <div
            key={item.jan}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={`/images/${item.jan}.jpg`}
              alt={item.model}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />

            <p>{item.model}</p>
            <p>{item.type}</p>
            <p>{item.color}</p>
            <p>{item.jan}</p>

            <button
              onClick={() => {
                localStorage.setItem("selectedItem", JSON.stringify(item));
                window.location.href = `/order/${item.jan}`;
              }}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                background: "#c0a27a",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              発注する
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
