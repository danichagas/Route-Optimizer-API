import { 
    Controller,
    Get,
    Delete,
    Param,
    UseGuards,
    HttpCode,
    HttpStatus 
} from '@nestjs/common'
import { RoutesService } from '../services/routes.service'
import { AuthGuard } from 'src/common/guards/auth.guard'

@Controller('route')
export class RouteController {
    constructor(private readonly routeService: RoutesService){}

    @Get(':id')
    @UseGuards(AuthGuard)
    async calculateAndSaveOptimizedRoute(@Param('id') pointSetId: string) {
        const newRoute = await this.routeService.calculateAndSaveOptimizedRoute(
            pointSetId,
        )

        return {
            message: 'Rota otimizada calculada e salva com sucesso!',
            calculatedRouteId: newRoute._id,
            pointSetId: newRoute.pointSetId,
            optimizedRoute: newRoute.routeOptimizer,
            totalDistance: newRoute.totalDistance,
            calculationDate: newRoute.createdAt,
        }
    }

    @Get('historic/all')
    @UseGuards(AuthGuard)
    async getHistoricRoutes() {
        const historicRoutes = await this.routeService.getHistoricRoutes()

        const response = historicRoutes.map(route => ({
            routeId: route._id,
            setOfPointsId: route.pointSetId,
            totalDistance: route.totalDistance,
            calculationDate: route.createdAt,
        }))

        return response
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteRoute(@Param('id') id:string) {
        await this.routeService.deleteRoute(id)
    }
}