import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import connectDB from './src/config/db.js'

const app: Application = express()
connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Funcionou')
})

export default app