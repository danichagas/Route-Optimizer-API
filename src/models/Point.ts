import { Schema, model, Document, type Types } from 'mongoose'

export interface IPoint extends Document {
  _id: Types.ObjectId,
  x: number,
  y: number,
}

export const PointSchema = new Schema<IPoint>({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
})

export interface ISetOfPoints extends Document {
  points: IPoint[],
}

const PointSetSchema = new Schema<ISetOfPoints>({
  points: [PointSchema]
}, { timestamps: true })

export const SetOfPoints = model<ISetOfPoints>('PointSet', PointSetSchema)