import { Schema, model, Document } from 'mongoose'
import { PointSchema, IPoint } from './Point.js'

export interface IRoute extends Document {
  setOfPointsId: Schema.Types.ObjectId,
  routeOptimizer: IPoint[],
  totalDistance: number
}

const RouteSchema = new Schema<IRoute>({
  setOfPointsId: {
    type: Schema.Types.ObjectId,
    ref: 'ConjuntoDePontos',
    required: true,
  },
  routeOptimizer: [PointSchema],
  totalDistance: { type: Number, required: true },  
}, { timestamps: true })

export const Route = model<IRoute>('Rota', RouteSchema)