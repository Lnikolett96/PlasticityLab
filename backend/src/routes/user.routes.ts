import { Router } from 'express'
import { createUser, getUser } from '../handlers/user.handler.js';

const user = Router()

user.get('/', getUser)
user.post('/', createUser)

export default user;