const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IHplKHhZj5FBUPLq8v0m0pBkTOxVPd06fEjtNyIC0g8YOji1uIPxA7ocZ8C2P7T81Jv69K9RLarENMk9SwtpKsx00kMt69Ue6"
);

// API

//App config
const app = express();

// middlewares
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

// Api routes

app.get("/", (req, res) => {
  return res.status(200).send("hello world");
});
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("payment request received for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });

  // ok  - created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// listen command
app.listen(process.env.PORT || 5001);
