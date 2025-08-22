import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

const handler = async (req: Request) => {
  const { data, uiMode = 'custom' } = await req.json();
  const frontTotal = data.total;

  if (frontTotal <= 0) {
    return NextResponse.json(
      { error: 'Total is less than 0' },
      { status: 200 }
    );
  }

  const prices = await stripe.prices.list({
    product: 'prod_SuG6DxVMMroBIf',
    active: true,
  });

  const lines = prices.data
    .filter((price) => price.active)
    .map((price) => ({
      price: price.id,
      //@TODO 由于模拟数据，所以使用前端 mock 的金额来计算，实际业务应该以后端为准
      quantity: Number((frontTotal * 100).toFixed(0)),
    }));

  const host = req.headers.get('host');
  const session = await stripe.checkout.sessions.create({
    ui_mode: uiMode,
    line_items: lines,
    mode: 'payment',
    return_url: `http://${host}/stripe/payment-success?session_id={CHECKOUT_SESSION_ID}`,
  });

  return NextResponse.json({ clientSecret: session.client_secret });
};

export { handler as POST };
