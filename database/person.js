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
    required: true,
    unique: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: (value) => /\d{2,3}-\d{4,}/.test(value),
      message: () => "Number must be in format 00-000000 or 000-000000",
    },
  },
})

personSchema.set("toJSON", {
  transform: (_document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  },
})

module.exports = mongoose.model("Person", personSchema)
