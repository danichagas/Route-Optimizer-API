import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Route } from '../schemas/route.schema'
import { Point, SetOfPoints } from 'src/points/schemas/point.schema'
import { PointsService } from 'src/points/services/points.service'

@Injectable()
export class RoutesService {
    constructor(
        @InjectModel(Route.name) private routeModel: Model<Route>,
        private readonly pointService: PointsService,
    ) {}

    private calculateDistance(point1: Point, point2: Point): number {
        return Math.sqrt(
            Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
        )
    }

    private findNearestNeighbor(
        currentPoint: Point,
        unvisitedPoints: Point[],
    ): Point | null {
        if(unvisitedPoints.length === 0) {
            return null
        }

        let nearestNeighbor = unvisitedPoints[0]
        let shortestDistance = this.calculateDistance(currentPoint, nearestNeighbor)

        for(let i = 1; i < unvisitedPoints.length; i++) {
            const distance = this.calculateDistance(currentPoint, unvisitedPoints[i])
            if(distance < shortestDistance) {
                shortestDistance = distance
                nearestNeighbor = unvisitedPoints[i]
            }
        }
        return nearestNeighbor
    }

    private calculateOptimizeRoute(
        points: Point[],
    ): { route: Point[]; totalDistance: number } {
        if(!points || points.length === 0) {
            return { route: [], totalDistance: 0 }
        }

        const unvisitedPoints = [...points]
        const startPoint = unvisitedPoints.shift()

        if(!startPoint) {
            return { route: [], totalDistance: 0 }
        }

        const optimizedRoute: Point[] = [startPoint]
        let currentPoint = startPoint
        let totalDistance = 0

        while (unvisitedPoints.length > 0) {
            const neighbor = this.findNearestNeighbor(currentPoint, unvisitedPoints)

            if(neighbor) {
                totalDistance += this.calculateDistance(currentPoint, neighbor)
                currentPoint = neighbor
                optimizedRoute.push(currentPoint)

                const index = unvisitedPoints.findIndex(p => p._id.equals(neighbor._id))
                if(index > -1) {
                    unvisitedPoints.splice(index, 1)
                } else {
                    break
                }
            }
        }
        return { route: optimizedRoute, totalDistance }
    }

    
}