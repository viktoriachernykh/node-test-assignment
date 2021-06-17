const express = require('express');

const app = express();
const port = 9000;

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const items = [
  { id: 1, name: 'Bread', price: 1.52 },
  { id: 2, name: 'Tea', price: 1.89 },
  { id: 3, name: 'Biscuits', price: 1.79 },
  { id: 4, name: 'Milk', price: 0.79 },
  { id: 5, name: 'Yoghurt', price: 1.29 },
  { id: 6, name: 'Eggs', price: 2.12 },
  { id: 7, name: 'Cheese', price: 1.99 },
  { id: 8, name: 'Coffee', price: 1.49 },
  { id: 9, name: 'Butter', price: 2.79 },
];

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price, 0).toFixed(2);
};

app.get('/items/total', async (req, res) => {
  const totalPrice = calculateTotalPrice(items);

  if (!totalPrice) {
    next({
      errorCode: 500,
      message: 'No total price',
    });
  } else {
    res.send({ total_price: totalPrice });
  }
});

app.get('/items', async (req, res) => {
  const itemIds = items.map((item) => item.id);

  if (!itemIds) {
    next({
      errorCode: 404,
      message: 'No items',
    });
  } else {
    res.send(itemIds);
  }
});

app.get('/items/:id', async (req, res, next) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === Number(id));

  if (!item) {
    next({
      errorCode: 404,
      message: 'Item not found',
    });
  } else {
    res.send(item);
  }
});

app.use((err, req, res, next) => {
  res.status(err.errorCode).send(err);
});

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
