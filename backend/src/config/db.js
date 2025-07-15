import { neon } from "@neondatabase/serverless"

import "dotenv/config"

export const sqldb = neon(process.env.DATABASE_URL)