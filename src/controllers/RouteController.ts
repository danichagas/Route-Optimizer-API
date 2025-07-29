import { Request, Response } from 'express'
import { SetOfPoints } from '../models/Point.js'
import { Route } from '../models/Route.js'
import { calculateOptimizedRoute } from '../services/RouteService.js'

//GET /:id
export const getOptimizerRoute = async (req: Request, res: Response) => {
  try {
    const set = await SetOfPoints.findById(req.params.id)

    if (!set) {
      return res.status(404).json({ message: 'Os pontos não foram encontrados' })
    }

    const { route, totalDistance } = calculateOptimizedRoute(set.points)

    const newRoute = new Route({
      setOfPointsId: set._id,
      routeOptimizer: route,
      totalDistance,
    })
    await newRoute.save()

    res.status(200).json({
      optimizerRoute: route,
      totalDistance,
      calculatedRouteId: newRoute._id,
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error })
  }
}

//GET/historico
export const getHistoricRoute = async (req: Request, res: Response) => {
  try {
    const historic = await Route.find()
    .populate('conjuntoDePontosId', 'id createdAt')
    .sort({ createdAt: -1 })

    const response = historic.map(route => ({
      routeId: route._id,
      setOfPointsId: route.setOfPointsId,
      totalDistance: route.totalDistance,
    }))

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error })
  }
}

//DELETE /:id
