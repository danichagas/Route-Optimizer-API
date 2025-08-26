import { 
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    UseGuards,
    HttpCode,
    HttpStatus,
 } from '@nestjs/common'
import { PointsService } from '../services/points.service'
import { CreateSetOfPointsDto } from '../dto/create-point.dto'
import { UpdateSetOfPointsDto } from '../dto/update-point.dto'
import { AuthGuard } from 'src/common/guards/auth.guard'

@Controller('points')
export class PointsController {
    constructor(private readonly pointsService: PointsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async createPoints(@Body() createSetOfPointsDto: CreateSetOfPointsDto) {
        const newSet = await this.pointsService.create(createSetOfPointsDto)

        return {
            message: 'Conjunto de pontos cadastrados com sucesso!',
            id: newSet._id
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pointsService.findOne(id)
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    updateSetPoints(
        @Param('id') id: string,
        @Body() updateSetOfPointsDto: UpdateSetOfPointsDto,
    ) {
        return this.pointsService.update(id, updateSetOfPointsDto)
    }
}
