import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PointsModule } from './points/points.module'
import { RouteModule } from './route/route.module'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://chagas:dani@routeoptimizer.nttzkbn.mongodb.net/?retryWrites=true&w=majority&appName=RouteOptimizer'),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService]
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 15,
    }]),
    PointsModule,
    RouteModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
