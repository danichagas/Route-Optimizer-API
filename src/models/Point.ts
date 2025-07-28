import { Schema, model, Document } from 'mongoose'

export interface IPoint extends Document {
  name: String,
  x: number,
  y: number,
}

const PointSchema = new Schema<IPoint>({
  name: { type: String, required: true, unique: true },
  x: { type: Number, required: true, unique: true },
  y: { type: Number, required: true, unique: true },
})

export interface ISetOfPoints extends Document {
  points: IPoint[],
}

const SetOfPointsSchema = new Schema<ISetOfPoints>({
  points: [PointSchema]
}, { timestamps: true })

export const SetOfPoints = model<ISetOfPoints>('ConjuntodePontos', SetOfPointsSchema)