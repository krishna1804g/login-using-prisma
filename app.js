const express = require('express')

const app = express()
require('dotenv').config();

const PORT = process.env.PORT || 5001

app.get("/", ( _, res, next) => {
    try {
        res.send("hi there, index page here 🙃")
    } catch (error) {
        next(error)
    }
})

app.use(express.json());
const user = require("./router/user.router")

// middleware
app.use("/user", user)


const start = () => {
    try {
        app.listen(PORT)
        console.log(`Listining on port ${PORT}`)
    } catch (error) {
        console.error(error)
    }
} 

start();