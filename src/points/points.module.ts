import { Module } from '@nestjs/common'
import { PointsService } from './services/points.service'
import { MongooseModule } from '@nestjs/mongoose'
import { SetOfPoints, SetOfPointsSchema } from './schemas/point.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SetOfPoints.name, schema: SetOfPointsSchema },
    ]),
  ],
  providers: [PointsService],
  exports: [PointsService],
})
export class PointsModule {}
