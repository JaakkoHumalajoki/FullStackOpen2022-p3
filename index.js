const express = require("express")
const Person = require("./database/person")
const cors = require("cors")
const app = express()
app.use(express.static("build"))
app.use(express.json())
app.use(cors())

const morgan = require("morgan")
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ")
  })
)

app.get("/info", async (_req, res) => {
  const people = await Person.find({})
  const time = new Date()
  res.send(
    `<p>Phonebook has info for ${people.length} people</p><p>${time}</p>`
  )
})

app.get("/api/persons", async (_req, res) => {
  const people = await Person.find({})
  res.json(people)
})

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body
  if (!name || !number) {
    res.status(400).json({ error: "Missing name or number" })
    return
  }
  const sameNamePerson = await Person.find({ name })
  if (sameNamePerson.length > 0) {
    res.status(400).json({ error: "Name must be unique" })
    return
  }

  const newPerson = new Person({ name: name, number: number })
  savedPerson = await newPerson.save()
  res.status(201).json(savedPerson)
})

// app.get("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id)
//   const person = persons.find((p) => p.id === id)
//   if (!person) {
//     res.status(404).end()
//   } else {
//     res.json(person)
//   }
// })

// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id)
//   const person = persons.find((p) => p.id === id)
//   if (!person) {
//     res.status(404).end()
//   } else {
//     persons = persons.filter((p) => p.id !== id)
//     res.status(204).end()
//   }
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening to requests at port ${PORT}`)
})
