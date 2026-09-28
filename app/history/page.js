"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then(setHistory);
  }, []);

  // PDF出力
  function exportPDF(order) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`発注先：${order.company}`, 10, 10);
    doc.text(`発注日時：${order.date}`, 10, 20);

    doc.setFontSize(12);
    let y = 35;

    order.items.forEach((item) => {
      doc.text(
        `${item.model} / ${item.color} / ${item.type} / JAN:${item.jan} / ${item.price}円 × ${item.qty}`,
        10,
        y
      );
      y += 10;
    });

    doc.save(`order_${order.date}.pdf`);
  }

  // 履歴削除
  async function deleteHistory(index) {
    await fetch("/api/history", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });

    // 再読み込み
    const updated = await fetch("/api/history").then((res) => res.json());
    setHistory(updated);
  }

  if (history.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>発注履歴</h1>
        <p>発注履歴がありません。</p>
        <a href="/products">商品一覧へ戻る</a>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>発注履歴一覧</h1>

      {history.map((order, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
            background: "#fafafa",
          }}
        >
          <h2>発注先：{order.company}</h2>
          <p>発注日時：{order.date}</p>

          <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
            <thead>
              <tr>
                <th>商品名</th>
                <th>色</th>
                <th>型番</th>
                <th>JAN</th>
                <th>価格</th>
                <th>数量</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item) => (
                <tr key={item.jan}>
                  <td>{item.model}</td>
                  <td>{item.color}</td>
                  <td>{item.type}</td>
                  <td>{item.jan}</td>
                  <td>{item.price}円</td>
                  <td>{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PDF出力ボタン */}
          <button
            style={{
              marginTop: "10px",
              padding: "8px 15px",
              background: "#d8c7a1",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => exportPDF(order)}
          >
            PDF出力
          </button>

          {/* 履歴削除ボタン */}
          <button
            style={{
              marginLeft: "10px",
              padding: "8px 15px",
              background: "#f2b6b6",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => deleteHistory(index)}
          >
            履歴削除
          </button>
        </div>
      ))}

      <a href="/products">商品一覧へ戻る</a>
    </div>
  );
}
