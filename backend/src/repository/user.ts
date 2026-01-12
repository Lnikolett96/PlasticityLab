import { pool } from '../database/db.js';
import { user, userDTO, userLoginData } from '../types/user.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class userRepository {

    static async createUser(data: userDTO): Promise<user> {
        //Hash the Password
        const password_hash = await bcrypt.hash(data.password, SALT_ROUNDS);

        const result = await pool.query<user>(`
        INSERT INTO users (username,email,password_hash)
        VALUES ($1,$2,$3)
        RETURNING id, username, email, password_hash, created_at
        `, [data.username, data.email, password_hash]);


        if (!result.rows[0]) {
            throw new Error("User creation failed"); 
        }

        return result.rows[0]
    }

    static async getUser(loginParam: userLoginData): Promise<user> {

        const result = await pool.query<user>(`
            SELECT * FROM users WHERE email=$1
            `, [loginParam.email])

        const user = result.rows[0];
        if (!user) throw new Error('Invalid email or password');

        // 2. Ellenőrizd a jelszót bcrypt-tel
        const passwordMatch = await bcrypt.compare(loginParam.password, user.password_hash);
        if (!passwordMatch) throw new Error('Invalid email or password');

        return user
    }
}