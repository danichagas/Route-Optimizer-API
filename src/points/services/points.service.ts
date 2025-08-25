import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SetOfPoints } from '../schemas/point.schema'
import { CreateSetOfPointsDto } from '../dto/create-point.dto'
import { UpdateSetOfPointsDto } from '../dto/update-point.dto'

@Injectable()
export class PointsService {
    constructor(@InjectModel(SetOfPoints.name) private setOfPointsModel: Model<SetOfPoints>) {}

    async create(createSetOfPointsDto: CreateSetOfPointsDto): Promise<SetOfPoints>{
        const newSet = new this.setOfPointsModel(createSetOfPointsDto)
        return newSet.save()
    }

    async findOne(id: string): Promise<SetOfPoints> {
        const set = await this.setOfPointsModel.findById(id).exec()

        if(!set) {
            throw new NotFoundException(`Conjunto de pontos com ID: "${id}" não encontrado`)
        }
        return set
    }

    async update(id: string, updateSetOfPointsDto: UpdateSetOfPointsDto): Promise<SetOfPoints> {
        const existingSet = await this.findOne(id)

        const { points: pointsToUpdate } = updateSetOfPointsDto

        for(const updatePoint of pointsToUpdate) {
            if(updatePoint._id) {
                const point = existingSet.points.find(p => p._id.toString() === updatePoint._id)

                if(point) {
                    point.x = updatePoint.x
                    point.y = updatePoint.y
                }
            } else {
                existingSet.points.push({
                    x: updatePoint.x,
                    y: updatePoint.y,
                } as any)
            }
        }

        return existingSet.save()
    }
}