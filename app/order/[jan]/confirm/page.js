export default async function ConfirmPage({ searchParams }) {
  const params = await searchParams;
  const jan = params.jan;
  const quantity = params.quantity;

  return (
    <div style={{ padding: "20px" }}>
      <h1>発注内容の確認</h1>

      <p>JAN：{jan}</p>
      <p>数量：{quantity}</p>

      <form action={`/order/${jan}/done`} method="GET" style={{ marginTop: "20px" }}>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#c9a86a",
            color: "#fff",
            borderRadius: "5px",
            border: "none",
          }}
        >
          この内容で発注する
        </button>
      </form>
    </div>
  );
}
