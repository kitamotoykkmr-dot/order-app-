export async function POST(req) {
  const body = await req.json();
  return Response.json({
    status: "received",
    order_id: "ML-TEST-001"
  });
}
