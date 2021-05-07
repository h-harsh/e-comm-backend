const mongoose = require("mongoose")
const mySecret = process.env['key']

function initializeDBConnection() {
  // Connecting to DB
  mongoose.connect(mySecret, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then(() => console.log("successfully connected to DB"))
    .catch(error => console.error("mongoose connection failed...", error))
}

module.exports = { initializeDBConnection }


// mongodb+srv://Adminsat:Contract1236@neog-cluster.ceqpa.mongodb.net/inventory?retryWrites=true&w=majority
