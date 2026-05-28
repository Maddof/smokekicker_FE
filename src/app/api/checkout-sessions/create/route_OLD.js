// import Stripe from "stripe";
import { NextResponse } from "next/server";
import getStripeInstance from "@/lib/utils/stripe/stripeConfig";
import {
  createNewStripeCustomer,
  updateCustStripeId,
} from "@/lib/utils/stripe/stripeCustomerUtils";
import {
  fetchCartFromBackend,
  getUserInfoAndCart,
} from "@/lib/utils/user/userUtils";
import {
  formatRegularProducts,
  // validateRegularProducts,
  formatSubscriptionProducts,
} from "@/lib/utils/stripe/formatCartItems";
import { createPendingOrder } from "@/lib/utils/order/orderUtils";
import { fetchSession } from "@/lib/utils/auth/authDAL";
import { getAccessTokenFromCookies } from "@/lib/utils/cookies/cookies";
import { calcSubtotal } from "@/lib/utils/cart/calculations";

const stripe = getStripeInstance();

export async function POST(req) {
  console.log("Creating Stripe Checkout session...");
  try {
    const userSession = await fetchSession();
    const token = await getAccessTokenFromCookies();

    // Check if user is authenticated
    if (!userSession) {
      return NextResponse.json(
        { error: "User information is missing." },
        { status: 401 },
      );
    }
    // Access cart and user from db
    const cartItems = await fetchCartFromBackend(token);

    console.log("Cart items:", cartItems);

    const subtotal = calcSubtotal(cartItems);
    const user = await getUserInfoAndCart(token);

    // Access the user's name
    const userFullName = `${user.givenName} ${user.surname}`;

    // Access the user's cartId
    const userCartId = user.cart.id.toString();

    // Access the user's id
    const userId = user.id;

    // If customer from DB does not have Stripe ID,
    // it means he has not purchased before.
    // We create new customer then, else we just
    // set stripe customer id from db
    let stripeCustomerId;

    if (!user.stripeCustomerId) {
      stripeCustomerId = await createNewStripeCustomer(userFullName);
    } else {
      stripeCustomerId = user.stripeCustomerId;

      await updateCustStripeId(stripeCustomerId); // Make sure DB has latest stripe id set for user
    }

    // Split the cart items between subscription and one-time items.
    // Here we assume an item with a `subscriptionBox` property is a subscription.
    const oneTimeItems = cartItems.filter((item) => item.type === "PRODUCT");

    const subscriptionItems = cartItems.filter(
      (item) => item.type === "SUBSCRIPTION",
    );

    const regularLineItems =
      oneTimeItems.length > 0 ? await formatRegularProducts(oneTimeItems) : [];

    const subscriptionLineItems =
      subscriptionItems.length > 0
        ? await formatSubscriptionProducts(subscriptionItems)
        : [];

    // We set the payment mode to subscription if atleast 1 subitem
    // in cart. We also take the sub box id from the first item in the array
    // since we only allow one sub box per cart
    let payment_mode = "payment";
    let subscriptionBoxId;
    if (subscriptionItems.length > 0) {
      payment_mode = "subscription";
      subscriptionBoxId = subscriptionItems[0].itemId;
    }

    // Step 1: Create the pending order
    const order = await createPendingOrder({
      userId,
      cartItems,
      totalAmount: subtotal,
      currency: "SEK",
    });

    // Step 2: Build the payload object
    const sessionPayload = {
      payment_method_types: ["card"],
      currency: "SEK",
      customer: stripeCustomerId,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["SE"],
      },
      allow_promotion_codes: true,
      phone_number_collection: {
        enabled: true,
      },
      customer_update: {
        shipping: "auto",
        address: "auto",
        name: "auto",
      },
      custom_text: {
        shipping_address: {
          message: "Some extra text",
        },
      },
      metadata: {
        userId: userId,
        cartId: userCartId,
        orderId: order.id,
      },
      line_items: [...regularLineItems, ...subscriptionLineItems],
      mode: payment_mode,
      success_url: `${req.headers.get("origin")}/payment-stripe/success`,
      cancel_url: `${req.headers.get("origin")}/payment-stripe/cancel`,
      automatic_tax: { enabled: true },
    };

    // Only include subscription_data if in subscription mode
    if (payment_mode === "subscription") {
      sessionPayload.subscription_data = {
        metadata: {
          userId: userId,
          // cartId: userCartId,
          // orderId: order.id,
          subscriptionBoxId,
        },
      };
    }

    // Step 3: Create the Stripe Checkout session using the payload
    const session = await stripe.checkout.sessions.create(sessionPayload);

    // Step 4: Return the session ID to the client
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout Session Error:", error.message);
    return NextResponse.json(
      { error: "An error occurred while creating the checkout session." },
      { status: 500 },
    );
  }
}
