const express = require("express");
const app = express();
const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51OolVgG8iIb4HdCamJUYsikFEKfbiqeOzHeH87rDXkzUatCe818SdVsQf72VrpUAPG24oycyuVtTe8eD9EgAnNH900lZdKjxKo"
);

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send("<h1>Added .cpanel.yml file</h1>");
});

app.get("/paymentIntent", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "sar", // Currency set to SAR
            product_data: {
              name: "Dummy service",
              images: [
                `https://www.google.com/imgres?q=ac%20images&imgurl=https%3A%2F%2Fstatic.toiimg.com%2Fthumb%2Fmsid-110356258%2Cwidth-1280%2Cheight-720%2Cresizemode-4%2F110356258.jpg&imgrefurl=https%3A%2F%2Ftimesofindia.indiatimes.com%2Ftechnology%2Ftech-tips%2F8-reasons-why-your-ac-electricity-bill-is-too-high%2Farticleshow%2F110356258.cms&docid=nK0RedaWIRF7UM&tbnid=sLCK0i5p7_b6_M&vet=12ahUKEwiqzZTYoKyKAxU6K_sDHcOvLm0QM3oECBgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwiqzZTYoKyKAxU6K_sDHcOvLm0QM3oECBgQAA`,
              ],
              description: "Dummy service description",
            },
            unit_amount: 200 * 10000, // Amount in halalas (SAR 100 = 10000 halalas)
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/booking/success`,
      cancel_url: `http://localhost:3000/booking/cancel`,
    });

    return res
      .status(200)
      .json({ message: "Payment intent successfully", data: session.url });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
});

app.get("/retrieveData/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return res.status(200).json({
      message: "Payment Intent retrieved successfully",
      data: session,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
});

app.listen(process.env.PORT);
