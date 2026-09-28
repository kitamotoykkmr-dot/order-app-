"use client";

import { useEffect, useState } from "react";

export default function CompletePage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("finalOrder");
    if (data) {
      setOrder(JSON.parse(data));
    }
  }, []);

  if (!order) return <p>発注データがありません。</p>;

  const sendMail = async () => {
    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: order.customerEmail,
        cart: order.cart,
        customerName: order.customerName,
      }),
    });

    const result = await res.json();
    alert(result.ok ? "控えメールを送信しました" : "メール送信に失敗しました");
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* 印刷専用CSS */}
      <style>{`
        @media print {
          .print-only { display: block !important; }
          .no-print { display: none !important; }
        }
        .print-only { display: none; }
      `}</style>

      <h2 className="no-print">発注が完了しました</h2>

      <div className="no-print" style={{ marginTop: "20px", lineHeight: "1.8" }}>
        <p>いつもご利用ありがとうございます。</p>
        <p>在庫確認後、発送の手配を進めさせていただきます。</p>
        <p>在庫状況により、お届けまでお時間を頂戴する場合がございます。</p>
        <p>いましばらくお待ちください。</p>
      </div>

      {/* 画面用の一覧 */}
      <table
        className="no-print"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "30px",
        }}
      >
        <thead>
          <tr>
            <th style={th}>商品名</th>
            <th style={th}>型番</th>
            <th style={th}>色</th>
            <th style={th}>JAN</th>
            <th style={th}>数量</th>
          </tr>
        </thead>

        <tbody>
          {order.cart.map((item, index) => (
            <tr key={index}>
              <td style={td}>{item.model}</td>
              <td style={td}>{item.type}</td>
              <td style={td}>{item.color}</td>
              <td style={td}>{item.jan}</td>
              <td style={td}>{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ★ 印刷専用：会社情報つき一覧 */}
      <div className="print-only" style={{ marginTop: "20px" }}>
        <h3>■ ご注文内容</h3>

        {order.cart.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p>{index + 1}. {item.model}</p>
            <p>型番: {item.type}</p>
            <p>色: {item.color}</p>
            <p>JAN: {item.jan}</p>
            <p>数量: {item.qty}</p>
          </div>
        ))}

        <div style={{ marginTop: "30px" }}>
          <p>株式会社 恵美工芸</p>
          <p>〒583-0004</p>
          <p>大阪府藤井寺市梅が園町3-32</p>
          <p>TEL：072-953-2620</p>
        </div>
      </div>

      {/* 印刷 */}
      <button
        onClick={() => window.print()}
        className="no-print"
        style={btnPrimary}
      >
        PDFとして保存（印刷）
      </button>

      {/* メール送信 */}
      <button
        onClick={sendMail}
        className="no-print"
        style={btnPrimary}
      >
        控えメールを送信する
      </button>

      <button
        onClick={() => (window.location.href = "/products")}
        className="no-print"
        style={btnSecondary}
      >
        商品一覧に戻る
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

const btnPrimary = {
  marginTop: "20px",
  padding: "10px 20px",
  background: "#EE4C7A",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
};

const btnSecondary = {
  marginTop: "10px",
  padding: "10px 20px",
  background: "#999",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
};
