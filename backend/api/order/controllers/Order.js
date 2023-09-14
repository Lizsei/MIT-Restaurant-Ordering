"use strict";

// Your private key for Stripe test environment. Moved the key to the .env.development file


const stripe = require("stripe")(process.env.STRIPE_API_KEY);



module.exports = {
  create: async (ctx) => {
    try {
      // Parse the request body
      const { address, amount, dishes, token, city, state } = JSON.parse(ctx.request.body);

      // Validate that all required fields are provided
      if (!address || !amount || !dishes || !token || !city || !state) {
        ctx.throw(400, 'All required fields must be provided');
        return;
      }

      // Convert amount to cents
      const stripeAmount = Math.floor(amount * 100);

      // Log details for debugging
      console.log(`Amount in cents: ${stripeAmount}, Token: ${token}`);

      // Create charge on Stripe
      const charge = await stripe.charges.create({
        amount: stripeAmount,
        currency: "usd",
        description: `Order ${new Date()} by ${ctx.state.user._id}`,
        source: token,
      });

      // Log Stripe charge for debugging
      console.log(`Stripe charge created: ${JSON.stringify(charge)}`);

      // Register the order in the database
      const order = await strapi.services.order.create({
        user: ctx.state.user.id,
        charge_id: charge.id,
        amount: stripeAmount,
        address,
        dishes,
        city,
        state,
      });

      // Log order details for debugging
      console.log(`Order created: ${JSON.stringify(order)}`);

      return order;

    } catch (err) {
      console.error(`Error occurred while creating order: ${err}`);
      ctx.throw(500, 'An error occurred while creating the order');
    }
  },
};






