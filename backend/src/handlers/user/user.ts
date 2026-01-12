import { Request, Response } from "express"

export function getUser(req: Request, res: Response) {
    res.json([{username: "Carlo", email: "carlos.montego@gmail.com", password: "121TrgQwedf", createdAt: Date.now()}])
}

export function createUser(req: Request, res: Response) {
    res.json(["A User has been created"])
}