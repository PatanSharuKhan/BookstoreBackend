const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const db = new sqlite3.Database("books.db")

app.get("/books", (req, res) => {
  const query = `SELECT * FROM books;`
  db.all(query, (err, rows) => {
    if (err) {
      res.send("something went wrong.")
    } else {
      res.send(rows)
    }
  })
})

app.get("/book/:id", (req, res) => {
  const { id } = req.params
  const query = `SELECT * FROM books WHERE id LIKE ${id};`
  db.get(query, (err, rows) => {
    if (err) {
      res.send("something went wrong.")
    } else {
      res.send(rows)
    }
  })
})

app.listen(4000, () => console.log("server running on port 4000"))

// db.run(`DROP TABLE books;`)

function createTableBooks() {
  const query = `CREATE TABLE books (
        id INTEGER PRIMARY KEY,
        title VARCHAR(50),
        author VARCHAR(50),
        description VARCHAR(200),
        price INTEGER,
        rating INTEGER
    );`
  db.run(query)
}
// createTableBooks()

function insertRecord() {
  const query = `INSERT INTO books(
        title,
        author,
        description,
        price,
        rating
    ) VALUES('Geology','Sharukhan','He is a good boy and also a author!',400,3);`
  db.run(query)
}

// insertRecord()
