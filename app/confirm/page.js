"use client";

// ★ TSV自動保存（UTF-8でOK）
const saveCSV = (order) => {
  const history = JSON.parse(localStorage.getItem("orderHistory") || "[]");
  history.push(order);
  localStorage.setItem("orderHistory", JSON.stringify(history));

  let tsv = "発注日\t会社名\t商品名\t型番\t色\tJAN\t数量\n";

  history.forEach((h) => {
    h.cart.forEach((item) => {
      tsv += `${h.date}\t${h.customerName}\t${item.model}\t${item.type}\t${item.color}\t${item.jan}\t${item.qty}\n`;
    });
  });

  const blob = new Blob([tsv], { type: "text/tab-separated-values" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "order-history.tsv";
  a.click();
  URL.revokeObjectURL(url);
};

export default function Confirm() {
  // 仮の注文データ（本番では props や localStorage から取得）
  const sampleOrder = {
    date: "2026-09-28",
    customerName: "テスト株式会社",
    cart: [
      {
        model: "商品A",
        type: "型番123",
        color: "黒",
        jan: "1234567890123",
        qty: 1,
      },
    ],
  };

  const handleSave = () => {
    saveCSV(sampleOrder);
    alert("TSVを保存しました");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>確認ページ</h1>
      <p>注文内容を確認し、TSV保存できます。</p>

      <button
        onClick={handleSave}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#333",
          color: "#fff",
          borderRadius: "6px",
        }}
      >
        TSV保存
      </button>
    </div>
  );
}
