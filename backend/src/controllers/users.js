import { sqldb } from "../config/db.js";
import { clerkClient, getAuth } from "@clerk/express";
import axios from 'axios'
import "dotenv/config"

export async function createUsersTable() {

    try {
        await sqldb`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        clerk_id VARCHAR(50) UNIQUE NOT NULL,
        username VARCHAR(50) UNIQUE NULL,
        firstName VARCHAR(255) NULL,
        lastName VARCHAR(255) NULL,
        balance DECIMAL(20,2) DEFAULT 100.00,
        email VARCHAR(255) UNIQUE NULL,
        number VARCHAR(11) UNIQUE NULL,
        bvn VARCHAR(11) UNIQUE NULL,
        img VARCHAR(255) UNIQUE NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error while creating users table", error);
        process.exit(1)
    }
}

export async function addCustomercode() {
    try {
        await sqldb`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS customer_code VARCHAR(50)
        `
        await sqldb`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS acct_name VARCHAR(50)
        `
        await sqldb`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS acct_num VARCHAR(50)
        `
        console.log('Ensured user columns: customer_code, acct_name, acct_num')
    } catch (error) {
        console.error("Error ensuring user columns", error);
        throw error
    }
}


export async function insertUsers(req, res) {

    try {
        const { userId } = getAuth(req);

        const findexistinguser = await sqldb`
            SELECT * FROM users WHERE clerk_id = ${userId}
        `;

        if (findexistinguser.length > 0) {
            return res.status(200).json({ user: findexistinguser[0], message: "User already exists" });
        }

        const clerkUser = await clerkClient.users.getUser(userId);

        const userData = {
            clerk_id: userId,
            email: clerkUser.emailAddresses[0]?.emailAddress,
            firstName: clerkUser.firstName || null,
            lastName: clerkUser.lastName || null,
            username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
            img: clerkUser.imageUrl || null,
        };

        const insertuser = await sqldb`
            INSERT INTO users(clerk_id, username, firstName, lastName, email, img)
            VALUES (${userData.clerk_id}, ${userData.username}, ${userData.firstName}, ${userData.lastName}, ${userData.email}, ${userData.img})
            RETURNING *
        `;
        return res.status(201).json(insertuser[0])
    } catch (error) {
        console.log("Error while creating users", error);
        res.status(500).json({ message: "internal server error" })
    }
}

export async function findUser(req, res) {

    try {
        const { userId } = getAuth(req);

        const finduser = await sqldb`
            SELECT * FROM users WHERE clerk_id = ${userId}
        `;

        if (finduser.length == 0) {
            return res.status(404).json({ message: "no user found" })
        }

        res.status(201).json(finduser[0])

    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}

export async function findReceivers(req, res) {

    try {

        const { receiver } = req.params

        const finduser = await sqldb`
            SELECT * FROM users WHERE username = ${receiver}
        `;

        if (finduser.length == 0) {
            return res.status(404).json({ message: "no user found" })
        }

        res.status(200).json(finduser[0])

    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}

const PAYSTACK_API = "https://api.paystack.co"

export async function CreatePaystackCode(req, res) {

    try {

        const { userId } = getAuth(req)

        const finduser = await sqldb`
            SELECT * FROM users WHERE clerk_id = ${userId}
        `;

        if (finduser.length == 0) {
            return res.status(404).json({ message: "no user found" })
        }

        if (finduser[0].customer_code) {
            return res.status(200).json({
                message: "customer already exists",
                customer_code: finduser[0].customer_code
            });
        }

        if (!process.env.PAYSTACK_SECRET) {
            return res.status(500).json({ message: "PAYSTACK_SECRET is not configured" });
        }

        const {phone} = req.body

        const data = {
            email: finduser[0].email,
            first_name: finduser[0].firstName ?? undefined,
            last_name: finduser[0].lastName ?? undefined,
            phone: phone ?? "08081234678"
        };

        const postdata = await axios.post(`${PAYSTACK_API}/customer`, data, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
                'Content-Type': 'application/json'
            }, timeout: 15000
        })

        const customerCode = postdata?.data?.data?.customer_code;
        if (customerCode) {
            await sqldb`
                UPDATE users
                SET customer_code = ${customerCode}
                WHERE clerk_id = ${userId}
             `;
        }
        return res.status(200).json({
            customer_code: customerCode,
            provider: postdata.data
        })

    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}

