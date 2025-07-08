import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { createUsersTable } from "./controllers/users.js";
import userRoute from "./routes/userRoute.js";
import transactionRoute from "./routes/transactionRoute.js";

// import createUsersTable from "./controllers/users"

dotenv.config()

const app = express();

app.use(express.json());

const Port = process.env.Port || 8080

// app.use(cors)

app.get("/", (req, res) => {
    res.send('hello')
    console.log('first')
})

app.use("/api", userRoute)
app.use("/api", transactionRoute)

// MODIFY()

createUsersTable().then(() => {
    app.listen(Port, () => {
        console.log(`app listening on Port:${Port}`)
    })
})
