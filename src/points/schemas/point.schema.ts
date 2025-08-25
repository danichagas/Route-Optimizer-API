import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'

@Schema()
export class Point extends Document {

    declare _id: Types.ObjectId;

    @Prop({ required: true })
    x: number

    @Prop({ required: true })
    y: number
}

export const PointSchema = SchemaFactory.createForClass(Point)

@Schema({ timestamps: true })
export class SetOfPoints extends Document {
    @Prop([PointSchema])
    points: Point[]
}

export const SetOfPointsSchema = SchemaFactory.createForClass(SetOfPoints)