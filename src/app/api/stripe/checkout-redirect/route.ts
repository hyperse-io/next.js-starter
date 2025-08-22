import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    const { data } = await req.json();
    const frontTotal = data.total;

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

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: lines,
      mode: 'payment',
      success_url: `${origin}/stripe/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/stripe/payment-canceled?canceled=true`,
    });
    // Note: Redirect responses from API routes do not navigate the browser when called via fetch/XHR.
    // Return the URL so the client can perform window.location navigation.
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
