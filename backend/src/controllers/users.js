import { sqldb } from "../config/db.js";

export async function createUsersTable() {

    try {
        await sqldb`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NULL,
        balance DECIMAL(20,2) DEFAULT 100.00,
        email VARCHAR(255) UNIQUE NULL,
        number VARCHAR(11) UNIQUE NULL,
        bvn VARCHAR(11) UNIQUE NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error while creating users table", error);
        process.exit(1)
    }
}

// export async function MODIFY() {

//     try {
//         await sqldb`ALTER TABLE users ADD CONSTRAINT balance_updated DEFAULT (100) FOR balance
//         `
//         console.log("ALTERED");
//     } catch (error) {
//         console.error("Error while creating users table", error);
//         process.exit(1)
//     }
// }

export async function insertUsers(req, res) {

    try {
        const { user_id, name, email, number, bvn } = req.body
        const insertuser = await sqldb`
            INSERT INTO users(user_id, name, email, number, bvn)
            VALUES (${user_id}, ${name}, ${email}, ${number}, ${bvn})
            RETURNING *
        `;
        res.status(201).json(insertuser[0])
    } catch (error) {
        console.log("Error while creating users", error);
        res.status(500).json({message: "internal server error"})
    }
}

export async function findUser(req, res) {

    try {
        const { user_id } = req.params
        const finduser = await sqldb`
            SELECT * FROM users WHERE user_id = ${user_id}
        `;

        if (finduser.length == 0) {
            res.status(401).json({message: "no user found"})
        }

        res.status(201).json(finduser[0])

    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }
}
