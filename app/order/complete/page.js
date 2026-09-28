"use client";

import { useEffect, useState } from "react";

export default function CompletePage() {
  const [order, setOrder] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("finalOrder");
    if (data) {
      const parsed = JSON.parse(data);
      setOrder(parsed);

      // ★ 発注履歴に追加
      const history = JSON.parse(localStorage.getItem("orderHistory") || "[]");
      history.push(parsed);
      localStorage.setItem("orderHistory", JSON.stringify(history));
    }
  }, []);

  if (!order) return <p>発注データがありません。</p>;

  // ★ メール送信
  const sendMail = async () => {
    if (!email) {
      alert("メールアドレスを入力してください");
      return;
    }

    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        cart: order.cart,
        customerName: order.customerName,
      }),
    });

    const result = await res.json();
    alert(result.ok ? "控えメールを送信しました" : "メール送信に失敗しました");
  };

  return (
    <div style={{ padding: "20px" }}>

      <style>{`
        @media print {
          .print-only { display: block !important; }
          .no-print { display: none !important; }
        }
        .print-only { display: none; }
      `}</style>

      {/* 画面表示 */}
      <div className="no-print" style={{ marginTop: "20px", lineHeight: "1.8" }}>
        <h2>{order.customerName} 御中</h2>
        <h3>発注が完了しました</h3>
        <p>いつもご利用ありがとうございます。</p>
        <p>在庫確認後、発送の手配を進めさせていただきます。</p>
        <p>在庫状況により、お届けまでお時間を頂戴する場合がございます。</p>
        <p>いましばらくお待ちください。</p>
      </div>

      {/* 印刷専用 */}
      <div className="print-only" style={{ marginTop: "20px", lineHeight: "1.8" }}>
        <h2>{order.customerName} 御中</h2>
        <h3>発注が完了しました</h3>
        <p>いつもご利用ありがとうございます。</p>
        <p>在庫確認後、発送の手配を進めさせていただきます。</p>
        <p>在庫状況により、お届けまでお時間を頂戴する場合がございます。</p>
        <p>いましばらくお待ちください。</p>

        <h3 style={{ marginTop: "20px" }}>■ ご注文内容</h3>

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

      {/* メール入力欄 */}
      <div className="no-print" style={{ marginTop: "20px" }}>
        <label>控えメール送信先（お客様のメールアドレス）：</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレスを入力してください"
          style={{
            width: "300px",
            padding: "8px",
            marginLeft: "10px",
            fontSize: "16px",
          }}
        />
      </div>

      {/* ボタン */}
      <button onClick={() => window.print()} className="no-print" style={btnPrimary}>
        PDFとして保存（印刷）
      </button>

      <button onClick={sendMail} className="no-print" style={btnPrimary}>
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
};
