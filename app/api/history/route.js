let history = []; // 簡易DB（サーバー側メモリ）

export async function GET() {
  return Response.json(history);
}

export async function POST(req) {
  const body = await req.json();
  history.push(body);
  return Response.json({ success: true });
}

// 履歴削除（index指定）
export async function DELETE(req) {
  const { index } = await req.json();
  history.splice(index, 1);
  return Response.json({ success: true });
}
