import { Schema, model, Document } from 'mongoose'

export interface IPoint extends Document {
  x: number,
  y: number,
}

export const PointSchema = new Schema<IPoint>({
  x: { type: Number, required: true, unique: true },
  y: { type: Number, required: true, unique: true },
})

export interface ISetOfPoints extends Document {
  points: IPoint[],
}

const SetOfPointsSchema = new Schema<ISetOfPoints>({
  points: [PointSchema]
}, { timestamps: true })

export const SetOfPoints = model<ISetOfPoints>('ConjuntoDePontos', SetOfPointsSchema)