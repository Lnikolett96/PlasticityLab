import bcrypt from "bcrypt";
import { userRepository } from "../repository/user.repository";
import { userDTO, userLoginData } from "../types/user.types";

const SALT_ROUNDS = 10;

export class UserService {

    static async register(data: userDTO) {
        const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

        const user = await userRepository.createUser({
            username: data.username,
            email: data.email,
            password: passwordHash
        });

        return user;
    }

    static async login(data: userLoginData) {
        const user = await userRepository.getUserByEmail(data.email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(data.password, user.password_hash);
        if (!isValid) {
            throw new Error("Invalid credentials");
        }

        return user;
    }
}