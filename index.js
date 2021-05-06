const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();

app.use(bodyParser.json());
app.use(cors())

const products = require("./routes/products.router.js")
const cart = require('./routes/cart.router.js')
const wishlist = require('./routes/wishlist.router.js')

const { initializeDBConnection } = require("./db/db.connect.js")

const PORT = 3000;

// called before any route handler
initializeDBConnection();

app.use("/products", products);
app.use('/cart', cart)
app.use('/wishlist', wishlist )

app.get('/', (request, response) => {
  response.json({ hello: "world"})
});


/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check"})
})

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message})
})

app.listen(PORT, () => {
  console.log('server started on port: ', PORT);
});
