import { pool } from '../database/db.js';
import { user, userDTO, userLoginData } from '../types/user.types.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class userRepository {

    static async createUser(data: userDTO): Promise<user> {
        const password_hash = await bcrypt.hash(data.password, SALT_ROUNDS);

        try {
            const result = await pool.query<user>(
                `
                INSERT INTO users (username, email, password_hash)
                VALUES ($1, $2, $3)
                RETURNING id, username, email, password_hash, created_at
                `,
                [data.username, data.email, password_hash]
            );

            const user = result.rows[0];
            if (!user) throw new Error('User creation failed');

            return user;

        } catch (err: any) {
            if (err.code === "23505") {
                throw new Error("Username or email already exists");
            }
            throw err; 
        }
    }


    static async getUserByEmail(email: string): Promise<user> {
        const result = await pool.query<user>(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (!result.rows[0]) {
            throw new Error("User not found");
        }
        return result.rows[0];
    }
}