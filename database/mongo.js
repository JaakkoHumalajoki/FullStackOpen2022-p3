const mongoose = require("mongoose")

const args = process.argv
if (args.length !== 3 && args.length !== 5) {
  console.log("Call program with <password>, or <password> <name> <number>")
  return
}

const password = args[2]
const url = `mongodb+srv://app:${password}@phonebook.5elmkam.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

if (args.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      Person.find({}).then((persons) => {
        console.log("phonebook:")
        persons.forEach(person => {
          console.log(person.name, person.number)
        })
        return mongoose.connection.close()
      })
    })
    .catch((err) => console.log(err))
}

if (args.length === 5) {
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name: args[3],
        number: args[4],
      })
      return person.save()
    })
    .then((savedPerson) => {
      console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}
