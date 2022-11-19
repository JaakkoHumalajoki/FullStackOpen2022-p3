const express = require("express")
const app = express()
const PORT = 3001

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.get("/", (_req, res) => {
  res.send("<h1>Hi!</h1><a href='/api/persons'>Persons API</a>")
})

app.get("/info", (_req, res) => {
  const time = new Date()
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    </p>${time}</p>`
  )
})

app.get("/api/persons", (_req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (!person) {
    res.status(404).end()
  } else {
    res.json(person)
  }
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (!person) {
    res.status(404).end()
  } else {
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
  }
})

app.listen(PORT, () => {
  console.log(`Server listening to requests at port ${PORT}`)
})
