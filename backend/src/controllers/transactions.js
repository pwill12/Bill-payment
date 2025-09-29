import { getAuth } from "@clerk/express";
import { sqldb } from "../config/db.js";
import axios from "axios";

export async function transactionsTable() {
    try {
        await sqldb`CREATE TABLE IF NOT EXISTS transactionlog(
                id SERIAL PRIMARY KEY,
                type VARCHAR(30) NOT NULL,
                amount DECIMAL(20,2) NOT NULL,
                sender VARCHAR(20) NULL,
                receiver VARCHAR(20) NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
        if (!getbalance || getbalance.length === 0) {
            return res.status(404).json({ message: "User not Found" })
        }

        if (type === 'card-deposit') {
            const [transaction] = await sqldb`INSERT INTO transactionlog(sender, receiver, type, amount)
                VALUES(Card-Deposit, ${getbalance[0].username}, ${type}, ${amount})
                RETURNING id
            `
            return res.status(201).json(transaction)
        }

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
            const balanceCheck = await sqldb`UPDATE users SET balance = balance - ${amount} 
                WHERE username = ${getbalance[0].username} AND balance >= ${amount}`

            if (balanceCheck.count === 0) {
                throw new Error("Insufficient balance")
            }
            await sqldb`UPDATE users SET balance = balance + ${amount} WHERE username = ${receiver}`;
            const [transaction] = await sqldb`INSERT INTO transactionlog(sender, receiver, type, amount)
                VALUES(${getbalance[0].username}, ${receiver}, ${type}, ${amount})
                RETURNING id
            `
            await sqldb`COMMIT`;
            return res.status(201).json(transaction)
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

export async function getTransactions(req, res) {
    try {
        const { userId } = getAuth(req);
        const { username } = req.params
        const me = await sqldb`
        SELECT username FROM users WHERE clerk_id = ${userId}
        `;
        if (me[0].username !== username) {
            return res.status(403).json({ message: "forbidden" });
        }
        const limitParam = Number.parseInt((req.query.limit ?? "3"), 10);
        const offsetParam = Number.parseInt((req.query.offset ?? "0"), 10);
        const limit = Number.isFinite(limitParam) && limitParam > 0 && limitParam <= 100 ? limitParam : 3;
        const offset = Number.isFinite(offsetParam) && offsetParam >= 0 ? offsetParam : 0;
        const getTransactions = await sqldb`
            SELECT * FROM transactionlog WHERE sender = ${username} OR receiver = ${username}
            ORDER BY created_at DESC
            LIMIT ${limit} OFFSET ${offset};
        `
        if (getTransactions.length == 0) {
            return res.status(200).json({ data: [] })
        }

        res.status(200).json({ data: getTransactions })

    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}

export async function findTransaction(req, res) {

    try {

        const { id } = req.params

        const findtransaction = await sqldb`
            SELECT * FROM transactionlog WHERE id = ${id}
        `;

        if (findtransaction.length == 0) {
            return res.status(404).json({ message: "no transaction found" })
        }

        res.status(200).json(findtransaction[0])

    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}

export async function getRecent(req, res) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ message: "unauthorized" });
        const username = req.query.username
        if (!username) return res.status(400).json({ message: "username required" });
        const me = await sqldb`
            SELECT username FROM users WHERE clerk_id = ${userId}
        `;
        if (!me || me.length === 0) {
            return res.status(404).json({ message: "user not found" });
        }
        if (me[0].username !== username) {
            return res.status(403).json({ message: "forbidden" });
        }
        const limitParam = Number.parseInt((req.query.limit ?? "3"), 10);
        const offsetParam = Number.parseInt((req.query.offset ?? "0"), 10);
        const limit = Number.isFinite(limitParam) && limitParam > 0 && limitParam <= 100 ? limitParam : 3;
        const offset = Number.isFinite(offsetParam) && offsetParam >= 0 ? offsetParam : 0;

        // const receiverscsv = getRecentsTransfer
        //     .map(r => r?.receiver)
        //     .filter((v) => typeof v === 'string' && v.trim().length > 0)
        //     .map(v => v.trim())
        //     .join(',');

        const findusers = await sqldb`
           WITH recent_receivers AS (
             SELECT receiver, MAX(created_at) AS last_sent_at
             FROM transactionlog
             WHERE sender = ${username}
                AND receiver IS NOT NULL
                AND receiver <> ''
             GROUP BY receiver
             ORDER BY last_sent_at DESC, receiver ASC
             LIMIT ${limit} OFFSET ${offset}
           )
           SELECT u.username, u.firstName, u.lastName, u.img
           FROM users u
           JOIN recent_receivers r ON u.username = r.receiver
           ORDER BY r.last_sent_at DESC, r.receiver ASC;
         `;
        return res.status(200).json({ data: findusers })

        // const findusers = await sqldb`
        //    SELECT username, firstName, lastName, img
        //    FROM users
        //    WHERE username = ANY(string_to_array(${receiverscsv}, ','))
        //  `;

    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}