import { sqldb } from "../config/db.js";
import { clerkClient, getAuth } from "@clerk/express";
import axios from 'axios'
import crypto from 'crypto'
import "dotenv/config"

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET
if (!PAYSTACK_SECRET) {
    throw new Error("Missing PAYSTACK_SECRET environment variable")
}

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
        number VARCHAR(15) UNIQUE NULL,
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
        await sqldb`
            ALTER TABLE users ALTER COLUMN number TYPE VARCHAR(15);
        `
        console.log('Ensured user columns: customer_code, acct_name, acct_num, number')
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

export const UpdateUsers = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ message: "unauthorized" });

        const body = req.body ?? {};
        const { firstName, lastName, number } = body;

        // Apply only provided fields atomically and return the final row
        const hasAny =
            Object.prototype.hasOwnProperty.call(body, "firstName") ||
            Object.prototype.hasOwnProperty.call(body, "lastName") ||
            Object.prototype.hasOwnProperty.call(body, "number");
        if (!hasAny) {
            return res.status(400).json({ message: "no fields to update" });
        }
        const finduser = await sqldb`
            SELECT * FROM users WHERE clerk_id = ${userId}
        `;
        if (finduser.length == 0) {
            return res.status(404).json({ message: "no user found" })
        }
        let last
        let updatedpaystack
        const paystackPayload = {};
        if (Object.prototype.hasOwnProperty.call(body, "firstName")) {
            const fn = typeof firstName === "string" ? firstName.trim() : null;
            const rows = await sqldb`UPDATE users SET firstName = ${fn} WHERE clerk_id = ${userId} RETURNING *`;
            paystackPayload.first_name = fn;
            last = rows[0] ?? last;
        }
        if (Object.prototype.hasOwnProperty.call(body, "lastName")) {
            const ln = typeof lastName === "string" ? lastName.trim() : null;
            const rows = await sqldb`UPDATE users SET lastName = ${ln} WHERE clerk_id = ${userId} RETURNING *`;
            paystackPayload.last_name = ln;
            last = rows[0] ?? last;
        }
        if (Object.prototype.hasOwnProperty.call(body, "number")) {
            const nm = typeof number === "string" ? number.trim() : null;
            const rows = await sqldb`UPDATE users SET number = ${nm} WHERE clerk_id = ${userId} RETURNING *`;
            paystackPayload.phone = nm;
            last = rows[0] ?? last;
        }
        if (!last) {
            return res.status(404).json({ message: "no user found" });
        }
        if (Object.keys(paystackPayload).length > 0) {
            const response = await axios.put(
                `${PAYSTACK_API}/customer/${finduser[0].customer_code}`,
                paystackPayload,
                {
                    headers: {
                        Authorization: `Bearer ${PAYSTACK_SECRET}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 15000
                }
            );
            updatedpaystack = response?.data ?? updatedpaystack
        }
        return res.status(200).json({
            message: "user updated successfully",
            data: last,
            provider: updatedpaystack
        });
    } catch (error) {
        if (error?.code === "23505") {
            return res.status(409).json({ message: "phone number already in use" });
        }
        if (error?.code === "22001") {
            return res.status(400).json({ message: "invalid field length" });
        }
        console.error("UpdateUsers error:", error);
        return res.status(500).json({ message: "internal server error" });
    }
};

// Paystack Category
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

        const data = {
            email: finduser[0].email,
            first_name: finduser[0].firstname,
            last_name: finduser[0].lastname,
            phone: finduser[0].number
        };

        const postdata = await axios.post(`${PAYSTACK_API}/customer`, data, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
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

export async function ValidateCustomer(req, res) {
    try {
        // const { userId } = getAuth(req)
        // const finduser = await sqldb`
        //     SELECT * FROM users WHERE clerk_id = ${userId}
        // `;
        // if (finduser.length == 0) {
        //     return res.status(404).json({ message: "no user found" })
        // }

        const customer_code = req.params

        if (!customer_code) {
            return res.status(409).json({ message: "customer_code not found for user. Create customer first" })
        }
        const data = {
            country: "NG",
            type: "bank_account",
            account_number: "0111111111",
            bvn: "222222222221",
            bank_code: "007",
            first_name: "Uchenna",
            last_name: "Okoro"
        }
        
        const postdata = await axios.post(`${PAYSTACK_API}/customer/${customer_code}/identification`, data, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
                'Content-Type': 'application/json'
            }, timeout: 15000
        })
        const result = postdata.data;
        if (!result?.status) {
            return res
                .status(400)
                .json({ message: result.message || "provider rejected identification", provider: result });
        }
        return res.status(202).json({ provider: result });
    } catch (error) {
        const status =
            error?.response?.status ??
            (error?.code === "ECONNABORTED" ? 504 : 502);
        const provider =
            error?.response?.data && typeof error.response.data === "object"
                ? {
                    status: error.response.data.status,
                    message: error.response.data.message,
                    code: error.response.data.code,
                }
                : undefined;
        console.error("ValidateCustomer failed", {
            code: error?.code,
            status: error?.response?.status,
            message: error?.message,
        });
        return res.status(status).json({
            message: "validation fail",
            providers: error?.response?.message,
            mssg: error
        })
    }
}

export async function Webhookpaystack(req, res) {
    const signature = String(req.get('x-paystack-signature') || "");
    const raw = Buffer.isBuffer(req.body)
        ? req.body
        : (req.rawBody && Buffer.isBuffer(req.rawBody) ? req.rawBody : null);
    if (!raw || !signature) {
        return res.sendStatus(400);
    }
    const computed = crypto.createHmac('sha512', PAYSTACK_SECRET).update(raw).digest('hex');
    const expected = Buffer.from(computed, 'utf8');
    const provided = Buffer.from(signature, 'utf8');
    if (expected.length !== provided.length || !crypto.timingSafeEqual(expected, provided)) {
        return res.sendStatus(401);
    }

    let event;
    try {
        event = JSON.parse(raw.toString('utf8'));
    } catch {
        return res.sendStatus(400);
    }

    if (event?.event === 'customeridentification.success') {
        const customer_code = event?.data?.customer?.customer_code ?? event?.data?.customer_code;
        if (!customer_code) return res.sendStatus(202);
        const rows = await sqldb`SELECT id, acct_num FROM users WHERE customer_code = ${customer_code}`;
        if (rows.length && rows[0].acct_num) return res.sendStatus(200);
        try {
            const postdata = await axios.post(`${PAYSTACK_API}/dedicated_account`, { customer: customer_code }, {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET}`,
                    'Content-Type': 'application/json'
                }, timeout: 15000
            });
            const acct_num = postdata?.data?.data?.account_number;
            const acct_name = postdata?.data?.data?.account_name;
            if (acct_num && acct_name && rows.length) {
                await sqldb`UPDATE users SET acct_num = ${acct_num}, acct_name = ${acct_name} WHERE id = ${rows[0].id}`;
            }
        } catch (e) {
            console.error('Webhookpaystack: failed to create dedicated account', e?.response?.data ?? e);
        }
        return res.sendStatus(200);
    }
    if (event?.event === 'customeridentification.failed') {
        return res.status(200).json({ reason: event?.data?.reason });
    }
    return res.sendStatus(200)
}