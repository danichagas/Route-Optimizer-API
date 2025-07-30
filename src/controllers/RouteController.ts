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

    const newRoute = await new Route({
      pointSetId: set._id,
      routeOptimizer: route,
      totalDistance,
    })
    await newRoute.save()

    res.status(200).json({
      optimizerRoute: newRoute.routeOptimizer,
      pointSetId: newRoute.pointSetId,
      calculationDate: newRoute.createdAt,
      totalDistance: newRoute.totalDistance,
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
    .populate('pointSetId')
    .sort({ createdAt: -1 })

    const response = historic.map(route => ({
      routeId: route._id,
      setOfPointsId: route.pointSetId,
      totalDistance: route.totalDistance,
    })).filter(item => item !== null)

    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro no servidor', error })
  }
}

//DELETE /:id
export const deleteRoute = async (req: Request, res: Response) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id)

    if (!route) {
      return res.status(404).json({ message: 'A rota não foi encontrada' })
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error })
  }
}
