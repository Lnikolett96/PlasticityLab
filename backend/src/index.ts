import dotenv from 'dotenv'

dotenv.config();
import express from 'express'
import user from './routes/user.routes.js'
import { pool } from './database/db.js'

const app = express()
const PORT = 3000

app.use(express.json())

// Check database connection
app.get('/health', async (_req, res) => {
    const result = await pool.query('SELECT 1');
    res.json({ status: 'ok', db: result.rowCount === 1 });
})

// Application Routes
app.use('/api/users', user)


app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`)
})