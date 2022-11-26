const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.MONGODB_URL

console.log("Connecting to database...")

mongoose
  .connect(url)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: String,
})

personSchema.set("toJSON", {
  transform: (_document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  },
})

module.exports = mongoose.model("Person", personSchema)
