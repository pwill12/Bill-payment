import { sqldb } from "../config/db.js";

export async function transactionsTable() {
    try {
        await sqldb`CREATE TABLE IF NOT EXISTS transactions(
                id SERIAL PRIMARY KEY,
                type VARCHAR(30) NOT NULL,
                amount DECIMAL(20,2) NOT NULL,
                sender VARCHAR(20) NULL,
                receiver VARCHAR(20) NULL,
                created_at DATE NOT NULL DEFAULT CURRENT_DATE
                )`;
        console.log("transactions table created successfully");
    } catch (error) {
        console.error("error creating transactions table", error);
        process.exit(1)
    }
}

export async function transactions(req, res) {
    try {
        await transactionsTable();

        const { amount, type, sender, receiver } = req.body
        const { user_id } = req.params

        const getbalance = await sqldb`
            SELECT balance FROM users WHERE user_id = ${user_id}
        `
        const senderbal = parseFloat(getbalance[0].balance)

        const getreceiverbalance = await sqldb`
            SELECT balance FROM users WHERE user_id = ${receiver}
        `
        const receiverbal = parseFloat(getreceiverbalance[0].balance)

        if (senderbal <= 0 || amount <= 0) {
            console.log("balance is less than 0")
            return res.status(400).json({ message: "all fields required" })
        }

        if (type == "send") {
            const updated_receiver_balance = receiverbal + amount

            const updated_user_balance = senderbal - amount

            console.log(amount)

            try {
                await sqldb`
                UPDATE users
                SET balance = ${updated_user_balance}
                WHERE user_id = ${user_id}
                RETURNING *
            `
                await sqldb`
                    UPDATE users
                    SET balance = ${updated_receiver_balance}
                    WHERE user_id = ${receiver}
                    RETURNING *
                `
                // res.status(201).json([updated_sender[0], receiver_acct[0]])

            } catch (error) {
                res.status(401).json({ message: "error creating transaction sending" })
                console.log("error sending money", error)
            }

        }

        const transaction = await sqldb`
            INSERT INTO transactions(type, amount, sender, receiver)
            VALUES (${type}, ${amount}, ${sender}, ${receiver})
            RETURNING *
        `

        res.status(201).json(transaction)


    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error"})
    }
}