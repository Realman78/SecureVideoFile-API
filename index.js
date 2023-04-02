const express = require("express")
const connectDB = require("./config/db")
require("dotenv").config()

const PORT = process.env.PORT || 3000

const app = express()

app.get("/", (req, res)=> {
    res.json({msg: "hi u got me"})
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    })
}).catch((e) => {
    console.log(e)
})
