import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, Types } from 'mongoose'
import { Point, PointSchema } from 'src/points/schemas/point.schema'

@Schema({ timestamps: true })
export class Route extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'SetOfPoints', required: true })
    pointSetid: Types.ObjectId

    @Prop([PointSchema])
    routeOptimizer: Point[]

    @Prop({ required: true })
    totalDistance: number
}

export const RouteSchema = SchemaFactory.createForClass(Route)