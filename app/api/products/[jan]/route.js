export async function GET(_, { params }) {
  const { jan } = await params;   // ★ Next.js 16 では必須！

  const products = {
    "4573621900456": { color: "NV" },
    "4573621900463": { color: "RD" },
    "4573621900470": { color: "YE" },
    "4573621900487": { color: "PK" },
    "4573621900494": { color: "PU" },
  };

  const item = products[jan];

  if (!item) {
    return Response.json(
      { error: "商品が見つかりません", jan },
      { status: 404 }
    );
  }

  return Response.json({
    jan,
    model: "金襴 和柄リボンバンス",
    color: item.color,
    type: `NE-15 ${item.color}`,
    price: 1980,
    image_url: `/images/${jan}.jpg`
  });
}
