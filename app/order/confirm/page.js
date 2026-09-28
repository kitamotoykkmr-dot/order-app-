"use client";

import { useState, useEffect } from "react";

export default function ConfirmPage() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");

  // カート読み込み
  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) setCart(JSON.parse(data));
  }, []);

  if (!cart.length) return <p>カートが空です。</p>;

  // カート内削除
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ★ CSV自動保存（Shift_JIS対応）
  const saveCSV = (order) => {
    const history = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    history.push(order);
    localStorage.setItem("orderHistory", JSON.stringify(history));

    let csv = "発注日,会社名,商品名,型番,色,JAN,数量\n";

    history.forEach((h) => {
      h.cart.forEach((item) => {
        csv += `${h.date},${h.customerName},${item.model},${item.type},${item.color},${item.jan},${item.qty}\n`;
      });
    });

    const encoder = new TextEncoder("shift_jis");
    const sjisData = encoder.encode(csv);

    const blob = new Blob([sjisData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "order-history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>発注内容確認</h2>

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

      {/* 商品一覧 */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={th}>商品名</th>
            <th style={th}>型番</th>
            <th style={th}>色</th>
            <th style={th}>JAN</th>
            <th style={th}>数量</th>
            <th style={th}>取消</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td style={td}>{item.model}</td>
              <td style={td}>{item.type}</td>
              <td style={td}>{item.color}</td>
              <td style={td}>{item.jan}</td>
              <td style={td}>{item.qty}</td>

              <td style={td}>
                <button
                  onClick={() => removeItem(index)}
                  style={{
                    padding: "5px 10px",
                    background: "#f2b6b6",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 会社名入力 */}
      <div style={{ marginTop: "20px" }}>
        <label>発注先（会社名）：</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="会社名を入力してください"
          style={{
            width: "300px",
            padding: "8px",
            marginLeft: "10px",
            fontSize: "16px",
          }}
        />
      </div>

      {/* 発注確定 */}
      <button
        onClick={() => {
          if (!customerName) {
            alert("会社名を入力してください");
            return;
          }

          const finalOrder = {
            cart,
            customerName,
            date: new Date().toLocaleDateString("ja-JP"),
          };

          localStorage.setItem("finalOrder", JSON.stringify(finalOrder));

          saveCSV(finalOrder);

          localStorage.removeItem("cart");

          window.location.href = "/order/complete";
        }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#c0a27a",
          color: "#fff",
          borderRadius: "5px",
        }}
      >
        発注を確定する
      </button>
    </div>
  );
}

const th = {
  border: "1px solid #ccc",
  padding: "10px",
  background: "#548235",
};

const td = {
  border: "1px solid #ccc",
  padding: "10px",
  background: "#5F5F5F",
};
