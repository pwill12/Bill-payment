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
            SELECT balance,username FROM users WHERE clerk_id = ${userId}
        `
        const getreceiver = await sqldb`
            SELECT * FROM users WHERE username = ${receiver}
         `

        if (!getreceiver || getreceiver.length === 0) {
            return res.status(404).json({ message: "Receiver not found" })
        }
        const senderbal = parseFloat(getbalance[0].balance)

        if (senderbal <= 0 || amount <= 0) {
            console.log("balance is less than 0")
            return res.status(400).json({ message: "all fields required" })
        }

        try {
            const transaction = await sqldb`
                BEGIN;
                UPDATE users SET balance = balance - ${amount} WHERE username = ${getbalance[0].username};
                UPDATE users SET balance = balance + ${amount} WHERE username = ${receiver};
                INSERT INTO transactionlog (sender, receiver, type , amount)
                VALUES (${getbalance[0].username}, ${receiver}, ${type}, ${amount});
                COMMIT;
            `
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