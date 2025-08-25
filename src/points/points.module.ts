import { Module } from '@nestjs/common'
import { PointsService } from './services/points.service'
import { MongooseModule } from '@nestjs/mongoose'
import { SetOfPoints, SetOfPointsSchema } from './schemas/point.schema'
import { PointsController } from './controllers/points.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SetOfPoints.name, schema: SetOfPointsSchema },
    ]),
  ],
  providers: [PointsService],
  exports: [PointsService],
  controllers: [PointsController],
})
export class PointsModule {}
