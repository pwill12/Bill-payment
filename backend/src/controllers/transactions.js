import { getAuth } from "@clerk/express";
import { sqldb } from "../config/db.js";

export async function transactionsTable() {
    try {
        await sqldb`CREATE TABLE IF NOT EXISTS transactionlog(
                id SERIAL PRIMARY KEY,
                type VARCHAR(30) NOT NULL,
                amount DECIMAL(20,2) NOT NULL,
                sender VARCHAR(20) NULL,
                receiver VARCHAR(20) NULL,
                created_at DATE NOT NULL DEFAULT CURRENT_DATE
                )`;
        console.log("transaction table created successfully");
    } catch (error) {
        console.error("error creating transactions table", error);
        process.exit(1)
    }
}

export async function transactions(req, res) {
    try {
        await transactionsTable();

        const { amount, type, receiver } = req.body
        const { userId } = getAuth(req)

        const getbalance = await sqldb`
            SELECT * FROM users WHERE clerk_id = ${userId}
        `
        const getreceiver = await sqldb`
            SELECT username FROM users WHERE username = ${receiver}
         `

        if (!getreceiver || getreceiver.length === 0) {
            return res.status(404).json({ message: "Receiver not found" })
        }

        if (amount <= 0) {
            return res.status(400).json({ message: "Amount must be positive" })
        }

        if (getbalance[0].username === receiver) {
            return res.status(400).json({ message: "Cannot send money to yourself" })
        }

        try {
            await sqldb`BEGIN`
            await sqldb`UPDATE users SET balance = balance - ${amount} 
                WHERE username = ${getbalance[0].username} AND balance >= ${amount}`
            await sqldb`UPDATE users SET balance = balance   ${amount} WHERE username = ${receiver}`;
            const transaction = await sqldb`INSERT INTO transactionlog(sender, receiver, type, amount)
                VALUES(${getbalance[0].username}, ${receiver}, ${type}, ${amount})`
            await sqldb`COMMIT`;
            res.status(201).json(transaction)
        } catch (error) {
            await sqldb`
            ROLLBACK;
            `
            res.status(401).json({ message: "error creating transaction sending" })
            console.log("error sending money", error)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}