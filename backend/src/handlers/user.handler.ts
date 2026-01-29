import { Request, Response } from "express"
import { UserService } from "../services/user.service";

export async function getUser(req: Request, res: Response) {
   const { email, password} : {email: string, password: string} = req.body
   try {
        const user = await UserService.login({email, password});
        res.json(user);
   } catch (error) {
        res.status(401).json({ error: "Invalid email or password" });
   }
}

export async function createUser(req: Request, res: Response) {
    const {username, email, password} : {username: string, email: string, password: string} = req.body
    try {
        const user = await UserService.register({username, email, password});
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at
            }
        });
        
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
}