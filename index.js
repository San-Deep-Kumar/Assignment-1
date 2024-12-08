let express = require('express');
let cors = require('cors');

let app = express();
let port = 3000;

app.use(cors());

// Calculate total price of items in cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartValue = cartTotal + newItemPrice;
  res.send(totalCartValue.toString());
});

// Apply discount based on membership status
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let discountPercentage = 10;
  let finalPrice = cartTotal - cartTotal * (discountPercentage / 100);
  if (isMember) {
    res.send(finalPrice.toString());
  } else {
    res.send(cartTotal.toString());
  }
});

// Calculate tax on cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxRate = 5;
  let taxAmount = cartTotal * (taxRate / 100);
  res.send(taxAmount.toString());
});

// Calculate the delivery time
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let standard = distance / 50;
  let express = distance / 100;
  let delivery_days;
  if (shippingMethod === 'standard') {
    delivery_days = standard;
  } else if (shippingMethod === 'express') {
    delivery_days = express;
  }
  res.send(delivery_days.toString());
});

// Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let price = weight * distance * 0.1;
  res.send(price.toString());
});

// Calculate the loyalty-points based on the purchase amount.
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
