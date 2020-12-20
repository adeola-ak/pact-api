const { Router } = require("express");
const router = Router();
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/setup", (req, res) => {
	res.send({
		publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
		basicPrice: process.env.BASIC_PRICE_ID,
		proPrice: process.env.PRO_PRICE_ID,
	});
});

router.get("/checkout-session", async (req, res) => {
	const { sessionId } = req.query;
	const session = await stripe.checkout.sessions.retrieve(sessionId);
	res.send(session);
});
// router.post("/subscription", async (req, res) => {
// 	const { email, payment_method } = req.body;
// 	const customer = await stripe.customers.create({
// 		payment_method: payment_method,
// 		email: email,
// 		invoice_setting: {
// 			default_payment_method: payment_method,
// 		},
// 	});

// 	const subscription = await stripe.subscriptions.create({
// 		customer: "customer.id",
// 		items: [{ price: "price_1HyA7yAOzHmZJW0Ipvuq25kv" }],
// 		expand: ["latest_invoice.payment_intent"],
// 	});

// 	const status = subscription["latest_invoice"]["payment_intent"]["status"];
// 	const client_secret =
// 		subscription["latest_invoice"]["payment_intent"]["client_secret"];
// 	res.json({ client_secret: client_secret, status: status });
// });

// router.post("/create-checkout-session", async (req, res) => {
// 	const { priceId } = req.body;

// 	// See https://stripe.com/docs/api/checkout/sessions/create
// 	// for additional parameters to pass.
// 	try {
// 		const session = await stripe.checkout.sessions.create({
// 			mode: "subscription",
// 			payment_method_types: ["card"],
// 			line_items: [
// 				{
// 					price: priceId,
// 					// For metered billing, do not pass quantity
// 					quantity: 1,
// 				},
// 			],
// 			// {CHECKOUT_SESSION_ID} is a string literal; do not change it!
// 			// the actual Session ID is returned in the query parameter when your customer
// 			// is redirected to the success page.
// 			success_url:
// 				"https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}",
// 			cancel_url: "https://example.com/canceled.html",
// 		});

// 		res.send({
// 			sessionId: session.id,
// 		});
// 	} catch (e) {
// 		res.status(400);
// 		return res.send({
// 			error: {
// 				message: e.message,
// 			},
// 		});
// 	}
// });

module.exports = router; // to send out the route
