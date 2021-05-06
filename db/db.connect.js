const mongoose = require("mongoose")

// TODO: move to .env/sec
// TODO: use async await instead of then/catch
function initializeDBConnection() {
  // Connecting to DB
  mongoose.connect("mongodb+srv://Adminsat:Contract1236@neog-cluster.ceqpa.mongodb.net/inventory?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then(() => console.log("successfully connected to DB"))
    .catch(error => console.error("mongoose connection failed...", error))
}

module.exports = { initializeDBConnection }

