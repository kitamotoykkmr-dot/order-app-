import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { to, cart, customerName } = await req.json();

    const text = `
${customerName} 御中

【株式会社 恵美工芸】
ご注文控え

いつもご利用いただきありがとうございます。
以下の内容でご注文を承りました。

--------------------------------
■ ご注文内容
--------------------------------
${cart
  .map(
    (item, i) =>
      `${i + 1}. ${item.model}
   型番: ${item.type}
   色: ${item.color}
   JAN: ${item.jan}
   数量: ${item.qty}`
  )
  .join("\n\n")}

--------------------------------
■ ご案内
--------------------------------
在庫確認後、発送の手配を進めさせていただきます。
在庫状況により、お届けまでお時間を頂戴する場合がございます。
いましばらくお待ちください。

株式会社 恵美工芸
〒583-0004
大阪府藤井寺市梅が園町3-32
TEL：072-953-2620
`;

    await resend.emails.send({
      from: "株式会社 恵美工芸 <onboarding@resend.dev>",
      to,
      subject: `【株式会社 恵美工芸】ご注文控え`,
      text,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
