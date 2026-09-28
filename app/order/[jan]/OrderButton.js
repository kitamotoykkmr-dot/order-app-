"use client";

export default function OrderButton() {
  return (
    <button
      type="button"
      style={{
        padding: "10px 20px",
        background: "#d8c7a1",
        border: "none",
        cursor: "pointer"
      }}
      onClick={() => alert("発注処理を実行します")}
    >
      発注する
    </button>
  );
}
