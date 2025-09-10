import { getAuth } from "@clerk/express";
import { sqldb } from "../config/db.js";

export async function createFavoriteTable() {

    try {
        await sqldb`CREATE TABLE IF NOT EXISTS favorite(
        id SERIAL PRIMARY KEY,
        clerk_id VARCHAR(50) NOT NULL,
        username VARCHAR(50) NOT NULL,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        img VARCHAR(255),
        FOREIGN KEY (clerk_id) REFERENCES users(clerk_id) ON DELETE CASCADE
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`
        console.log("Favorite table created successfully");
    } catch (error) {
        console.error("Error while creating favorite table", error);
        throw error
    }
}

export async function insertFavourite(req, res) {

    try {
        const { userId } = getAuth(req);
        const username = String(req.body?.username || "").trim();
        if (!username) {
            return res.status(400).json({ message: "username required" })
        }
        const me = await sqldb`SELECT username FROM users WHERE clerk_id = ${userId}`;
        if (!me || me.length === 0) {
            return res.status(404).json({ message: "current user not found" });
        }
        if (me[0].username === username) {
            return res.status(400).json({ message: "cannot favorite yourself" });
        }
        const checkuser = await sqldb`
            SELECT username, firstName, lastName, img FROM users WHERE username = ${username}
        `;
        if (checkuser.length === 0) {
            return res.status(404).json({ message: "no user found" })
        }

        const checkfavorited = await sqldb`
            SELECT 1 FROM favorite WHERE clerk_id = ${userId} AND username = ${username}
        `;

        if (checkfavorited.length > 0) {
            return res.status(200).json({ message: "User already favorited" });
        }

        const userData = {
            clerk_id: userId,
            firstName: checkuser[0].firstname ?? null,
            lastName: checkuser[0].lastname ?? null,
            username: checkuser[0].username,
            img: checkuser[0].img ?? null,
        };

        const insertfavorite = await sqldb`
            INSERT INTO favorite(clerk_id, username, firstName, lastName, img)
            VALUES (${userData.clerk_id}, ${userData.username}, ${userData.firstName}, ${userData.lastName}, ${userData.img})
            RETURNING *
        `;

        if (insertfavorite.length === 0) return res.status(200).json({ message: "User already favorited" });
        return res.status(201).json(insertfavorite[0])
    } catch (error) {
        console.log("Error while creating users", error);
        res.status(500).json({ message: "internal server error" })
    }
}

export async function findFavorite(req, res) {

    try {
        const { userId } = getAuth(req)
        if (!userId) return res.status(401).json({ message: "unauthorized" });

        const limitParam = Number.parseInt((req.query.limit ?? "3"), 10);
        const offsetParam = Number.parseInt((req.query.offset ?? "0"), 10);
        const limit = Number.isFinite(limitParam) && limitParam > 0 && limitParam <= 100 ? limitParam : 3;
        const offset = Number.isFinite(offsetParam) && offsetParam >= 0 ? offsetParam : 0;

        const findfavorite = await sqldb`
            SELECT * FROM favorite WHERE clerk_id = ${userId}
            ORDER BY created_at DESC
            LIMIT ${limit} OFFSET ${offset};
        `;

        if (findfavorite.length == 0) {
            return res.status(200).json({ message: "no favorite user" })
        }

        res.status(200).json({ data: findfavorite })

    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}