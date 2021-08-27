const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors())

const user = require("./src/routes/user.route")
const products = require("./src/routes/products.router")
const cart = require('./src/routes/cart.route')
const wishlist = require('./src/routes/wishlist.route')
const address = require('./src/routes/address.route')
const order = require('./src/routes/order.route')

const { initializeDBConnection } = require("./src/db/db.connect.js")

const PORT = 5000;

initializeDBConnection();

app.use("/user", user)
app.use("/products", products);
app.use('/cart', cart)
app.use('/wishlist', wishlist )
app.use('/address', address)
app.use('/order', order)

app.get('/', (request, response) => {
  response.json("Welcome to the Fin-store API")
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check"})
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message})
})

app.listen(process.env.PORT || PORT, () => {
  console.log('server started on port: ', PORT);
});
