import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import connectDB from './src/config/db.js'

import pointRoutes from './src/routes/PointRoute.js'
import routeRoutes from './src/routes/RouteRoute.js'

import './src/models/Point.js'
import './src/models/Route.js'

const app: Application = express()
connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Funcionou')
})

app.use('/api/points', pointRoutes)
app.use('/api/routes', routeRoutes)

export default app