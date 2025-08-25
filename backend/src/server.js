import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import dotenv from 'dotenv'
import { addCustomercode, createUsersTable, Webhookpaystack } from "./controllers/users.js";
import userRoute from "./routes/userRoute.js";
import transactionRoute from "./routes/transactionRoute.js";

// import createUsersTable from "./controllers/users"

dotenv.config()

const app = express();

app.use(express.json());

app.use(clerkMiddleware())

const Port = process.env.Port || 8080

app.use(cors({
    origin: ['https://bill-payment-one.vercel.app', 'http://localhost:8080'],
    methods: 'GET, PUT, POST, PATCH, HEAD'
}))

app.get("/", (req, res) => {
    res.send('initialized')
})

app.use("/api", userRoute)
app.use("/api", transactionRoute)

// MODIFY()
addCustomercode()

createUsersTable().then(() => {
    if (process.env.NODE_ENV !== 'production') {
        app.listen(Port, () => {
            console.log(`app listening on Port:${Port}`)
        })
    }


})

export default app;
