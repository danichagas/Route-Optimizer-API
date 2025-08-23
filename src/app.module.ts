import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PointsModule } from './points/points.module';
import { RouteModule } from './route/route.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://chagas:dani@routeoptimizer.nttzkbn.mongodb.net/?retryWrites=true&w=majority&appName=RouteOptimizer'),
    PointsModule,
    RouteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
