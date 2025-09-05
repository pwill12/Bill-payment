export async function createFavoriteTable() {

    try {
        await sqldb`CREATE TABLE IF NOT EXISTS favorite(
        clerk_id VARCHAR(50) NOT NULL,
        username VARCHAR(50) NOT NULL,
        firstName VARCHAR(255) NULL,
        lastName VARCHAR(255) NULL,
        img VARCHAR(255) NULL,
        PRIMARY KEY (clerk_id, username),
        FOREIGN KEY (clerk_id) REFERENCES users(clerk_id) ON DELETE CASCADE
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`
        console.log("Favorite table created successfully");
    } catch (error) {
        console.error("Error while creating users table", error);
        process.exit(1)
    }
}

export async function insertFavourite(req, res) {

    try {
        await createFavoriteTable()
        const { userId } = getAuth(req);

        const username = req.body.username

        const checkuser = await sqldb`
            SELECT * FROM favourite WHERE username = ${username}
        `;

        if (!checkuser) {
            return res.status(404).json({ message: "no user found" })
        }

        const checkfavorited = await sqldb`
            SELECT * FROM favourite WHERE clerk_id = ${userId} AND username = ${username}
        `;

        if (checkfavorited.length > 0) {
            return res.status(200).json({ user: checkfavorited[0], message: "User already favorited" });
        }

        const userData = {
            clerk_id: userId,
            firstName: checkuser[0].firstname ?? null,
            lastName: checkuser[0].lastname ?? null,
            username: checkuser[0].username,
            img: checkuser[0].img ?? null,
        };

        const insertuser = await sqldb`
            INSERT INTO users(clerk_id, username, firstName, lastName, img)
            VALUES (${userData.clerk_id}, ${userData.username}, ${userData.firstName}, ${userData.lastName}, ${userData.img})
            RETURNING *
        `;
        return res.status(201).json(insertuser[0])
    } catch (error) {
        console.log("Error while creating users", error);
        res.status(500).json({ message: "internal server error" })
    }
}
