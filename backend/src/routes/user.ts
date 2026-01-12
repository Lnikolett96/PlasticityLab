import { Router } from 'express'
import { createUser, getUser } from '../handlers/user/user.js';

const user = Router()

user.get('/', getUser)
user.post('/', createUser)

export default user;