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

app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    res.status(400).json({ error: "Missing name or number" })
    return
  }

  try {
    const sameNamePerson = await Person.find({ name })
    if (sameNamePerson.length > 0) {
      res.status(400).json({ error: "Name must be unique" })
      return
    }

    const newPerson = new Person({ name, number })
    savedPerson = await newPerson.save()
    res.status(201).json(savedPerson)
  } catch (err) {
    next(err)
  }
})

app.get("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id
  try {
    const person = await Person.findById(id)
    if (!person) {
      res.status(404).end()
      return
    }
    res.json(person)
  } catch (err) {
    next(err)
  }
})

app.put("/api/persons/:id", async (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    res.status(400).json({ error: "Missing name or number" })
    return
  }
  const id = req.params.id
  try {
    const oldPerson = await Person.findById(id)
    if (!oldPerson) {
      res.status(404).end()
      return
    }

    const person = {
      name,
      number,
    }

    const updatedPerson = await Person.findByIdAndUpdate(id, person, { new: true })
    res.json(updatedPerson)

  } catch (err) {
    next(err)
  }
})

app.delete("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id
  try {
    await Person.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

const errorHandler = (err, _req, res, next) => {
  console.log(err)
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening to requests at port ${PORT}`)
})
