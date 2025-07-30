import { Schema, model, Document, type Types } from 'mongoose'
import { PointSchema, IPoint } from './Point.js'

export interface IRoute extends Document {
  _id: Types.ObjectId,
  pointSetId: Types.ObjectId,
  routeOptimizer: IPoint[],
  totalDistance: number,
  createdAt: Date,
  updatedAt: Date,
}

const RouteSchema = new Schema<IRoute>({
  pointSetId: {
    type: Schema.Types.ObjectId,
    ref: 'PointSet',
    required: true,
  },
  routeOptimizer: [PointSchema],
  totalDistance: { type: Number, required: true },  
}, { timestamps: true })

export const Route = model<IRoute>('Route', RouteSchema)