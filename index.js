const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3010;

let taxRate = 5;
let discountPercentage = 10;
let loyalityRate = 2;

app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  const totalPrice = newItemPrice + cartTotal;
  res.send(totalPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === 'true';
  let result;
  if (isMember) {
    result = cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    result = cartTotal;
  }
  res.send(result.toString());
});

app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const taxApplied = (cartTotal * taxRate) / 100;
  res.send(taxApplied.toString());
});

app.get('/estimate-delivery', (req, res) => {
  const distance = parseFloat(req.query.distance);
  const shippingMethod = req.query.shippingMethod.toLowerCase();
  let deliveryDays;
  if (shippingMethod === 'Standard'.toLowerCase()) {
    deliveryDays = distance / 50;
  }
  if (shippingMethod === 'Express'.toLowerCase()) {
    deliveryDays = distance / 100;
  }
  res.send(deliveryDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  const result = weight * distance * 0.1;
  res.send(result.toString());
});

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  const loyaltyPoint = purchaseAmount * loyalityRate;
  res.send(loyaltyPoint.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
