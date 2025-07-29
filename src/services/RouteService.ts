import { IPoint } from '../models/Point.js'

const calculateDistance = (point1: IPoint, point2: IPoint): number => {
  return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2))
}

const findNearestNeighbor = (currentPoint: IPoint, unvisitedPoints: IPoint[]): IPoint | null => {
  if (unvisitedPoints.length === 0) {
    return null
  }

  let nearestNeighbor: IPoint = unvisitedPoints[0]
  let shortestDistance = calculateDistance(currentPoint, nearestNeighbor)

  for (let i = 1; i < unvisitedPoints.length; i++) {
    const distance = calculateDistance(currentPoint, unvisitedPoints[i])
    
    if (distance < shortestDistance) {
      shortestDistance = distance
      nearestNeighbor = unvisitedPoints[i]
    }
  }
  return nearestNeighbor
}

export const calculateOptimizedRoute = (points: IPoint[]): { route: IPoint[], totalDistance: number } => {
  if (points.length === 0) {
    return { route: [], totalDistance: 0 }
  }

  const unvisitedPoints = [...points]
  const startPoint = unvisitedPoints.shift()!
  const optimizeRoute: IPoint[] = [startPoint]
  let currentPoint = startPoint
  let totalDistance = 0

  while (unvisitedPoints.length > 0) {
    const neighbor = findNearestNeighbor(currentPoint, unvisitedPoints)

    if (neighbor) {
      totalDistance += calculateDistance(currentPoint, neighbor)
      currentPoint = neighbor
      optimizeRoute.push(currentPoint)

      const index = unvisitedPoints.findIndex(p => p._id.equals(neighbor._id))
      if (index > -1) {
        unvisitedPoints.splice(index, 1)
      }
    }
  }

  return { route: optimizeRoute, totalDistance }
}