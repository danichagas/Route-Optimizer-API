import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PointsModule } from 'src/points/points.module'
import { Route, RouteSchema } from './schemas/route.schema'
import { RoutesService } from './services/routes.service'
import { RouteController } from './controllers/route.controller';


@Module({
    imports: [
        PointsModule,
        MongooseModule.forFeature([{ name: Route.name, schema: RouteSchema }]),
    ],
    providers: [RoutesService],
    controllers: [RouteController],
})
export class RouteModule {}
