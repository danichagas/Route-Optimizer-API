import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PointsModule } from './points/points.module'
import { RouteModule } from './route/route.module'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://chagas:dani@routeoptimizer.nttzkbn.mongodb.net/?retryWrites=true&w=majority&appName=RouteOptimizer'),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 20,
    }]),
    PointsModule,
    RouteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
