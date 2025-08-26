import { 
    Controller,
    Get,
    Post,
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
            pointSetId: newRoute.pointSetid,
            optimizedRoute: newRoute.routeOptimizer,
            totalDistance: newRoute.totalDistance,
            calculationDate: newRoute.createdAt,
        }
    }


}