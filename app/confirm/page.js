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
  a.download = "order-history.tsv"; // ← 拡張子をTSVに変更
  a.click();
  URL.revokeObjectURL(url);
};
